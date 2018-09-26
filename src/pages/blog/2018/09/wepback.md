---
title: "New episode: Webpack"
tags:
  - videos
---
Today we will talk about Webpack.

Webpack is the most popular bundler to compile assets like scripts, styles, fonts, images and so on.

It can has multiple entry points (javascript files) where you can import almost any type of asset. All dependencies will be bundled to the output folder. And they can be transformed on the way to final destination – compressed, minified or anything else if you’ll find or write proper plugin.

!https://www.youtube.com/watch?v=60Bu-0c5MAY

<!--more-->

## Usage

Cogear.JS uses Webpack in it’s core. Webpack is fired up after pages has been preloaded. It’s important because pages can provide custom entry points in their metadata.

Default Webpack configuration includes several loaders for famous css preprocessors like SASS, LESS and Stylus. Babel and CoffeeScript compilation are also included out of the box.

Webpack works in two modes: production and development. Production bundling takes a lit more time because of scripts and styles are needed to be optimized. CSS also is extracted into separate files.
  
You can also install and use Cogear.JS plugin called compressor which will compress all pages and assets in output folder in order to drastically decrease their weight. All you have to do is to use proper server plugin to handle gzipped assets.

Development mode works faster because it doesn’t need to optimize assets. It also doesn’t compile styles, inlining them into html document body during render process. It provides hot-reloading for scripts and styles which reflects all changes immediately without page reloading.

To enhance Webpack capabilities you can write plugins for Cogear.JS. Take a look at Vue plugin which allow developers to use modern and famous Vue.JS framework. Just call a command `npm install cogear-plugin-vue` (or `yarn add cogear-plugin-vue`) in the project directory and within a few seconds you’ll be able to use Vue.JS in your project.

Hope this episode has been useful for you.

Next time we will deep dive into layouts and theming process. 