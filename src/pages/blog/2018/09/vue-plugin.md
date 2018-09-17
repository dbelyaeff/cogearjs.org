---
title: Vue.JS plugin
tags:
	- plugins
---
[Vue.JS plugin](https://github.com/codemotion/cogear-plugin-vue/) has been released. It allows developer to import `.vue` [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) (combines in one file: __template__ + __script__ + __style__).

[![Vue.JS](https://i.imgur.com/WG2ykpJ.jpg)](/blog/2018/09/vue-plugin/)
<!--more-->

# Installation

Go to the site folder and install plugin with command:
```bash
yarn add cogear-plugin-vue
# or 
npm install cogear-plugin-vue
```

Plugin will loads up automatically.

# Usage

Just import `.vue` in your entry points.

``` javascript
import Search from './components/Search.vue'

// Later in DOMContentLoaded event

new Vue({
	el: "#search",
	render: h=>h(Search)
})
```

# Repository

It's very easy [in source code](https://github.com/codemotion/cogear-plugin-vue). Just injects proper loaders and plugins to **Webpack** config.

### Listing `./cogear-plugin-vue/plugin.js`:
``` javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  apply(){
    cogear.on('webpack.config',(webpackConfig)=>{
      webpackConfig.resolve.extensions.push('.vue');
      webpackConfig.module.rules.forEach(rule=>{
        if(Array.isArray(rule.use) && rule.use.indexOf('style-loader')){
          rule.use[rule.use.indexOf('style-loader')] = require.resolve('vue-style-loader');
        }
      });
      webpackConfig.module.rules.push({
        test: /\.vue$/,
        loader: require.resolve('vue-loader'),
        options: {
          extractCSS: cogear.mode !== 'development',
        }
      });
      webpackConfig.module.rules.push({
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [require.resolve('pug-plain-loader')]
          },
        ]
      });
      webpackConfig.plugins.push(new VueLoaderPlugin());
    });
  }
};
```
