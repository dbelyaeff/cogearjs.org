---
title: Plugins
description: Cogear.JS plugins system documentation.
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
* Use imagination

# Installation

All the plugins are represented in `npm` by packages prefixed with `cogear-plugin-`.

<article class="message is-success">
  <div class="message-body"><b>Cogear.JS</b> plugin is a npm package.</div>
</article>

<article class="message is-warning">
  <div class="message-body">All the following paths <b>are relative to the plugin folder</b>.</div>
</article>

For example if you want to install [`pages-json`](https://www.npmjs.com/package/cogear-plugin-pages-json) plugin which calls appropriate __Webpack__ plugin, you should do the following:
```bash
> npm install cogear-plugin-pages-json
# or
> yarn add cogear-plugin-pages-json
```

You don't need to enable it manually becase the system core will do it for you.

## Config

If you have `plugins` section in your `./config.yaml`, core will load plugins only mention there.

Example: `./config.yaml`
```yaml
#... Site config
plugins:
	- pages-json
	- blog
	- videos
	- sitemap
```
> Config-defined plugins disable autoloading from `node_modules`.

You can use globally-installed plugins (__npm packages__) with this method.

## Local

You can create `./plugins` folder in the root of you project and then download, generate or git clone `plugins` there.
```bash
./plugins
├── awesome                # plugin in development
└── cogear-plugin-awesome  # the same, but ready for npm
```
> Locally stored plugins have a higher priority over the `npm packages`.

# Structure

`Plugin` is a typical `npm` package.

It can be bundled with `Webpack` also as any other node module.

Let's start to develop `compressor` plugin and define it's file structure.

Listing: `cogear-plugin-compressor`
```bash
./cogear-plugin-compressor
├── README.md     # README
├── package.json  # npm package info file
└── plugin.js     # main scripts file
```

Listing: `cogear-plugin-compress/package.json`
```json
{
	"name": "cogear-plugin-compression",
	"description": "Cogear.JS compression plugin. Adds compression options to webpack production config.",
	"version": "1.0.0",
	"author": "Dmitriy Belyaev<admin@cogearjs.org>",
	"homepage": "https://github.com/codemotion/cogear-plugin-compression",
	"main": "./compress.js"
}
```

Listing: `cogear-plugin-compress/compress.js`
```javascript
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
	apply(cogear){
		cogear.hooks.webpackProd.tap('cogear-plugin-compress',(config)=>{
			config.plugins.push(new CompressionPlugin()))
		})
	}
}
```

Plugin script should return basic object with required `apply` method which recieves `cogear` instance as an argument.

That's it.

> But you don't need to create such a plugin, because production assets compression __is already in the core__ of **Cogear.JS**.

# Hooks
Hooks are implemented from [`webpack/tapable`](https://github.com/webpack/tapable).

If you are familiar with webpack plugins, there will be nothin new for you.

List of all hooks available in the system core `./lib/cogear.js`:
```javascript
module.exports = class Cogear {
	constructor() {
		...
		this.hooks = {
			cli: new SyncHook(["defaults"]),
			banner: new SyncHook(),
			init: new SyncHook(),
			config: new SyncHook(),
			death: new SyncHook(),
			build: new SyncHook(),
			clearBuild: new SyncHook(),
			buildPage: new SyncHook(["file"]),
			buildPagesJSON: new SyncHook(["pages"]),
			loadPagesForWebpack: new SyncHook(),
			webpackProd: new SyncHook(["startServer"]),
			webpackDev: new SyncHook(),
			buildDone: new SyncHook(), // When `cogear build` command is finished
			help: new SyncHook(["help"]),
			generators: {
				init: new SyncHook(["type"]),
				site: new SyncHook(),
				plugin: new SyncHook(),
				theme: new SyncHook(),
			},
			deploy: new SyncHook()
		}
		this
		.load('utils')
		.load('init')
		.load('config')
		.load('help')
		.load('death')
		.load('build')
		.load('clearBuild')
		.load('buildPage')
		.load('loadPagesForWebpack')
		.load('webpack.dev')
		.load('webpack.prod')
		.load('generators/init')
		.load('generators/site')
		.load('generators/plugin')
		.load('generators/theme')
		.load('autoloader')	
		.load('deploy')
		.load('cli')
	}
	...
}
```

As you've mentioned, **Cogear.JS** core is built with hooks and plugins.

And all you have to do in your plugin is to use aproppriate hook:

```javascript
module.exports = {
	apply(cogear){
		cogear.hooks.webpackProd.tap('My awesome plugin',(config)=>{
			// Do something with cogear instance and config argument
			// Hint: cogear.webpackConfig is provided
		})
	}
}
```

# Generator
To generate new plugin from scratch just use this command:
```bash
> cogear plugin [plugin-name]
```

Where `plugin-name` is a plugin folder and short name.

![generator](~images/docs/plugins/generator.svg)

It will automatically build basic file structure for you.