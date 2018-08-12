---
title: Webpack
layout: docs
js:
	- js/docs.js
---
# Basics

[Webpack](https://webpack.js.org) is the most advanced build tool for compiling assets. 

In fact it's a new worldwide standart for building websites.

Moreover it providers realtime **hot reloading** to implement all the changes throughout all the scripts, styles, images and fonts assets immedeately. 

# Configs

Config files both for `production` and `development` modes are located in the project root:
```bash
./
|  webpack.prod.js   # <= Production config
|  webpack.dev.js    # <= Development config
|  webpack.common.js # <= Common config shared between production and development
```

Let's take a closer look at them.

## `webpack.common.js`
__TODO: Github file__

## `webpack.prod.js`
__TODO: Github file__

## `webpack.dev.js`
__TODO: Github file__

All in all it's usual [Webpack](https://webpack.js.org) config. You can edit it in your project to customize [Webpack](https://webpack.js.org) behavior. 

If you have some questions, please, take a closer look [to the concepts](https://webpack.js.org/concepts/) in [Webpack](https://webpack.js.org) documentation.

# Hooking configs

As you've noticed config files returns a function which accepts system instasnce as `cogear` argument.

This means that configs are called from inside the system build process.

You may use `webpackConfig` hook in your [plugin](/docs/plugins) to change the config (detecting **Cogear.JS** mode with `cogear.options.mode` variable).