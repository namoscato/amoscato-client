+++
date = "2018-02-14T23:11:00-05:00"
title = "Observable Development"
description = "Parallels are drawn between system operations and software development."
+++

There is a prominent focus on failure in the software systems and operations realm. Netflix’s [Chaos Monkey](https://netflix.github.io/chaosmonkey/) was groundbreaking back in 2012, but at this point, its [principles](http://principlesofchaos.org/) are taken for granted in nearly every aspect of a mature infrastructure. Resilient distributed systems such as [Apache Kafka](https://kafka.apache.org/) and [Elasticsearch](https://www.elastic.co/products/elasticsearch) are built on the assumption that things will fail. Heck, there are even [conferences](https://uptime.events/) on the subject. Failure is no doubt an inevitable state of “the machine”.

But when it comes to the software that runs on these machines, there is a shift in focus — a difference in priorities. The majority of the development process is inherently spent building software. In healthy organizations, a substantial, if not equal, amount of effort is also allocated for automated testing. Quality is determined by functional correctness, and an effective development process aims to maximize this metric.

In practice, flawless software is a fallacy. [Working software](http://agilemanifesto.org/principles.html) is obviously crucial for success, but we are not perfect; thus, the software we build will not be perfect. Programmers [reportedly spend 50% of their time debugging](https://www.roguewave.com/company/news/2013/university-of-cambridge-reverse-debugging-study): finding and fixing bugs. But even if every bug is proactively resolved, the interacting systems – data stores, message brokers, external services – are going to fail.

With the increasing complexity of these operating environments, it is imperative for software to expect and react to failure. Just as automated testing aims to expose bugs and facilitate maintenance, software must be *observable* during execution. Only then can one validate implementation assumptions, mitigate failure, and promptly react to these inevitable imperfections. This is not to suggest sacrificing quality for reactive debugging. But how else will you know what you don't know? Given the amount of effort we spend building software, shouldn't we want to know what it is doing once it is out in the wild?

Observability is achieved through logging. Coupled with a data visualization plugin such as [Kibana](https://www.elastic.co/products/kibana), these logs can unlock invaluable aggregated insight into how software is operating. With the appropriate usage of [severity levels](https://en.wikipedia.org/wiki/Syslog#Severity_level) and [logging context](https://www.loggly.com/blog/logging-tips-for-power-users-contextual-logging/), the questions you can answer about execution – both good and bad – are virtually endless.
