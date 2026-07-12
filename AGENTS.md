# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Overview

Front end for [amoscato.com](https://amoscato.com/), a personal site built with [Hugo](https://gohugo.io/) and TypeScript. Requires Node 22 (`.nvmrc`) and the Hugo CLI.

## Commands

-   `npm start` — runs `hugo serve` and `tsc --noEmit --watch` concurrently
-   `npm run build` — production build (`hugo --gc --minify`)
-   `npm test` — runs Jest; `posttest` then runs all linters (`lint-js`, `prettier`, `lint-sass`), matching CI
-   `npx jest assets/js/stream/__tests__/square.test.ts` — run a single test file (or `npx jest -t "test name"`)
-   `npm run lint-js` — `tsc --noEmit` type check + ESLint
-   `npm run lint-sass` — stylelint on `assets/**/*.scss`
-   `npm run prettier` / `npm run prettier:fix` — check / fix formatting

## Architecture

Hugo compiles the assets itself — there is no webpack/standalone bundler config:

-   `layouts/_default/baseof.html` is where asset compilation is wired up. TypeScript is bundled from the `assets/js/app.ts` entry point via Hugo's `js.Build` (esbuild), and SCSS is compiled from `assets/css/app.scss` via `css.Sass`.
-   jQuery, moment, and onecolor are loaded from CDNs as globals, not bundled. `assets/js/shims/` maps bare imports (`import $ from "jquery"`) to those globals through the `shims` option of `js.Build`. Keep this in mind when adding dependencies.
-   Build-time parameters are injected via `js.Build`'s `params` option and imported as `import * as params from "@params"` (typed in `assets/js/@params.d.ts`). Currently this carries `cacheBaseUri` (`https://storage.amoscato.com`), the backend that serves the JSON data feeds.
-   `tsc` is type-check only (`noEmit`); Jest transpiles tests with Babel (`.babelrc`, `@babel/preset-typescript`), so type errors won't fail Jest — they surface via `lint-js`.

### Runtime behavior (homepage)

`app.ts` powers two homepage features, each fetching pre-aggregated JSON from `storage.amoscato.com`:

-   `assets/js/current-list/` — the "Currently" list. Renders one line per source (journal, music, book, video, drink) from `current.json`; the journal entry is injected from Hugo `data-` attributes on `#homepage-currently` rather than the JSON.
-   `assets/js/stream/` — the visual footer mosaic. `Stream` lays out `StreamColumn`s of colored squares/photos from `stream.json` across the window width, re-rendering on debounced window resize. Colors and sizing come from the `IStreamConfiguration` defined in `app.ts`.

### Hugo content

-   `content/journal/` — blog posts, rendered by `layouts/journal/single.html`; the homepage pulls the latest post into the current list.
-   Site config lives in `config.yaml`.
