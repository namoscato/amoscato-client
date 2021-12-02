---
title: "GraphQL Observability with Sentry"
date: 2021-12-01T20:13:46-05:00
---

At Fieldguide, [Hasura](https://hasura.io/) exposes a [GraphQL](https://graphql.org/) API on Postgres, extended with custom types implemented in a Node.js application's [Apollo Server](https://www.apollographql.com/docs/apollo-server/). Our front-end React application interacts with Hasura via [Apollo Client](https://www.apollographql.com/docs/react/), and our applications are managed on [Heroku](https://www.heroku.com/). GraphQL's inherit self-documentation has fueled an ecosystem of developer tooling, and its use with TypeScript results in highly efficient internal API development.

While iteration speed is certainly a key product development metric, understanding the _behavior_ of features is equally important. This complementary information confirms development assumptions and surfaces inevitable bugs, providing a feedback loop that informs future iteration. Application behavior can be observed by generating proper telemetry data such as metrics, logs, and traces.

We adopted [Sentry](https://sentry.io/welcome/), an error tracking and performance monitoring platform, in the beginning weeks of our product's inception. We have iterated on the integration over the past year, improving our ability to diagnose performance (traces) and triage errors (an actionable subset of logs). This Sentry integration overview is derived from our specific Node.js GraphQL server and React GraphQL client, but the takeaways can be applied to any system with GraphQL interactions.

## GraphQL Server

Sentry provides informative [guides](https://docs.sentry.io/) for many platforms. In our server's case, we apply Apollo Server v2 as an [Express](https://expressjs.com/) middleware; therefore, Sentry's [Express Guide](https://docs.sentry.io/platforms/node/guides/express/) with request, tracing, and error handlers is a great starting point.

As part of initialization, we configure [`tracesSampleRate`](https://docs.sentry.io/platforms/node/guides/express/configuration/options/#tracing-options) such that a sampling of traces count towards our quota. Additionally, we bind a git commit hash (exposed via Heroku's [Dyno Metadata](https://devcenter.heroku.com/articles/dyno-metadata) feature) to the [release version](https://docs.sentry.io/platforms/node/guides/express/configuration/releases/#bind-the-version), enabling Sentry to monitor [release health](https://docs.sentry.io/product/releases/health/).

Sentry's Express-compatible tracing handler starts a transaction for every incoming request with a name [derived from](https://github.com/getsentry/sentry-javascript/blob/6.15.0/packages/node/src/handlers.ts#L108-L143) the HTTP method and path. This works well for REST APIs, but GraphQL entities are not identified by URLs, and by default _all_ GraphQL requests will be identified by `POST /graphql`. To achieve proper specificity, we instantiate Apollo Server with a [custom plugin](https://www.apollographql.com/docs/apollo-server/v2/integrations/plugins/) that qualifies [transaction names](https://docs.sentry.io/platforms/node/guides/express/enriching-events/transaction-name/) with the contextual GraphQL operation when Apollo receives a request.

{{% details summary="Apollo Server plugin responding to the `requestDidStart` event" %}}

```ts
import * as Sentry from "@sentry/node";
import { ApolloServerPlugin } from "apollo-server-plugin-base";

export const sentryPlugin: ApolloServerPlugin = {
    requestDidStart({ request }) {
        if (request.operationName) {
            const scope = Sentry.getCurrentHub().getScope();
            const transaction = scope?.getTransaction(); // retrieve ongoing transaction

            if (transaction) {
                // qualify transaction name
                // i.e. "POST /graphql" -> "POST /graphql: MyOp"
                scope?.setTransactionName(
                    `${transaction.name}: ${request.operationName}`
                );
            }
        }
    },
};
```

{{% /details %}}

Similarly, GraphQL errors differ from conventional REST APIs. Exceptions thrown while executing a GraphQL operation are represented as an `errors` response body field and will not inherently be captured by Sentry's Express-compatible error handler. We report these errors with an identified user and context by extending our Apollo Server plugin as described in [this Sentry blog](https://blog.sentry.io/2020/07/22/handling-graphql-errors-using-sentry#reporting-errors-to-sentry-with-apollo-server-nodejs-typescript).

{{% details summary="Extended Apollo Server plugin responding to the `didEncounterErrors` event" %}}

```ts
import * as Sentry from "@sentry/node";
import { ApolloError } from "apollo-server-express";
import { ApolloServerPlugin } from "apollo-server-plugin-base";

export const sentryPlugin: ApolloServerPlugin = {
    requestDidStart({ request }) {
        if (request.operationName) {
            // qualify transaction name
            // ...
        }

        return {
            didEncounterErrors(ctx) {
                if (!ctx.operation) {
                    return; // ignore unparsed operations
                }

                Sentry.withScope((scope) => {
                    if (ctx.context.currentUser) {
                        scope.setUser({
                            id: String(ctx.context.currentUser.id),
                            // ...
                        });
                    }

                    for (const error of ctx.errors) {
                        if (error.originalError instanceof ApolloError) {
                            continue; // ignore user-facing errors
                        }

                        Sentry.captureException(error, {
                            tags: {
                                graphqlOperation: ctx.operation?.operation,
                                graphqlOperationName: ctx.operationName,
                            },
                            contexts: {
                                graphql: {
                                    query: ctx.request.query,
                                    variables: JSON.stringify(
                                        ctx.request.variables,
                                        null,
                                        2
                                    ),
                                    errorPath: error.path,
                                },
                            },
                        });
                    }
                });
            },
        };
    },
};
```

{{% /details %}}

Finally, to gracefully handle scenarios when Heroku restarts our application (i.e. when deploying a new version), we [drain](https://docs.sentry.io/platforms/node/guides/express/configuration/draining/) pending Sentry events before [closing](https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html#graceful-shutdown) the Express server.

{{% details summary="Draining events for a graceful shutdown" %}}

```ts
import * as Sentry from "@sentry/node";

const server = app.listen(PORT);

process.on("SIGTERM", async function shutdown(signal: string) {
    console.log(`Shutting down via ${signal}`);

    try {
        await Sentry.close(2000);
    } catch (e) {
        console.error(e);
    }

    server.close(() => {
        console.log("HTTP server closed");
    });
});
```

{{% /details %}}

## GraphQL Client

Our React application configuration follows Sentry's [React Guide](https://docs.sentry.io/platforms/javascript/guides/react/) with their sampled browser tracing integration configured with [React Router instrumentation](https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/). Additionally, we bind a git commit hash to the [release version](https://docs.sentry.io/platforms/javascript/guides/react/configuration/releases/#bind-the-version), analogous to our Express application.

Apollo Client v3 telemetry is partially instrumented by [Apollo Link Sentry](https://github.com/DiederikvandenB/apollo-link-sentry), an [Apollo Link](https://www.apollographql.com/docs/react/api/link/introduction/) middleware that records GraphQL operations as useful [breadcrumbs](https://docs.sentry.io/platforms/javascript/guides/react/enriching-events/breadcrumbs/) amongst other features. We intentionally disable their transaction and fingerprint setting as we found the lack of scoping confusing in non-GraphQL operation contexts.

{{% details summary="Apollo Link Sentry configuration" %}}

```ts
import { SentryLink } from "apollo-link-sentry";

const sentryLink = new SentryLink({
    setTransaction: false,
    setFingerprint: false,
    attachBreadcrumbs: {
        includeError: true,
    },
});
```

{{% /details %}}

Complementing this library, an [`onError` link](https://www.apollographql.com/docs/react/api/link/apollo-link-error/) actually reports GraphQL and network errors to Sentry with an explicit transaction name and context. The error handler arguments are not JavaScript `Error` objects in practice; therefore, [`Sentry.captureMessage`](https://docs.sentry.io/platforms/javascript/guides/react/usage/#capturing-messages) is invoked to improve readability within Sentry Issues. GraphQL errors are captured with a more granular [fingerprint](https://docs.sentry.io/platforms/javascript/guides/react/usage/sdk-fingerprinting/), splitting Sentry events into groups by GraphQL operation name.

{{% details summary="`onError` link implementation" %}}

```ts
import { onError } from "@apollo/client/link/error";
import * as Sentry from "@sentry/react";

const errorLink = onError(({ operation, graphQLErrors, networkError }) => {
    Sentry.withScope((scope) => {
        scope.setTransactionName(operation.operationName);
        scope.setContext("apolloGraphQLOperation", {
            operationName: operation.operationName,
            variables: operation.variables,
            extensions: operation.extensions,
        });

        graphQLErrors?.forEach((error) => {
            Sentry.captureMessage(error.message, {
                level: Sentry.Severity.Error,
                fingerprint: ["{{ default }}", "{{ transaction }}"],
                contexts: {
                    apolloGraphQLError: {
                        error,
                        message: error.message,
                        extensions: error.extensions,
                    },
                },
            });
        });

        if (networkError) {
            Sentry.captureMessage(networkError.message, {
                level: Sentry.Severity.Error,
                contexts: {
                    apolloNetworkError: {
                        error: networkError,
                        extensions: (networkError as any).extensions,
                    },
                },
            });
        }
    });
});
```

{{% /details %}}
