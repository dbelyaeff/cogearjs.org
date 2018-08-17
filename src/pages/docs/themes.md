---
title: Themes
description: Cogear.JS themes documentation.
layout: docs
js:
	- js/docs.js
---
# Basics
Themes **provide [layouts](/docs/workflow#layouts)** and can be used to **load additional assets** _(scripts, styles, fonts, etc)_.

# Installation

All themes are represented as `npm` packages with prefix `cogear-theme-`.

<article class="message is-success">
  <div class="message-body"><b>Cogear.JS</b> theme is a npm package.</div>
</article>

For example, if you decided to build your own theme named `bulma` its package must be named as `cogear-theme-bulma`.

<article class="message is-warning">
  <div class="message-body">All the following paths <b>are relative to the theme folder</b>.</div>
</article>

Install themes with ease:

## From npm
```shell
> npm install cogear-theme-bulma
# or 
> yarn add cogear-theme-bulma
```
## From git
```shell
> git clone https://github.com/codemotion/cogear-theme-bulma ./themes/bulma
```

> Themes located in `./themes` folder have a higher priority over npm packaged themes.

Edit `./config.yaml` to set up new theme:
```yaml
site:
  title: Cogear.JS – modern static websites generator
  description:
  keywords: 
theme: bulma
# or
theme: cogear-theme-bulma # no difference
```

# Structure

Basic file structure is:
```bash
./themes/bulma
├── README.md       # README
├── favicon.png     # Favicon [optional]
├── layouts         # Layouts folder
│   └── index.pug   # Index layout
├── package.json    # npm package.json
├── screenshot.png  # theme screenshot [optional]
├── style.styl      # theme style [optional]
└── theme.js        # theme script [optional]
```

Listing: `./layouts/index.pug`
```pug
doctype html
head
	title= title
	block head
body
	block content
		!= content
	block footer
```

Listing: `./package.json`
```json
{
	"name": "Default Cogear.JS theme",
	"version": "1.0.0",
	"author": "Dmitriy Belyaev <admin@cogear.org>",
	"homepage": "https://cogearjs.org"
}
```

Everything else you need – you may do what you want: 
* organize dirs,
* make tests,
* write scripts,
* create styles,
* provide images,
* install fonts,
* import node modules.

You are free with your inspiration.

For example, you may create `theme.js` entry point (with script, styles, images and fonts imports) and import it in `./src/app.js`.

Listing: `./theme.js` (theme root)
```javascript
import('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.min.css')
```

> This file will be imported automatically if exists.

Use it as an entry point for all other styles and scripts from your theme.

Well done! 

# Generator
To generate new theme from scratch just use this command:
```bash
> cogear theme [theme-name]
```
Where `theme-name` is a theme folder and a short name.

If you located in project root, theme will be generated in `./themes` folder.

If you are not, theme will be generated in __current dir__  (in case you're building npm package).


![generator](~images/docs/themes/generator.svg)

It will automatically build basic file structure for you.

# Publish

If you want to share your theme with **Cogear.JS** community do next:

1. Place it in a standalone folder outside your project git repo and `cd` into it.
2. Init `npm` or `yarn`.
```shell
> npm init
# or
> yarn init
```
2. Make sure that theme name is prefixed with `cogear-theme-` in `package.json`.
3. Login to npm:
```shell
> npm login
```
4. Publish:
```shell
> npm publish
```
5. Done.

Now you theme is packaged and is available to install for anyone in the world!
