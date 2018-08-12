---
title: Deploy
layout: docs
js:
	- js/docs.js
---
# Basics

When site is designed in `dev` mode and built in `production` mode, it's time to deploy it to the remote server.

Basically **Cogear.JS** can upload it via **FTP** of **SFTP** protocols.

You are free to write plugins for deploy to popular services like [Heroku](https://www.heroku.com), [now.sh](https://now.sh), etc.

# Deploying

Start deploying with:
```bash
> cogear deploy [preset-name]
```

If there is no presets available, you'll be asked a few questions in terminal about your hosting.

At the end of this quiz you'll be offered to create new preset for later use.

All the preset are stored in `.deployrc` configuration file.

If you using `Git` be aware to exclude this file from repo by adding it to `.gitignore`.

```bash
> echo ".deployrc" >> .gitignore
```

After deploy is done your site is available online.