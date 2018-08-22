---
title: Changes log
---
## Changelog

### v1.1

* Replaced [HTMLWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) because its extremly inperformance if page count is over thousand with simple _webpack-compiled_ assets injection.
* Changed workflow from `Webpack → Build` to `Preload → Webpack → Build`.
* Make almost all processing operations asynchronously – huge speed performance.<br>Build of __10.000 pages__ _(~ 3 pages per day in 10 years)_ tooks __14s__ now.
