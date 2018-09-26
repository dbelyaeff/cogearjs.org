---
title: "Workflow: theming and layouts"
tags:
	- videos
---
Let’s dive deeply into layouts and theming.

What is theming? It’s a method to organize your site design. Make it reusable and available to share with the community. On the other hand, it gives you an opportunity to use themes made by others, modify them quickly and decrease development time.

What is theme in Cogear.JS environment? It’s a folder which stores at least main layout (called index) and package.json file, because Cogear.JS theme is an npm package. Yes, this gives you an ability to share and install themes with ease. 

!https://www.youtube.com/watch?v=WO1MMMrFlsc

<!--more-->

Theme can has a special file, entry point for Webpack, which will be loaded automatically — it’s a `theme.js` file, located in the root of theme directory. 

It’s almost like `app.js` entry point in the source directory. So you may include node modules, custom scripts and styles here and they will be bundled via **Webpack** during the compilation process.

Default layout `index.pug` is required, because it used for every page with no layout being set in metadata.

Themes can be located in themes folder of site directory or in node_modules folder if you’ve installed it with npm or yarn.

If you want to modify theme you have to ways: either copy theme from node_modules to themes folder (but you have to update it manually) of by override theme layouts using layouts folder of site directory.

Cogear.JS core looks for layouts in the following order:
1. ./src/layouts
2. ./themes/[current_theme]/layouts

Let’s install a theme for blogging. 

In case you don’t want to use theme at all, set `theme` param to `false`. Therefore you have to use `./src/layouts` folder for layouts.

To generate new theme type cogear theme theme-name being in the site root. After designing new theme you can easily deploy it to npm with npm publish command.

Don’t forget to add it to [cogear-awesome](https://github.com/codemotion/awesome-cogear) curated repository list by fork and pull-request to make everybody knows about new theme release.

Hope, this knowledge will be useful for you.

Next time we will learn plugins and **Cogear.JS**  events system to hook in.
