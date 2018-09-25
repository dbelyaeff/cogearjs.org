---
title: Plugins
description: Cogear.JS plugins system documentation.
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
$ npm install cogear-plugin-pages-json
# or
$ yarn add cogear-plugin-pages-json
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

Listing: `cogear-plugin-compressor/package.json`
```json
{
	"name": "cogear-plugin-compression",
	"description": "Cogear.JS compression plugin. Adds compression options to webpack production config.",
	"version": "1.0.4",
	"author": "Dmitriy Belyaev<admin@cogearjs.org>",
	"homepage": "https://github.com/codemotion/cogear-plugin-compressor",
	"main": "./compress.js"
}
```

Listing: `cogear-plugin-compressor/compress.js`
```javascript
const CompressionPlugin = require("compression-webpack-plugin")
const zlib = require('zlib')
const Buffer = require('buffer').Buffer
const fs = require('fs')
const now = require("performance-now");
const prettyMs = require("pretty-ms");
const ora = require('ora')
module.exports = {
		apply(){
			// Process hooks here
			cogear.on('webpack.config',(webpackConfig)=>{
				if(['production','build','deploy'].includes(cogear.mode)){
					webpackConfig.plugins.push(
						new CompressionPlugin({
							test: /\.(html|js|css|svg|eos|woff|woff2|ttf)$/
						})
					)
				}
			})
			cogear.on('build.page.writeAfter',([page,html])=>{
				if(cogear.mode == 'production'){
					let start = now()
					zlib.gzip(new Buffer(html),(err,result)=>{
						if(err){
							console.error(err)
						}
						try {
							fs.writeFileSync(
								page.writePath + '.gz',
								result
							)
							ora().succeed(`Compressor: ${chalk.bold(page.path)} => ${chalk.bold(page.path + '.gz')} (${prettyMs(now()-start)})`);
						} catch (e){
							console.error(e)
						}
					})
				}
			})
			// Add support of cogear-plugin-pages-json
			cogear.on('pages.json',(file)=>{
				let start = now()
				zlib.gzip(fs.readFileSync(file),(err,result)=>{
					if(err){
						console.error(err)
					}
					try {
						fs.writeFileSync(
							file + '.gz',
							result
						)
						let filePath = file.replace(process.cwd(),'.')
						ora().succeed(`Compressor: ${chalk.bold(filePath)} => ${chalk.bold(filePath + '.gz')} (${prettyMs(now()-start)})`);
					} catch (e){
						console.error(e)
					}
				})
			})
		}
}
```

Plugin script should return basic object with required `apply` method which recieves `cogear` instance as an argument.

That's it.

> But you don't need to create such a plugin, because it [has already been created](https://github.com/codemotion/cogear-plugin-compressor).

# Events
Plugins hooks into the events.

The `cogear` object is available globally, so it can be called in any point of your plugin.

If you are familiar with webpack plugins, there will be nothin new for you.

**Cogear.JS** core is built with events and plugins.

And all you have to do in your plugin is to use aproppriate hook:

```javascript
module.exports = {
	apply(){
		cogear.on('build.page',(page)=>{
			// Do something with page
		})
	}
}
```

List of available events you can find in the source code or use [search in repo](https://github.com/codemotion/cogear.js/search?q=cogear.on&unscoped_q=cogear.on).

# Generator
To generate new plugin from scratch just use this command:
```bash
$ cogear plugin [plugin-name]
```

Where `plugin-name` is a plugin folder and short name and `` is optional flag to say `yes` for any questions.

![generator](/images/docs/plugins/generator.svg)

It will automatically build basic file structure for you.

# Publish

If you want to share your plugin with **Cogear.JS** community do next:

1. Place it in a standalone folder outside your project git repo and `cd` into it.
2. Init `npm` or `yarn`.
```shell
$ npm init
# or
$ yarn init
```
2. Make sure that plugin name is prefixed with `cogear-plugin-` in `package.json`.
3. Login to npm:
```shell
$ npm login
```
4. Publish:
```shell
$ npm publish
```
5. Done.

Now you plugin is packaged and is available to install for anyone in the world!