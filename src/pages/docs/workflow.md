---
title: Workflow
layout: docs
js:
	- js/docs.js
---
# Basics
**Cogear.JS** is a static site generator. It means that it compiles `source` folder data to static html and assets files to the `output` folder.

Pages in `source` folder can be provided in different formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.

Compiled pages can have `layouts` which are provided by site `theme`.

Main script `app.js` is bundled with every page, but additional per page scripts can be defined in page meta (with [`yaml-front-matter`](https://github.com/spatie/yaml-front-matter)).

All external (remote) and internal(local or from `node_modules`) modules should be imported from scripts.

# Build
To build static site **Cogear.JS** performs next steps:
1. Reads site config from `./config.json`.
2. Searches `source` directory `pages` subfolder for pages. (default: `./src/pages`)
3. Reads pages. 
Available page formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.
Parse metadata with [`yaml-front-matter`](https://github.com/spatie/yaml-front-matter).
4. Compiles static `html` files from pages content through the `theme` layout into `build` folder.
5. Fires up `webpack` server (in `production` mode) or `webpack-dev-server` (in `dev` mode, with *hot-reload*).
6. Compiles assets and injects them into previousely built static html files.
Assets are: `js`,`coffee`,`css`,`sass`,`scss`,`stylus`,`less`,`Vue`,`jsx`,`fonts`,`images`.
7. Done.



## Config
Config is a simple JSON-file located at `./config.json`.
```json
{
  "site": {
    "title": "Cogear.JS – modern site generator (Node.JS/Webpack)"
  },
  "theme": "default"
}
```
If `page` title is not defined then site config title will be used.

Pay attention to the `theme` property as it defines basic layout and can be also used to load scripts, styles and other assets.

# Modes
When **Cogear.JS** is called from command line it starts in `production` mode.

## Production
```bash
> cogear # run production mode by default
```
This mode performs:
1. Pages build.
2. Assets compilation and injection to pages with [Webpack](https://webpack.js.org).
3. Starting local server to check out the results.

It should be called before [deploy](/docs/deploy) process in order output files to be built in physical file system.

## Development
```bash
> cogear dev # run dev mode with param
```
This mode peforms:
1. Pages build and start watcher to listen for pages changes.
2. Start [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) which will instantly update in-browser pages, scripts and styles on the fly with `hot-reload` module.
3. Local server is server by [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server).

It handles all files in memory, so there is no output in physical file system in this mode. 


# Source
It's the place where all magic happens.

Basic structure:
```bash
# Listing of ./src dir
./src
|  layouts/     # optional
|    index.pug  # optional
|  pages/       # required
|    index.md   # site index page
|  app.js       # required
```

The required files are: `app.js` and `pages/index.md` (`Markdown` or [any other format](#pages)).

## Main script `app.js`

It's the `entry` point ([`Webpack` term](https://webpack.js.org/concepts/entry-points/)) which has to be injected in all the pages.

All you internal and external scripts may be imported there.

Example:
```javascript
// Look at webpack-specific comments
import(/* webpackPrefetch: true*/'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css')
// Either remote or local scripts, styles and other resources (like fonts) can be loaded
import(/* webpackChunkName: "styles", webpackPrefetch: true, webpackPreload: true*/'./css/app.styl')
// You can even import your theme entry script if it's necessary
import('@/theme.js')
// `@` is an alias for current theme folder
// `#` is an alias for project root folder
```



# Pages
Pages are the main structure units of **Cogear.JS** generator.

They must be located at `pages` folder of the `source` directory (default: `./src/pages`).

## Formats (parsers)

They can be in various formats: `.md`,`.pug`,`.html`,`.ejs`,`.hbs`.

Different pages can have their own file extension at the same time (but avoid the same filenames).
```bash
./src/pages
|  index.md            # Compiles with Markdown
|  about.html          # Compiles with EJS (can use variables)
|  contact-us.pug      # Compiles with PUG
|  portfolio.ejs       # Compiles with EJS
|  testimonals.hbs     # Compiles with Handlebars
```

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

## All pages in JSON-file

For usefull cases after the build has been done (and before `Webpack` starts) all the pages are store in `./src/pages.json` file.

It can be import in any entry point and used, for example, in menu building or list output.

Example: `./src/app.js`
```javascript
import pages from "./pages.json"

pages.forEach((page)=>{
  // Do something
})
```

# Layouts
After the `page` content is parsed with proper formatter, system starts up to look for the layout.

`Layout` can be a file of the same [formats](#formats-parsers-).

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

If `layout` is set to `false`, the `page` output will be written directly to the `output file` (__without layout__).

Example:
```bash
---
title: Index
layout: false # layout is set to `false`, then page will be written directly to the output file
---
# Page contents
```

## Layouts resolver
Layouts can be located at current theme `layouts` folder (default: `./themes/default/layouts`) or at current site `layouts` folder (example: `./src/layouts`).
```bash
Search loop:
1. Site layouts   # (ex.:`./src/layouts`)
2. Theme layouts  # (ex.:`./themes/default/layouts`)
```
This way you can override theme layout with the current site layout.

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