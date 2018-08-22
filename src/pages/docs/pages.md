---
title: Pages
description: Pages are the main data structure units of Cogear.JS.
keywords: Cogear.JS, pages, workflow, how to
---
# Pages
Pages are the main structure units of **Cogear.JS**.

They must be located in `pages` subfolder of the `src` directory (default: `./src/pages`).

# Formats

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

# Metadata
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

# Routing
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

# Scripts
All the pages share `app.js` entry script. But what if we need some other script to be on some page?

User `js` array variable to add scripts relative to site `src` directory (default: `./src`).

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

# Config

Site config can be used to store metadata for pages.

Config `pages` array with a `regexp` as key can be used to set config params for a couple of pages at once.

```yaml
title: Cogear.JS – modern static websites generator
theme: default
pages:
  ^docs/:
    layout: docs
    js:
      - js/docs.js
```

# Watchers

In `development` mode watcher is started.

If any page or layout (local or `theme`) will be changed, added or deleted, certain files will be rerendered and browser will be reloaded automatically.
<!-- If page content changes, browser will reload it's window automatically.

You can have instant reload content using [Vue.JS](https://vuejs.org), [React](https://reactjs.org), [Angular](https://angular.io), [Ember](https://emberjs.org) (where data is stored in Javascript).

> **Important**
>
> If you add or delete a page, **Cogear.JS** is needed to be reload.
>
> I'm stucked with it now. Because `webpack-dev-middleware` can't reload it's config on fly. -->