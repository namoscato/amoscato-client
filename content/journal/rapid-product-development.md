---
title: "Rapid Product Development"
date: 2021-06-13T15:00:00-04:00
summary: A summary of Fieldguide's core technology stack surfaces code generation as a driver of product iteration speed.
---

It’s hard to believe it has already been nine months since I started at [Fieldguide](https://www.fieldguide.io/). Time really flies by, yet the weird state of our world casts a stagnant shadow on things. With many people fully vaccinated, I’m already enjoying more time outside of the apartment and and am slowly relearning how to socialize.

It has been a refreshing transition, one that has enabled me to reflect on many aspects of the product development process. Ideally, one is always trying to continuously improve, but a career switch is a sure way to challenge the status quo. Hopefully many of my scattered thoughts will make their way into future journals, but this post is focused on our technology stack, and more specifically, how code generation affects our iteration speed.

At the core, [Hasura](https://hasura.io/) generates most of our boilerplate CRUD endpoints via GraphQL and orchestrates Postgres migrations. The engine exposes an intuitive console GUI, facilities event trigger configuration, and even supports real-time functionality out of the box. In this rather drastic paradigm shift, most of our backend development can be achieved via manual and programmatic configuration changes.

This shift, of course, comes with some tradeoffs: We inherently have less control over the underlying generated Postgres queries, and manually reviewing configuration changes (YAML diffs) can be challenging. We have already made some progress improving the latter, including an [open-source GitHub Action](https://github.com/Fieldguide/action-hasura-change-summary) to generate readable summaries of these changes as pull request comments. We have only scratched the surface with what we can automate with this configuration-driven approach, and the efficiency gains far outweigh the costs so far.

A surprising amount of functionality can be implemented with boilerplate CRUD, but there will always be a need to implement custom business logic, complex mutations, and interfaces to external services. For these needs, we configure a TypeScript GraphQL server as a Hasura [remote schema](https://hasura.io/docs/latest/graphql/core/remote-schemas/index.html), effectively extending the set of generated types with custom functionality. With [GraphQL Nexus](https://nexusjs.org/), declarative TypeScript code generates this exposed GraphQL schema extension as well as TypeScript interfaces, used internally to facilitate backend development.

But code generation is not scoped to the backend. Client queries and mutations written in our React application are parsed by [GraphQL Code Generator](https://www.graphql-code-generator.com/) which generates [Apollo Client](https://www.apollographql.com/apollo-client) React hooks and TypeScript interfaces. This results in some intentional coupling: As our data model and schema extensions evolve, generated React hooks accelerate frontend development, and their strict typing de-risks changes across the board.

At first, this coupling might seem problematic. At the very least, it’s a certain deviation from more conventional API development. There is no domain layer, and with that lack of abstraction, changes to the data model directly affect the frontend. This behavior is acceptable for internal APIs and is highly effective when used with strictly typed languages providing compile time feedback (in this case both TypeScript and GraphQL from which code is generated).

GraphQL is the common thread throughout all of the above, but these efficiency gains come from strictly typed code generation, independent of the query language. GraphQL would be irrelevant without the ecosystem of tooling surrounding it, and this has primarily contributed to its popularity. With that said, frameworks such as [API Platform](https://api-platform.com/) are enabling such workflows for RESTful development, and Hasura is even [becoming interoperable](https://hasura.io/blog/announcing-hasura-graphql-engine-2-0/#rest-graphql) with REST APIs as well.

At the end of the day, it really does not matter what technology you use to build software. It is all about the real problems you are trying to solve for people. The faster you can iterate, the easier it will be to experiment with solutions, and the better chance you will have at actually solving the problems at hand.

And of course, if your interest is piqued or you share the same mindset about product development, [we're hiring](https://www.fieldguide.io/careers)!
