---
title: Workflow
description: Cogear.JS main workflow – how it works.
---
# Workflow

# Basics
**Cogear.JS** is a static websites generator. It means that it compiles `src` folder (`./src` by default) data to static html and assets files to the `output` folder (`./public` by default).

Pages in `src` folder can be provided in various formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.

Then [Webpack](https://webpack.js.org) comes to play. It bundles app assets (basic `./src/app.js`, theme `./theme.js` or any custom script), packs all imported assets (other scripts, stylsheets, fonts, etc).

All external (remote) and internal (local or from `node_modules`) javascript modules should be imported from scripts.

When [Webpack](https://webpack.js.org) work is finished, pages are going on build.

Compiled pages are rendered through layouts, which are provided by site `theme` (or by `src` itself).

Bundled assets are injected during layout rendering.

In `production` or `development` modes static server is fired up to show the results.

Browser window opens.

In `development` mode watchers are being stared to reflect changes in pages, layouts and assets.


# Process
To build a static website **Cogear.JS** do next:
1. Reads site config from `./config.yaml` (`.js`,`.json` formats are also available).
2. Searches `src` directory `pages` subfolder for pages. (default: `./src/pages`)
3. Preload pages. 
Available page formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.
Parse metadata with [`yaml-front-matter`](https://github.com/spatie/yaml-front-matter).
4. Fires up `webpack` server (in `production` mode) or `webpack-dev-server` (in `dev` mode, with *hot-reload*).
5. Renders pages content with layouts (`theme` provided or `./src/layouts`) to the `output` folder.
6. Compiles assets and injects them into previousely built static html files.<br>
Assets are: `js`,`coffee`,`css`,`sass`,`scss`,`stylus`,`less`,`Vue`,`jsx`,`fonts`,`images`.
7. Done.

# Speed
Pages are build asynchronously (from v1.1.0).

[Benchmarks](https://github.com/codemotion/cogear-benchmark) show speed 1000 pages per second, est.

Speed depends on:
* Pages count
* Pages content
* Webpack assets compilation time
* Pages and layouts formats

Webpack processing also depends on imported modules count.

`Development` mode is also faster then `Production` or `Build` because:
1. It doesn't compress assets.
2. It doesn't minify assets.
3. It stores all files in memory instead of filesystem.

# Config
Config is a simple JSON-file located at `./config.yaml`.
```yaml
title: Cogear.JS – modern static websites generator
theme: default
```

If `page` title is not defined then site config title will be used.

Pay attention to the `theme` property as it defines basic layout and can be also used to load scripts, styles and other assets.

<article class="message is-warning">
  <div class="message-body">
    Config data is available in runtime via <code>cogear.config</code> object. Usefull for <a href="/docs/plugins">plugins</a>.
   </div>
</article>

Deploy presets can also be stored in config. [Read more](/docs/deploy)

# Modes
When **Cogear.JS** is called from command line it runs in `development` mode.

## Development mode
```bash
$ cogear # runs in devemopment mode by default
```
This mode peforms:
1. Build pages and watch for changes.
2. Start [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) which will instantly update in-browser pages, scripts and styles on the fly with `hot-reload` module.

![production](/images/docs/workflow/dev.svg)

It handles all assets in memory (no output in real file system, don't panic). 

## Production mode
```bash
$ cogear production # runs in production mode
```
This mode performs:
1. Build pages.
2. Assets compilation and injection to pages with [Webpack](https://webpack.js.org).
3. Starting local server to check out the results.

![production](/images/docs/workflow/production.svg)


## Build mode
```bash
$ cogear build
```

Only build pages and perform Webpack assets compilation.

![production](/images/docs/workflow/build.svg)

> It should be called __before__ [deploy](/docs/deploy) process in order output files to be built.

## Deploy mode
```bash
$ cogear deploy [preset]
```

Fires deploy process. 

![deploy](/images/docs/workflow/deploy.svg)

More info at [Deploy](/docs/deploy) page.


# Source
It's the place where all magic happens.

Basic structure:
```bash
./src
├── app.js         # required, entry point
├── layouts        # optional
│   └── index.pug  # optional
└── pages          # required, site index page
    └── index.md   # required, entry point
```

Required files are: `app.js` and `pages/index.md` (`Markdown` or [any other format](#pages)).

Basically it's all you need to build your first site.

## Main script `app.js`

It's the `entry` point ([`Webpack` term](https://webpack.js.org/concepts/entry-points/)) which has to be injected in all the pages.

All you internal and external scripts may be imported there.

Example:
```javascript
// Look at webpack-specific comments
import('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css')
// Either remote or local scripts, styles and other resources (like fonts) can be loaded
import('./css/app.styl')
// You can even import your theme entry script if it's necessary
import('@/js/script.js')
// `@` is an alias for current theme folder
// `#` is an alias for project root folder
```