---
title: Layouts
---
# Layouts
After the `page` content is parsed and webpack assets are compiled, system starts up to render pages with layouts.

`Layout` can be a file of the same [formats](/docs/pages#formats) (with the exception of `.md`).

# Formats
If `layout` is not defined in `page` metadata, it will be set to `index` by default.

Example:
```bash
---
title: Index
# no layout is provded here, so it'll be set to `index` by default
---
# Page contents
```

If `layout` is provided but has no extension, `.pug` will be used by default.

Example:
```bash
---
title: Index
layout: index # .pug extension will be added by default
---
# Page contents
```
If `layout` param provides extension, appropriate formatter will be used.

Example:
```bash
---
title: Index
layout: index.hbs # Handlebars compiler will be used
---
# Page contents
```

Layout extension|Compiler
:----------:|:-----------:
none    |   PUG
.pug    | PUG
.html   | EJS
.ejs    | EJS
.hbs    | Handlebars


# Resolvers
Layouts can be located at current theme `layouts` folder (default: `./themes/default/layouts`) or at current site `layouts` folder (example: `./src/layouts`).
```bash
Search loop:
1. Site layouts   # (ex.:`./src/layouts`)
2. Theme layouts  # (ex.:`./themes/default/layouts`)
```
This way you can override theme layout with the current site layout.

> If site config `config.theme` is set to `false`, only site `layouts` folder will be used for search.

> If there is no site or theme layout, build process will be stopped.

# Pages

Page metadata and it's content (as `content` field of data object) are provided to layout as variables.

Let's look and `html5` template (which also served with `EJS` compiler to make _variables_ be used):
```
<!doctype html>
<head>
  <title><%= title%></title>
</head>
<body>
  <%- output%>
</body>
```
> Pay attention that `content` variable must be **unescaped** as it contains raw html data, parsed from page contents.