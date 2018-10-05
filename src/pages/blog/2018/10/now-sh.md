---
title: Deploying to now.sh
---


You need to [download](https://zeit.co/download) and install desktop **now.sh app**. It will provide command line utility called `now`.

When it has been installed deploy procedure becomes incredibly easy.
![](https://thepracticaldev.s3.amazonaws.com/i/231kh6x7j1udh5p8bvw6.jpg)
<!--more-->

Just compile your site (build it):
``` bash
$ cd ~/Sites/site

$ cogear build
```

It will be compiled to the `output` folder which is `./public` by default.

![](https://thepracticaldev.s3.amazonaws.com/i/jktv0tu9imsd48rllb5r.png)

Now you are ready to deploy.

``` bash
$ now --public public
```

You send the command to **Now** to upload the folder `./public`  in `--public` mode (it's required for non-paid accounts).

Within a few seconds, your site is online!

![](https://thepracticaldev.s3.amazonaws.com/i/1b7kou3t2xp7f9o6u6lx.png)

Site address has been copied to the clipboard.

You may choose an appropriate domain with `now alias` command.

``` bash
$ now alias https://public-psuaoefsus.now.sh cogear.now.sh
```

Done!

You can even use custom domain [via DNS management]((https://zeit.co/dns#get-started)). 

Like I do:
``` bash
$ now alias https://public-psuaoefsus.now.sh cogearjs.org
```

[Cogear.JS official site](https://cogearjs.org) is hosted at [Now.sh](https://now.sh) absolutely for free.
