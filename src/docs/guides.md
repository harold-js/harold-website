---
layout: 'docs'
title: 'Guides'
publicationDate: '2021-05-01'
tags:
  - docs
ogTitle: "Harold Guides - Static site generator"
ogDescription: "Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how to use it."
ogUrl: "https://www.haroldjs.com/docs/guides.html"
twitterTitle: "Harold Guides - Static site generator"
twitterDescription: "Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how to use it."
twitterUrl: "https://www.haroldjs.com/docs/guides.html"
---

Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how it is built. Be sure to check [Getting started](/docs/getting-started.html) section first.

## Workflow

With Harold, the workflow looks like this:

  1. You work in the `src` directory, and Harold transforms everything into standard .css and .html files in the `build` directory.
  2. You can prepare `partials`, `pages`, `posts/docs` and `assets` files.
  3. You work with Handlebars and Markdown. So a little bit of knowledge of these two is required.
  4. You work with a development server that runs at `localhost:3000`.
  5. You will get all changes reflected in the browser after refreshing it.

## Directories structure

Below is the `src` directory structure from the Default template:

```bash
.
├── assets
│   ├── images
│   │   └── favicon.png
│   └── js
│       ├── harold.js
│       ├── harold-main-menu.js
│       ├── harold-scroll-top.js
│       └── harold-search.js
├── blog-layouts
│   └── blog-post.hbs
├── jsonData
│   └── posts.json
├── pages
│   ├── about.hbs
│   ├── all-posts-list.hbs
│   ├── author.hbs
│   ├── index.hbs
│   └── projects.hbs
├── partials
│   ├── footer.hbs
│   ├── go-top-btn.hbs
│   ├── head.hbs
│   ├── main-menu-overlay.hbs
│   └── search-overlay.hbs
├── posts
│   ├── example1.md
│   ├── example2.md
│   ├── example3.md
│   ├── example4.md
│   ├── example5.md
│   ├── example6.md
│   └── harold-intro.md
└── styles
    ├── _basic.scss
    ├── _homepage.scss
    ├── _main-menu.scss
    ├── main.scss
    ├── _page.scss
    ├── _post.scss
    ├── _search.scss
    ├── _utils.scss
    └── _variables.scss
```

`styles` and `assets` directories are self-explanatory. Here you can build your Scss structures and custom javascript logic. You can also save images here. All will be moved and compiled later.

`posts` and `pages` are places for actual content. You write pages with Handlebars markup and posts with Markdown.

`blog-layouts` is a place for all custom blog layouts. You can then point particular layout to use in the Markdown file.

All compiles and lands in the `build` directory:

```bash
.
├── about.html
├── all-posts-list.html
├── assets
│   ├── images
│   │   └── favicon.png
│   └── js
│       ├── harold.js
│       ├── harold-main-menu.js
│       ├── harold-scroll-top.js
│       └── harold-search.js
├── author.html
├── index.html
├── jsonData
│   └── posts.json
├── posts
│   ├── example1.html
│   ├── example2.html
│   ├── example3.html
│   ├── example4.html
│   ├── example5.html
│   ├── example6.html
│   └── harold-intro.html
├── projects.html
└── styles
    └── main.css
```

As you can see here, static website, ready to deploy.

## Pages and partials

You will build pages using Handlebars templating engine. So everything possible with Handlebars should be possible also here. You can define your contents and split them into partials. Partial is a fragment of your HTML-like document.

```handlebars
<div class="container-full-width docs-layout" data-js-doc-content>
  {{> docs-sidebar-left}}
  <section class="docs-content docs-home">
    <h1>A quick intro to Harold JS</h1>
```

`{{> docs-sidebar-left}}` here is nothing more than a separate `.hbs` file located in the `partials` directory. It will be injected precisely in this place in the code.

You can also use partials with parameters. For example we can use `head` partial (also located in `partials` directory) which looks like:

```handlebars
{{> head
  title="Harold - Static site generator"
  description="Blogs, landing pages, portfolios, documentation sites - start with ready-to-use templates"
  ogTitle="Harold - Static site generator"
  ogDescription="Blogs, landing pages, portfolios, documentation sites - start with ready-to-use templates"
  ogUrl="https://www.haroldjs.com"
  twitterTitle="Harold - Static site generator"
  twitterDescription="Blogs, landing pages, portfolios, documentation sites - start with ready-to-use templates"
  twitterUrl="https://www.haroldjs.com"
}}
```

Handlebars engine will then inject all of these parameters into partial's placeholders. Head partial looks like:

```handlebars
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/assets/images/favicon.png" type="image/png" />
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
    
  <meta property="og:title" content="{{ogTitle}}" />
  <meta property="og:description" content="{{ogDescription}}" />
  <meta property="og:image" content="{{ogImage}}" />
  <meta property="og:url" content="{{ogUrl}}" />

  <meta name="twitter:title" content={{twitterTitle}} />
  <meta name="twitter:description" content="{{twitterDescription}}" />
  <meta name="twitter:url" content="{{twitterUrl}}" />
  <meta name="twitter:image" content="{{twitterImage}}" />
```

In the end, everything is compiled to standard .html starting from the page file as a root file for html output.

Read more in the Handlebars docs: [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/)

## Markdown files

Every single Markdown file is compiled into a separate .html file located in the `posts` directory (or different one if there is custom config file). Every file defines a couple of parameters at the top of the file. It uses the Front Matter approach (Embedded YAML structured data at the top of Markdown documents).

```markdown
---
layout: 'docs'
title: 'Recipes'
publicationDate: '2021-05-01'
tags:
  - learn
ogTitle: "Harold Recipes - Static site generator"
ogDescription: "Ready-to-use recipes. You can take them as inspiration or copy it as it is and use in your custom template"
ogImage: "https://www.haroldjs.com/assets/images/harold-start.png"
ogUrl: "https://www.haroldjs.com/docs/recipes"
twitterTitle: "Harold Recipes - Static site generator"
twitterDescription: "Ready-to-use recipes. You can take them as inspiration or copy it as it is and use in your custom template"
twitterImage: "https://www.haroldjs.com/assets/images/harold-start.png"
twitterUrl: "https://www.haroldjs.com/docs/recipes"

---

Rest of the markdown content here...
```

You can add as many parameters there as you can, but Harold requires mandatory ones in every .md file. They are:

- `layout` - defines which blog layout to use
- `title` - defines post title
- `publicationDate` - defines publication date in format YYYY-MM-DD

In markdown files, you can also use standard HTML code. Of course, most of it. Some special scripting tags are removed when compiling. 

In the Default template, there are predefined styles and structures to be used. For example, wide media elements: 

```html
<div class="wide-content"><img src="/assets/img.png" alt="alt text" /></div>
```

So to use it, you can paste your image into div with the `wide-content` class.

Another predefined structure will be helpful when you need to embed some iframe-based content.

```html
<div class="embeded-media-container">
  <iframe height="224" style="width: 100%;" scrolling="no" title="Confirmation Button" src="https://codepen.io/rubenasanchez/embed/preview/mdRqqbN?height=224&theme-id=dark&default-tab=css,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
    See the Pen <a href='https://codepen.io/rubenasanchez/pen/mdRqqbN'>Confirmation Button</a> by Ruben A Sanchez
    (<a href='https://codepen.io/rubenasanchez'>@rubenasanchez</a>) on <a href='https://codepen.io'>CodePen</a>.
  </iframe>
</div>
```

It will be also responsive.

## Helpers

Helpers are unique fragments of Handlebars code that maps javascript functions under the hood. So you can use loops, conditions, blocks, etc. The list of all built-in helpers is here: [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/).

Besides that Harold offers it's own custom helpers which are:

**formatDate**

It is a handy helper when you need to change date formatting across the whole app.

```handlebars
{{formatDate date=publicationDate format='dd mmmm yyyy'}}
```

In the example above, we take `publicationDate`, and we format it using `dd mmmm yyyy`. Check format options here: [https://blog.stevenlevithan.com/archives/date-time-format](https://blog.stevenlevithan.com/archives/date-time-format).

It can be used in every .hbs file.

**postsList**

This helper is very powerful when it comes to building post lists. It has a very good parametrization.

```handlebars
{{postsList
  perPageLimit=6
  currentPage=1
  className="homepage-featured-post"
  noTags=true
  noExcerpt=true
  noDate=true
  byTagName="featured"
  noReadMoreButton = false,
  readMoreButtonLabel="Lets dive in!"
  noImage = false,
  dateFormat = 'yyyy-mm-dd',
}}
```

- `perPageLimit` - you can define how many posts (.md) files the helper should list in this place (Default: undefined -> all items)
- `currentPage` - you can list first, second or other pages here (Default: 1)
- `className` - useful when you want to define a custom CSS class for the container. All children will get an additional prefix, so here, for example, the title element will get the 'homepage-featured-post--title' class (Default: hrld-post-list)
- `noTags` - hide tags list (Default: false)
- `noExcerpt` - hide excerpt text (Default: false)
- `noDate` - hide publication date (Default: false)
- `byTagName` - filter and create list by specified tag name (Default: undefined -> all tags)
- `noReadMoreButton` - hide read more button (Default: false)
- `readMoreButtonLabel` - define read more button label (Default: 'Read more')
- `noImage` - hide preview image (Default: false)
- `dateFormat` - define publication date format (Default: 'yyyy-mm-dd')

**relativePath**

```handlebars
{{relativePath 'about.html'}}
{{relativePath 'assets/images/image.png'}}
{{relativePath 'styles/style.css'}}
```

I would recommend always using this helper in .hbs files. Of course, if you are well aware of your paths, you can omit that. In Scss and Markdown files, you still need to use standard paths, if needed, relative ones. It will probably change in the future.

**hostDirName**

```handlebars
{{hostDirName}}
```

It will return the previously defined subdirectory name in which the whole website is hosted. It is sometimes useful when you would like to get this name in your templates dynamically. In the default template, it is used to provide proper paths for the template's JavaScript logic. You probably won't need to use it much unless you write your own Harold template for many different projects.

There isn't a possibility to add custom Handlebars helpers, but it is in plans in the future.

## SCSS files

Harold uses Scss for styling. All when what can be done with Scss should also be possible here.

You can create many different structures. The Default template uses Scss imports to differentiate sections and tooling classes. For example, you'll find there `_utils.scss` file with predefined content formatting classes and whole sections like `_main-menu.scss`. All is then imported in the `main.scss` file.  

```scss
@import 'variables';
@import 'utils';
@import 'basic';
@import 'search';
@import 'main-menu';
@import 'docs';
@import 'homepage';
```

As you can see, all files which we want to import should have the `_` prefix. This tells the compiler that it shouldn't create separate .css files from these.

Harold also uses [PostCSS](https://postcss.org/) and [Autoprefixer](https://www.npmjs.com/package/autoprefixer) out of the box. For now there is no way to use custom plugins, but it is planned.

 ## Assets

All images, fonts, and custom JavaScript files should land in the `assets` directory. Harold will move them to the `build` directory.

Always refer to these files using absolute paths.

```html
<script src="/assets/js/harold.js"></script>
```

```html
<img src="/assets/images/img.png" />
```

See example of assets directory [here](https://github.com/juliancwirko/harold-template-default/tree/main/assets).

## Posts JSON data

There is a special `posts.json` file located in the `jsonData` directory. It will be populated on every markdown file change, keeps data about all posts in JSON format. This file is quite essential because the whole search engine uses it. It is its primary purpose in the Default theme, but you can use it for many other use cases. For example, for loading some posts dynamically or creating `load more` functionality. It could have many different use cases.

## Host from a subdirectory

Suppose you need to host your blog created using Harold from subdirectory. For example, `www.mywebsite.com/blog/` then you would need to configure `hostDirName` in the `.haroldrc` file. Add there the name of your subfolder. The second thing is that you need to be aware of your paths (posts links, images, styles, etc.). The default Harold's templates support relative paths by default. It uses the `relativePath` handlebars helper for that. So it should work well in both cases when hosted from root and subdirectory.


[Next: Recipes](/docs/recipes.html)
