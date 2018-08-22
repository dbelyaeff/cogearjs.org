---
title: Workflow
description: Cogear.JS main workflow – how it works.
---
# Basics
**Cogear.JS** is a static websites generator. It means that it compiles `source` folder data to static html and assets files to the `output` folder.

Pages in `source` folder can be provided in different formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.

Compiled pages can have `layouts` which are provided by site `theme`.

Main script `app.js` is bundled with every page, but additional per page scripts can be defined in page meta (with [`yaml-front-matter`](https://github.com/spatie/yaml-front-matter)).

All external (remote) and internal(local or from `node_modules`) modules should be imported from scripts.

# Process
To build a static website **Cogear.JS** do next:
1. Reads site config from `./config.yaml` (`.js`,`.json` formats are also available).
2. Searches `source` directory `pages` subfolder for pages. (default: `./src/pages`)
3. Reads pages. 
Available page formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.
Parse metadata with [`yaml-front-matter`](https://github.com/spatie/yaml-front-matter).
4. Compiles static `html` files from pages content through the `theme` layout into `build` folder.
5. Fires up `webpack` server (in `production` mode) or `webpack-dev-server` (in `dev` mode, with *hot-reload*).
6. Compiles assets and injects them into previousely built static html files.
Assets are: `js`,`coffee`,`css`,`sass`,`scss`,`stylus`,`less`,`Vue`,`jsx`,`fonts`,`images`.
7. Done.

# Speed
Build speed is based on pages and assets count.

One page is about _10-100ms_ to render (depends on size and format).

Webpack processing also depends on imported modules count.

`Development` mode is also faster then `Production` or `Build` because:
1. It doesn't compress assets.
2. It doesn't minify assets.
3. It stores all files in memory instead of filesystem.

## Config
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


# Modes
When **Cogear.JS** is called from command line it runs in `development` mode.

## Development mode
```bash
> cogear # runs in devemopment mode by default
```
This mode peforms:
1. Build pages and watch for changes.
2. Start [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) which will instantly update in-browser pages, scripts and styles on the fly with `hot-reload` module.

![production](/images/docs/workflow/dev.svg)

It handles all assets in memory (no output in real file system, don't panic). 

## Production mode
```bash
> cogear production # runs in production mode
```
This mode performs:
1. Build pages.
2. Assets compilation and injection to pages with [Webpack](https://webpack.js.org).
3. Starting local server to check out the results.

![production](/images/docs/workflow/production.svg)


## Build mode
```bash
> cogear build
```

Only build pages and perform Webpack assets compilation.

![production](/images/docs/workflow/build.svg)

> It should be called __before__ [deploy](/docs/deploy) process in order output files to be built.

## Deploy mode
```bash
> cogear deploy [preset]
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



# Pages
Pages are the main structure units of **Cogear.JS**.

They must be located in `pages` subfolder of the `source` directory (default: `./src/pages`).

## Formats (parsers)

They can be in various formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.

Different pages can have their own file extension at the same time (but avoid the same filenames).
```bash
./src/pages
├── about.html       # Compiles with EJS (can use variables)
├── contact-us.pug   # Compiles with PUG
├── index.md         # Compiles with Markdown
├── portfolio.ejs    # Compiles with EJS
└── testimonals.hbs  # Compiles with Handlebars    
```

Page extension|Compiler
:------------:|:--------:
`.md`|Markdown
`.pug`|PUG
`.html`|EJS
`.ejs`|EJS
`.hbs`|Handlebars

## Metadata with [`yaml-front-matter`](https://github.com/spatie/yaml-front-matter)
Each page can store meta-data with the help of [`yaml-front-matter`](https://github.com/spatie/yaml-front-matter) script.

Example:
`./src/pages/about.md`
```bash
---
title: About   # Used for html head title param
uri: about-us  # Used for generated file path
layout: about  # User for layout
---
# About us

You may contact us anytime using this phone number:

## 8-800-000-00-00
```
<article class="message is-warning">
  <div class="message-body">
    No matter what page format do you use, <a href="https://github.com/spatie/yaml-front-matter"><code>yaml-front-matter</code></a> meta-data <b>should always be formatted in that same way</b>.
   </div>
</article>

Example:
`./src/pages/about.html`
```bash
---
title: About   # Used for html head title tag
description: Awesome contacts page # Used for html head meta description tag
keywords: cogear.js, node, webpack # Used for html head meta keywords tag
uri: about-us  # Used for generated file path
layout: about  # User for layout
---
<h1><%= title%></h1>

You may contact us anytime using this phone number:

<h2>8-800-000-00-00</h2>
```
<article class="message is-info">
  <div class="message-body">All the metadata is provided as <b>JSON-object</b> to the page template and to the layout template.
  <br>Pages content is provided via <code>content</code> variable provided for layouts.</div>
</article>

Example: `./themes/default/layouts/index.pug`
```pug
doctype html
head
  title= title
  meta(name="description" content=description)
  meta(name="keywords" content=keywords)
	block head
body
	block content
		!= content // is needed to be unescaped
	block footer
```
As page contents is a simple html **don't forget to unescape it** in page layout.

## Routing
If `uri` param is not provided, **Cogear.JS** builds page route corresponding to folders structure.

Example:

Source file | Generated file | Real usage
:----------:|:-----------:|:------------:
/index.md    | /index.html  | /
/contact-us.hbs | /contact-us/index.html | /contact-us/
/about/index.pug | /about/index.html | /about/
/portfolio/beautiful-site.ejs | /portfolio/beautiful-site/index.html |  /portfolio/beautiful-site

In custom case when `uri` is provided system will follow it, adding `/index.html` at the end if is needed:

`uri` param | Generated file | Real usage
:----------:|:--------------:|:-----------:
index.html | /index.html | /
about | /about/index.html | /about
portfolio/awesome-site | /portfolio/awesome-site/index.html | /portfolio/awesome-site

In most cases you won't needed `uri` param at all.

## Per page scripts
All the pages share `app.js` entry script. But what if we need some other script to be on some page?

User `js` array variable to add scripts relative to site `source` directory (default: `./src`).

<article class="message is-warning">
  <div class="message-body"><b>Attention!</b> Usage of <code>js</code> meta-variable will rewrite it's default value (<code>app.js</code>). Don't forget to include <code>app.js</code> if you need it.</div>
</article>

Example: `./pages/about.md`
```bash
---
title: About
js: ["app.js","js/about.js"]
---
# About page
```

Example: `./pages/js/about.js`
```javascript
console.log("This message is shown only in \"About\" page console.")
// Or you can import even remote scripts
import('https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.js')
import('https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css')
// Or node_modules
import Vue from 'vue'
// Or local scripts
import Lib from './lib.js'
import './css/about.sass'
```

## Change, add or delete pages

If page content changes, browser will reload it's window automatically.

You can have instant reload content using [Vue.JS](https://vuejs.org), [React](https://reactjs.org), [Angular](https://angular.io), [Ember](https://emberjs.org) (where data is stored in Javascript).

> **Important**
>
> If you add or delete a page, **Cogear.JS** is needed to be reload.
>
> I'm stucked with it now. Because `webpack-dev-middleware` can't reload it's config on fly.

# Layouts
After the `page` content is parsed with proper formatter, system starts up to look for the layout.

`Layout` can be a file of the same [formats](#formats-parsers-) (with the exception of `.md`).

If `layout` is not defined in `page` metadata, it will be set to `index` by default.

Example:
```bash
---
title: Index
# no layout is provded here, so it'll be set to `index` by default
---
# Page contents
```

If `layout` is provided but has no extension, `.pug` will be used by default.

Example:
```bash
---
title: Index
layout: index # .pug extension will be added by default
---
# Page contents
```
If `layout` param provides extension, appropriate formatter will be used.

Example:
```bash
---
title: Index
layout: index.hbs # Handlebars compiler will be used
---
# Page contents
```

Layout extension|Compiler
:----------:|:-----------:
none    |   PUG
.pug    | PUG
.html   | EJS
.ejs    | EJS
.hbs    | Handlebars


## Layouts resolver
Layouts can be located at current theme `layouts` folder (default: `./themes/default/layouts`) or at current site `layouts` folder (example: `./src/layouts`).
```bash
Search loop:
1. Site layouts   # (ex.:`./src/layouts`)
2. Theme layouts  # (ex.:`./themes/default/layouts`)
```
This way you can override theme layout with the current site layout.

> If site config `config.theme` is set to `false`, only site `layouts` folder will be used for search.

> If there is no site or theme layout, build process will be stopped.

## Page content in layout

As it was said earlier, page metadata and it's content (as `content` field of data object) are provided to layout as variables.

Let's look and `html5` template (which also served with `EJS` compiler to make _variables_ be used):
```
<!doctype html>
<head>
  <title><%= title%></title>
</head>
<body>
  <%- output%>
</body>
```
Pay attention that `content` variable must be **unescaped** as it contains raw html data, parsed from page contents.

# Images
Images in css assets (`.sass`,`.less`,`.styl`, etc) can use relative paths.
```styl
.bg
  background: url('./images/bg.jpg')
```
Images paths in layouts and pages should be prefixed with `~` to be resolved correctly.
```markdown
# About

![me](/images/me.jpg)
```
In this case prefixed image will be resolved from `./src/images/me.jpg`.

Or even from `[current-theme-path]/images/me.jpg`.

Images resolver works for themes as well.