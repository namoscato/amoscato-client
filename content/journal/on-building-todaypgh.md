---
title: "On Building TodayPGH"
date: 2020-10-18T15:25:21-04:00
summary: A summary of the evolved project management process behind TodayPGH, a project that shares stories of Pittsburgh educators to inspire future generations, lift up the profession, and build bridges of empathy.
---

Bri (my sister) and Tesin (my wife) came to me with a project they were working through in late 2019, an organization centered around empowering aspiring teachers and shifting perspectives on the field of education. I was happy to throw together a [splash page](https://www.onedaypgh.org/), and the idea would continue to evolve (and is still evolving!).

Somewhere along the line, the idea to interview current educators came about – using their stories as a source of inspiration. And thus began [TodayPGH](https://www.todaypgh.com/), a project that has now shared over 40 stories of Pittsburgh educators to inspire future generations, lift up the profession, and build bridges of empathy.

I had a lot of fun building the site which is powered by [Hugo](https://gohugo.io/), a fast static site generator, and hosted via [GitHub Pages](https://pages.github.com/) behind [Cloudflare](https://www.cloudflare.com/) for free. The project is [open source](https://github.com/namoscato/one-day-today), and our evolved project management process is summarized below.

Story collection was very much manual at first. A monolithic Google Doc eventually emerged with in-person interview notes, but the format was inconsistent, and the state of each story was unclear. The document was admittedly daunting to sift through, and this approach would clearly not scale.

The site launched with a primary call-to-action that links to a [Google Form](https://www.google.com/forms/about/). In addition to capturing the interview question responses, the form captures some structured data including display name, school district, and social media handles. On completion of the form, educators are encouraged to upload a photo that would represent their story via a separate Google Form (that requires authentication due to the file upload).

We introduced some lightweight process management with [Trello](https://trello.com/) where each story is represented as a card with standardized metadata and a link to the story copied into a [Google Doc](https://www.google.com/docs/about/) for collaborative editing. The Trello card and Google Doc are automatically created from the Google Form submission via [Zapier](https://zapier.com/).

We recently configured [Forestry](https://forestry.io/) to facilitate content management. The product integrates seamlessly with Hugo and enables us to leverage the continuous integration workflows initially setup when I was manually editing Markdown files.

In addition to standard JavaScript and Sass linting, a [custom](https://github.com/duolingo/splinter/pull/3) [GitHub Action](https://github.com/features/actions) wraps a [simple pattern-based linter](https://github.com/duolingo/splinter) to enforce Hugo front matter conventions in content Markdown files. Content updates in Forestry push to a dedicated `forestry` branch in practice, which in turn opens a pull request and assigns me as a reviewer via a GitHub Action. Images included in pull requests are automatically compressed and resized via [another GitHub Action](https://github.com/namoscato/action-tinify) that invokes [TinyPNG’s](https://tinypng.com/) API. Pushes to the `master` branch trigger a deployment via Shohei Ueda’s wonderful [GitHub Pages action](https://github.com/peaceiris/actions-gh-pages).

We leverage [Hootsuite](https://hootsuite.com/) to schedule social media postings across Twitter, Facebook, and Instagram. And I have been playing around with an alternative [Schema.org](https://schema.org/)-inspired structured content format to generate post content – perhaps more on that at a later date.

To date, TodayPGH has seen over 13,000 page views across 8,000 unique visitors. It has been a wonderful source of inspiration for me, and a lot of fun to maintain.

_Are you a current or aspiring Pittsburgh educator? [Share your story](https://www.todaypgh.com/spread-the-love/share/) today!_
