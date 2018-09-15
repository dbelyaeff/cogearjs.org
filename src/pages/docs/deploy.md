---
title: Deploy
description: How to deploy with Cogear.JS
---
# Basics

When site is designed in `development` mode and built in `production` or `build` mode, it's time to deploy it to the remote server.

Basically **Cogear.JS** can upload it via **FTP** or **SFTP** protocols and even use [rsync](https://rsync.samba.org) (if installed).

Deploy methods speed comparsion:

&nbsp;&nbsp;&nbsp;&nbsp;Method&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Speed&nbsp;&nbsp;&nbsp;&nbsp;
:----:|:----:
FTP|slowest
SFTP|fast
rsync|fastest

You are free to write plugins for deploy to popular services like [Heroku](https://www.heroku.com), [now.sh](https://now.sh), etc.

# Config
Before deploy preset should be created.

It can be stored either in `config.yaml` section called `deploy` or in standalone `deploy.yaml` file.

Example: `./config.yaml`
```yaml
title: Cogear.JS – modern static websites generator
theme: default
deploy:
  production:
    type: rsync
    host: cogearjs.org
    user: deploy
    commands: "-avz --delete --progress --quiet"
    path: /home/cogear/www/cogearjs.org/
```

If you store passwords and initiated `git` repository, it's better to use `deploy.yaml` for config. 

In this case file shouldn't be uploaded to the repository (especially **public** one).
> Don't forget to add `deploy.yaml` in `.gitignore` to exclude this file from repo.

Example: `./deploy.yaml`
```yaml
production:
	type: rsync
	host: cogearjs.org
	user: deploy
	commands: "-avz --delete --progress --quiet"
	path: /home/cogear/www/cogearjs.org/
ftp:
	type: ftp
	host: ftp.cogearjs.org
	user: ftpuser
	port: 21
	password: ********
	path: /home/cogear/www/cogearjs.org/
sftp:
	type: sftp
	host: cogearjs.org
	user: ftpuser
	password: ********
	path: /home/cogear/www/cogearjs.org/
```

# Deploying

Start deploying with:
```bash
$ cogear deploy [preset-name]
```
> If output folder is empty, build will be done automatically before deploy.

If no preset is called, **the first one** will be fired (the highest one in `yaml` config).

![deploy](/images/docs/workflow/deploy.svg)

After deploy is done your site will br available online.