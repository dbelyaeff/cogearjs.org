---
title: Plugins
layout: docs
js:
	- js/docs.js
---
# Basics

Plugins extend **Cogear.JS** functionality. 

They hook into the core and can do a lot:
* Change webpack config to add loaders and rules
* Change build process
* Add more CLI options

# Installation

All the plugins are represented in `npm` with `cogear-plugin-` prefix.

<article class="message is-success">
  <div class="message-body"><b>Cogear.JS</b> plugin is a npm package.</div>
</article>

<article class="message is-warning">
  <div class="message-body">All the following paths <b>are relative to the plugin folder</b>.</div>
</article>

For example if you want to install `compress` plugin which calls appropriate __Webpack__ plugin, you should do the following:
```bash
> npm install cogear-plugin-compress
# or
> yarn add cogear-plugin-compress
```

You don't need to enable it manually becase the systems core will do it for you.

Well done.

# Structure

`Plugin` is a typical `npm` package.

It can be bundled with `Webpack` also as any other node module.

Let's continue to develop `compress` plugin and define it's file structure.

Listing: `cogear-plugin-compress`
```bash
|  package.json # npm package info file
|  compress.js  # main scripts file
```

Listing: `cogear-plugin-compress/package.json`
```json
{
	"name": "Cogear.JS compression plugin",
	"description": "Add compression options to webpack production config.",
	"version": "1.0",
	"author": "Dmitriy Belyaev<admin@cogear.pro>",
	"homepage": "https://github.com/codemotion/cogear-compression-plugin",
	"main": "./compress.js"
}
```

Listing: `cogear-plugin-compress/compress.js`
```javascript
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = (cogear) => {
	if(cogear.mode == "production"){
		cogear.hooks.webpackConfig.add((config)=>{
			config.plugins.push(new CompressionPlugin()))
		})
	}
}
```

That's it.



# Generator
To generate new plugin from scratch just use this command:
```bash
> cogear plugin new [plugin-name]
```

Where `plugin-name` is a plugin folder and short name.

It will automatically build basic file structure for you.