---
title: "Continuous Deployment Slack Notifications"
date: 2022-10-16T12:00:00-04:00
summary: "Fieldguide optimizes Slack signal-to-noise with an open-source GitHub Action that posts continuous deployment workflow progress notifications to Slack."
---

We have continuously deployed code since the early days of Fieldguide. The development practice plays a key part in our culture, enabling engineers to ship changes at any time without manual [toil](https://sre.google/sre-book/eliminating-toil/). More frequent deploys yield smaller changes which are inherently lower risk and easier to recover from. Additionally, this process promotes other healthy practices including zero downtime deployments, backwards compatibility, and feature flagging.

Our conventional repository workflow executes a set of required pull request status checks via [GitHub Actions](https://github.com/features/actions), verifying code style and running unit tests. After at least one [approved review](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/approving-a-pull-request-with-required-reviews), the pull request author initiates the deploy pipeline by simply merging their change to the mainline branch. In its current state, code is optimistically deployed to both our staging and production environments before running an end-to-end [Cypress](https://www.cypress.io/) test suite in staging.

We use [Slack](https://slack.com/) for asynchronous communication, and at each notable stage in the deploy pipeline, we notify a channel dedicated to production alerts. This results in at least two environment-specific Slack messages, regardless of the job status. Some of our repositories require additional deploy steps; for example, our primary server-side repository builds and deploys three Docker images for its web application, worker process, and Lambda function, resulting in five Slack channel notifications.

{{< figure src="/uploads/2022/slack-deploy-old.png" alt="Old Slack notifications" width="516" caption="Existing Slack notifications clutter main channel with poor context." >}}

In addition to these expected deploy notifications, the Slack channel receives Sentry issue alerts, application monitoring alerts, and relevant third party status updates. The event stream provides key input to on-call engineer triaging, ideally enabling proactive bug identification and resolution. With that said, the channel can be noisy.

We average about eight production deploys per day, resulting in over 20 Slack deploy messages. Over 95% of these are expected success notifications. In a Slack channel critical to facilitate unexpected production alert triaging, this results in unnecessary noise. Furthermore, the messages themselves are lacking basic context, making it difficult to know _what_ was even deployed.

With this in mind, we built [Slack Deploy Pipeline Notifications](https://github.com/Fieldguide/action-slack-deploy-pipeline), an open source TypeScript GitHub Action that has significantly improved our Slack notification experience.

{{< figure src="/uploads/2022/slack-deploy-new.png" alt="Slack Deploy Pipeline Notification GitHub Action" width="483" caption="New GitHub Action surfaces a single channel message with key context." >}}

When used at the beginning of a GitHub Action workflow, a single summary message surfaces the commit message and author. Intermediate stage completions are posted as threaded replies, only sending unexpected failures back to the main channel. At the conclusion of the workflow, the summary message is updated with its computed duration. In effect, most conventional deploys result in exactly one Slack channel notification with more useful context.

We embrace a remote-first culture at Fieldguide, and _effective_ asynchronous communication is a key component. We are always looking for opportunities to optimize Slack signal-to-noise and improve developer experience.
