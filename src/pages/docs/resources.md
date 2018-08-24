
# Resources

All resources can be divided in two groups:
* Webpack-compiled
* Standalone

# Webpack
If any asset like image or font is called from site script or style, it will be fetched by [Webpack](https://webpack.js.org).

It will be piped to the output folder automatically.

# Standalone
Before preload core plugin copies all the files provided in `./src/resources` and `./theme/[current-theme]/resources` folders to the output folder (saving relative paths for every file).

Just put needed files in `./src/resources` if needed to be copied to the output.

Example:
* `./src/resources/images` => `./public/images`
* `./src/resources/favicon.png` => `./public/favicon.png`

# Watcher

In `development` mode all resources folder are watched for changes. If any file is added, changed or deleted, it will be immediately copied to the `output` folder. 