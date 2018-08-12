---
title: Themes
layout: docs
js:
	- js/docs.js
---
# Basics
Themes provide layouts and can be used to load additional scripts, styles, images and other type of assets.

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
```bash
> npm install cogear-theme-bulma
# or 
> yarn add cogear-theme-bulma
```

Then edit `./config.json` file to match installed theme:
```json
{
  "site": {
    "title": "Cogear.JS – modern site generator (Node.JS/Webpack)"
  },
  "theme": "bulma",
  "plugins": [
    
  ]
}
```

# Structure

Basic theme file structure is:
```bash
./bulma
|  layouts    # Layouts folder
|  \index.pug # Index layout | required
|  # Basic node module package.json file with theme info	
|  package.json 
|  README.md # Do not forget to tell other users about your theme
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
	"version": "1.0",
	"author": "Dmitriy Belyaev <admin@cogear.pro>",
	"homepage": "https://cogear.pro"
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

And then just import it in your main `./src/app.js` script (relative to the project `root`):

Listing: `./src/app.js` (project root)
```javascript
import('@/theme.js')
```
Well done! All the scripts, styles, fonts, images (and so on) will be imported automatically.

# Generator
To generate new theme from scratch just use this command:
```bash
> cogear theme new [theme-name]
```

Where `theme-name` is a theme folder and short name.

It will automatically build basic file structure for you.