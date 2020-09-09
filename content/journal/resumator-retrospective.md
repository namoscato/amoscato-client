---
title: "Resumator Retrospective"
date: 2020-09-09T11:40:00-04:00
summary: "Six years later, through two company rebrands, three offices, and countless data migrations, I have made the difficult decision to pursue a new “chance” outside of JazzHR."
---

Kobi Yamada’s [inspirational children books](https://www.goodreads.com/author/list/59093.Kobi_Yamada) are some of my favorites of all-time. Illustrated by Mae Besom, they bring clarity to such abstract and important concepts like “ideas”, “problems”, and “chances”. I have read them countless times and shared them with others. Here’s the beginning of [_What Do You Do With a Chance?_](https://www.goodreads.com/book/show/36070310-what-do-you-do-with-a-chance):

> One day, I got a chance.
>
> It just seemed to show up. It acted like it knew me, as if it wanted something.
>
> I didn’t know why it was here. “What do you do with a chance?” I wondered.

I don’t think I have explicitly written about work since my [summer internship]({{< relref "journal/summer-internship" >}}) at the then called “The Resumator” back in 2012. Having just finished up my sophomore year at Pitt, I knew very little about software engineering outside of the foundational knowledge I was learning in my 400-level courses. To say they took a “chance” on a young college kid that summer would be an understatement. But I thrived in the fast-paced startup environment, learned as much as I possibly could without breaking _too_ much in the process, and blogged about it every night.

As I was nearing completion of my undergraduate coursework in 2014, it was an easy decision to accept a full-time offer at the company that had already taught me so much in just three short months. The Resumator had grown quite a bit since my internship, and I could not be more excited to kick off my career.

Six years later, through two [company rebrands](https://techcrunch.com/2015/06/23/the-resumator-relaunches-as-jazz-aims-to-bring-data-to-the-recruiting-process/), three offices (not including my apartment in which I’ve been [standing](https://photos.app.goo.gl/jn7EdbFWRbsFiK8t6) for the past five months), and countless data migrations (some of which even collected a set of curious “time travel” summary metrics), I have made the difficult decision to pursue a new “chance” outside of JazzHR.

The past several months especially have been filled with deep thought and reflection. I am not one to frequently sort through the emotional state of my mind, and I cannot thank enough the family and friends that helped me along the way.

I have since found myself spiraling into a state of nostalgia. I dug up some old blogs, browsed one of my early [personal site designs](https://web.archive.org/web/20120717032839/http://amoscato.com/), and uncovered the [journal](https://italy.amoscato.com/) I kept while studying abroad in Italy.

Recently, I have been reading through my old [15Five](https://www.15five.com/) reports. I had spent hours documenting work happenings, almost as a therapeutic way to use the past week’s reflection to prepare for the week ahead. While reading, I was most amazed by how excited and proud I was in the moment for work that I would now consider subpar. But as I have [written about]({{< relref "journal/back-to-the-future" >}}) before, this is a clear sign of growth and continuous improvement.

The beginning years were pretty chaotic, looking back on it. The only “process” we really had was a manual release pipeline that would be frequently bottlenecked by a separate quality assurance team. We weren’t writing _any_ automated tests, and “big bang” releases often occurred on evenings and weekends. Teams changed with roughly defined projects, and we would periodically spend months on a project that would never even see the light of day. Most of us were still iterating on a legacy, home-brewed PHP framework while a RESTful API and single-page client application were just getting off the ground.

Soon after our first company rebrand, I stumbled into the first of what would be many reporting projects over the years (although I didn’t know it at the time). We wrestled with non-performant data models, worked to mitigate PHP memory footprint, and ultimately leveraged [RabbitMQ](https://www.rabbitmq.com/) in a somewhat untraditional publish-subscribe model to periodically recompute a denormalized dataset. Those reports are now considered “legacy”, and we have since deprecated the RabbitMQ consumer systems architecture we landed on back then, but the learning process was so rewarding.

After a really tough start to 2016 with substantial company resizing, we introduced functionality that enabled users to perform “bulk actions” on their candidates – and with that, a search performance problem that would challenge us through the present day. We learned about data store constraints the hard way, implemented clever solutions to surface data discrepancies, and eventually got really good at low-risk execution of massive data migrations which increased in difficulty as our customer base grew. We would not always make the right decision, but it was always the best one at the time – one that aimed to provide timely value to customers while hopefully setting us up for technical success longterm.

A strategic LinkedIn integration piloted our adoption of [Apache Kafka](https://kafka.apache.org/) in 2017 which I always found ironic given they originally developed the now open source technology. We faced some challenges – many of which self-inflicted by dreaded timezone discrepancies, and at one point I recall embarking in a [thorough dissection](https://photos.app.goo.gl/kWj9ydfW2KtfmNJn6) of some core [Kafka Connect](https://docs.confluent.io/current/connect/) code. But the platform would ultimately have a substantial impact on our ability to quickly configure robust ETL pipelines and would later power realtime workflow reports, Salesforce job reviews, and the archiving of non-PII data. Given its asynchronous nature, the LinkedIn integration specifically enabled us to refine our craft of [observability]({{< relref "journal/observable-development" >}}) as we worked to get the complex two-way data synchronization functional for our customers.

While the highlights thus far have taken on a server-side focus, we also worked to establish blessed front-end patterns over the years. Initially seen only as a way to share functionality across UI contexts, more granular [AngularJS](https://angularjs.org/) components became the solution to almost every front-end implementation. We came up with a way to incrementally incorporate [TypeScript](https://www.typescriptlang.org/) into our front-end stack and were writing all of our new features in the more robust language by 2018. While we experimented with [Redux](https://redux.js.org/) and [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview) to bring opinionated convention to state management, we found value in centralizing more and more business logic on the server-side in an effort to simplify client implementation.

2018 was inaugurated with another reporting project with goals to provide deeper insight into the effectiveness of the recruiting process. Three more workflow reports would add [Elasticsearch](https://www.elastic.co/elasticsearch/) to the stack – an ambitious introduction to the analytics engine that resulted in a [cleverly named](http://www.capncrunch.com/) Kafka Streams application and the usage of [scripted metric aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-scripted-metric-aggregation.html) to compute workflow speed and conversion metrics in realtime. The flexibility of our custom workflow feature would challenge us every step of the way, and we ultimately derived a visual language of the sorts just to facilitate conversations about what we were doing. Elasticsearch worked really well for us and would later power candidate duplicate detection and unified search.

The recent years saw an increased focus on software architecture and “platform-like” development. 2019 spawned several [generic APIs](https://apidoc.jazzhrapis.com/) that enabled assessment, screening, and HRIS partners to build integrations with JazzHR. These frameworks would interface with internally-exposed configuration interfaces, removing the need for engineering effort to bring on new partners. While we dabbled in a generic partner-facing Apply API in 2016 (which now drives the majority of our candidate throughput, processing over 1 million applications monthly), this was such a refreshing shift from most of our historic one-off partner implementations and illustrated JazzHR’s rising stature as an attractive technology partner.

These highlights, while certainly not exhaustive, provide a glimpse into some of the stuff we accomplished over the years. But it’s not to diminish all of the the things that happened in between – the lunch-and-learns, hackathons, 5K runs, book clubs, coffee brews, chatbot enhancements, and happy hours. I am forever grateful for the “chance” I was given. I am truly proud of what we built and have no doubts JazzHR will continue on its upward trajectory. _By the way, if any of the above interests you, the [team is growing](http://careers.jazzhr.com/apply/dQzv42tCFR/Software-Engineer?referrer=20200909015006CQEBTOVOQEUED96F&source=amoscato.com) (and using their own software to do it, of course)._

As for my next chapter, I am excited to pursue another “chance” and hope for nothing but the best. As Yamada’s character describes when he finally grabs his chance:

> It felt so good to soar, to fly, to be free!
>
> I now see that when I hold back, I miss out. And I don’t want to miss out. There’s just so much I want to see and do and discover.
>
> So, what do you do with a chance?
>
> You take it… because it just might be the start of something incredible.
