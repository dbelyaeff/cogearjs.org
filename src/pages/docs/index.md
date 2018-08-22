---
title: Getting Started
description: Getting Started guide for Cogear.JS
---
# Getting started
# About

**Cogear.JS** is a static websites generator built with [Node.JS](https://nodejs.org) (9.x or higher) and based on [Webpack](https://webpack.js.org) (v4.6).

It's inspired by [Jekyll](https://jekyllrb.com) and others, but built on the top of the latest frontend technologies.

Provides awesome hot reloading experience in `development` mode.

<article class="message is-info is-desktop">
  <div class="message-body">Use arrow keys <button>&larr;</button> <button>&rarr;</button> to navigate through the docs.</div>
</article>

## Features
* <i class="fab fa-js" style="color:#5e0ce5"></i> **Modern technology stack** <br>Build modern static websites with bundled scripts and styles.<br>Rapidly prototype and instantly deploy to the server.<br>
Use **any modern frontend stack** (**webpack** bundled) – [Vue.JS](https://vuejs.org), [React](https://reactjs.org), [Angular](https://angular.io), [Ember](https://emberjs.org), etc.
* 🚀  **Blazing fast and reliable**<br>
Performs nearly 1.000 pages per second (depends on the pages content and raw computer processor power).<br>
 Being online. Server can handle thousands requests per seconds to serve static files (even on tiny VPS).
* <i class="fas fa-database" style="color: rgb(41.5%, 46%, 41.5%)"></i> **For any hosting**<br>
Doesn't requires **any database** (data stored in flat files) and works on **any hosting** (as it produces *static html and assets files*).
* <i class="fas fa-shipping-fast" style="color: orange"></i> **Deploy built in**<br>
[Create a preset](/docs/deploy) and update your site to the server via FTP, SFTP or even `rsync`.
* <i class="fas fa-lock"></i> **Secure. No updates needed**<br> 
Just forget about annoying regular update from usual CMS.<br>
It's **100% secure** for hacking because there is no backend after being deployed to the server.
* <i class="fab fa-osi" style="color: green"></i> **Free. Open Sourced**<br>
Use it for free. For any needs. Forever.<br>

[Github Pages](https://pages.github.com) (or any similar project) you can host generated site **for free**.

### What it can be used for:
* Rapid site prototyping 
* Portfolio site
* Company site
* Product site
* Personal blog
* Artist or musician site

Any site that has admin-generated content. 

> Multi-user content management can be provided via [Github](https://github.com). Just store your source in the repository, accept pull-requests from other users and build a site after commits (can be automated).

Using [Firebase](https://firebase.google.com) or any other _backend_, written in _any lang_ (**PHP**, **Ruby**, **Python**, **Node.JS**) or even with CMS like a **WordPress**, with help of modern frontend technologies like [Vue.JS](https://vuejs.org) or [React](https://reactjs.org), it can be turned into more dynamic site like **e-commerce**, **products catalog** and so on.

### What it cannot be used for:
* Forum
* Social network
* Chat

Or any other site type with great amount of user-generated content which relies on heavily database usage and dynamically generated pages.

Of course you can try, but it has to be modern [SPA](https://en.wikipedia.org/wiki/Single-page_application) which handles data from dedicated API.


# Requirements

You have [Node.JS](https://nodejs.org) (9.x or higher) and [NPM](https://www.npmjs.com) (usually comes together) to be installed.

[Download and install.](https://nodejs.org/en/download/)

The latest version (v10.9.0) is recommended.

You can also use [Yarn](https://yarnpkg.com) instead of [NPM](https://www.npmjs.com).

**Cogear.JS** runs on:
* Mac
* Linux
* Windows

You may want to use awesome [VSCode](https://code.visualstudio.com) editor.

# Installation
To install **Cogear.JS** do next:
```bash
> npm install cogear -g
# or
> yarn global add cogear
```
Done. Congratulations!

**Cogear.JS** is now available via cli-command `cogear`.

Now you're ready to build your first site.

# Usage
Go to the directory where all your local sites are hosted.
```bash
> cd ~/Sites
```
Create a new site via command:
```bash
> cogear new site.io # where "site" is your site folder name

# if you have a preset, use it's git repo address as fourth arg
> cogear new site.io https://github.com/codemotion/cogear-preset-docs
```

> Preset is a github repo which is being cloned locally. It's just an analog of `git clone` command.

![crafting site](/images/term.svg)

After that go to site dir:
```bash
cd ~/Sites/site.io
```

And start up **Cogear.JS** in `development` or `production` mode ([learn more](/docs/workflow#modes)).
```bash
> cogear # run in develompent mode with hot-reload – by default

> cogear production # build a site and run local server
```

# Options
All available options can be seen via `--help` (or shortcut `-h`) command.
```bash
> cogear -h

Usage: cogear [command]

Runs in development mode by default (without [command]).

Options:

  -h, --help          output usage information
  -s, --src           set source directory, default: ./src
  -o, --output        set output directory, default: ./public
  -h, --host          set host for local server, default: localhost
  -p, --port          set port for local server, default: 9000
  -o, --open          if set to false, browser will not be opened after build, default: false
  -v, --version       print current version
  -w, --verbose       set webpack verbose mode, default: true
  -y                  yes to all questions, for generators

Commands:

  command   (alias)     [optional]      description

  [dev]        (dev)                              run dev server # w/hot-reload [DEFAULT]
  production   (prod)                             run build and starts static server # no hot reload
  build        (b)                                run build
  deploy       (d)       [preset]                 deploy site to server
  new          (n)       [site-name]   [-y]       generate new site
  plugin       (p)       [plugin-name] [-y]       generate plugin boilerplate
  theme        (t)       [theme-name]  [-y]       generate theme boilerplate

For more information visit:
https://cogearjs.org
```

Let's take a look at the workflow.