---
title: Webpack
layout: docs
description: Cogear.JS webpack info.
js:
	- js/docs.js
---
# Basics

[Webpack](https://webpack.js.org) is the most advanced build tool for compiling assets. 

In fact it's a new worldwide standart for building websites.

Moreover it providers realtime **hot reloading** to implement all the changes throughout all the scripts, styles, images and fonts assets immedeately. 

# Configs

Config files both for `production` and `development` modes are located into the main `cogear` package root:
```bash
./
|  webpack.prod.js   # <= Production config
|  webpack.dev.js    # <= Development config
|  webpack.common.js # <= Common config shared between production and development
```

Let's take a closer look at them.

## `webpack.common.js`
<script src="https://gist.github.com/codemotion/1296ca28650c6eb8a9854d6a3c6190fc.js"></script>

## `webpack.dev.js`
<script src="https://gist.github.com/codemotion/2b9a5cc2a896ff99d8b1cce56ff91e30.js"></script>

## `webpack.prod.js`
<script src="https://gist.github.com/codemotion/1e8e57fadbeb3bcce1d016837997a73b.js"></script>

All in all it's usual [Webpack](https://webpack.js.org) config. You can edit it in your project to customize [Webpack](https://webpack.js.org) behavior. 

If you have some questions, please, take a closer look [to the concepts](https://webpack.js.org/concepts/) in [Webpack](https://webpack.js.org) documentation.

# Hooking configs

As you've noticed config files returns a function which accepts system instasnce as `cogear` argument.

This means that configs are called from inside the system build process.

You may use `webpackProd` of `webpackDev` hook in your [plugin](/docs/plugins) to change the webpacks config.