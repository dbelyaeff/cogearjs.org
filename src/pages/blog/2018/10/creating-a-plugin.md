---
title: How to create a plugin for Cogear.JS
tags:
  - videos
---

In this episode we’ll gonna plug in to the Cogear.JS core to extend its possibilities.
!https://www.youtube.com/watch?v=V427GA4BZHk
<!--more-->
Let’s start from giving a definition to a plugin.


> **Plugin** is a module which can hook into the systems core to change its behaviour.

**Node.JS** has first-party [EventEmitter](https://nodejs.org/api/events.html) – a huge API surface with synchronous event emitting, magic error event and flawed memory leak detected. **Cogear.JS** uses small library called [Emittery](https://github.com/sindresorhus/emittery), which has none of that.

**Cogear.JS** core is built from modules. Take a look at [the main script file](https://github.com/codemotion/cogear.js/blob/master/lib/cogear.js) in the repository and all modules it has plugged in.

### Source of `./lib/cogear.js`
``` javascript
module.exports = class Cogear extends Emittery {
  constructor() {
    super();
    // Set Cogear.JS as global object
    global.cogear = this;
    // Set package root
    this.baseDir = path.dirname(__dirname);
    // Load plugins
    this
      .load('utils')
      .load('init')
      .load('config')
      .load('death')
      .load('resources')
      .load('clear')
      .load('theme')
      .load('preload')
      .load('webpack.dev')
      .load('webpack.prod')
      .load('build')
      .load('openBrowser')
      .load('generators/init')
      .load('generators/site')
      .load('generators/plugin')
      .load('generators/theme')
      .load('deploy')
      .load('autoloader')	
      .load('cli');
  }
...
}
```

Moreover **Cogear.JS** main object class is globally available and extends Emittery, so events can be called throughout the entire code.

**Cogear.JS** as an inheritor of **Emittery** has two methods – `on` and `emit`. With `on` method you can add callback function for named event. And with `emit` method you call this event with or without arguments. 

Read more at the [Emittery docs](https://github.com/sindresorhus/emittery).

Arguments can be easily fetched from context of globally available `cogear` instance. Or you can pass them manually.

``` javascript
# without arguments
cogear.emit('event')
cogear.on('event',()=>{
  // Using context
  if(cogear.mode == 'production'){
    // action
  }
})
# with arguments
cogear.emit('event',arg1…argN)
cogear.on('event',(arg1[…,argN])=>{
  // action
})
```

To look thought all the events use [search](https://github.com/codemotion/cogear.js/search?utf8=✓&q=cogear.emit&type=) on GitHub repository. It will show all the event which you can hook into.

So what is a plugin in **Cogear.JS** environment? It’s a simple object with only one method required – which is called `apply`.

To learn more watch [the video](https://www.youtube.com/watch?v=V427GA4BZHk) or read [the docs](https://cogearjs.org/docs/plugins).

