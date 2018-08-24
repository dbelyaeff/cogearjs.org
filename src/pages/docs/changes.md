---
title: Changes log
---
## Changelog

### v1.2
* Add new hooks for cogear-plugin-blog.
* Add watcher for config.yaml which recompiles all pages on config
changes.
* Refactor core plugins for webpack.
* Refactor preload and build.
* Resources in dev mode are being linked now (just serve static byexpress from given folders)  instead of copied.

### v1.1

* Replaced [HTMLWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) because its extremly inperformance if page count is over thousand with simple _webpack-compiled_ assets injection.
* Changed workflow from `Webpack → Build` to `Preload → Webpack → Build`.
* Make almost all processing operations asynchronously – huge speed performance.<br>Build of __10.000 pages__ _(~ 3 pages per day in 10 years)_ tooks __14s__ now.
