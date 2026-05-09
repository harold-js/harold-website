---
layout: 'docs'
title: 'Guides'
description: "Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how to use it."
metaTitle: "Harold Guides - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/guides.html"
publicationDate: '2021-05-01'
tags:
  - docs
---

Harold is a static site and blog generator based on Handlebars and Markdown. This guide explains how a Harold project is built. Be sure to check the [Getting started](/docs/getting-started.html) section first.

## Workflow

With Harold, the workflow looks like this:

  1. You work in the `src` directory, and Harold transforms everything into standard `.css` and `.html` files in the `build` directory.
  2. You prepare `partials`, `pages`, `posts` or `docs`, and `assets` files.
  3. You work with Handlebars and Markdown, so a little knowledge of both is helpful.
  4. You use a development server that runs at `localhost:3000`.
  5. You refresh the browser to see your changes.

## Project Types

Since v1.3.0, all directories are optional, making Harold flexible for different project types:

### Minimal Landing Page
**Use case:** Simple website with just static pages, no blog.

**Minimal structure:**
```bash
src/
├── pages/
│   └── index.hbs
└── styles/
    └── main.scss
```

No posts, partials, or assets required!

---

### Documentation Site
**Use case:** Technical documentation or knowledge base.

**Recommended structure:**
```bash
src/
├── docs/           # Markdown docs (configure as mdFilesDirName)
├── docs-layouts/   # Doc templates
├── pages/
│   ├── index.hbs
│   └── docs.hbs
├── partials/
│   └── sidebar.hbs
└── styles/
    └── main.scss
```

**Configuration:**
```json
{
  "mdFilesDirName": "docs",
  "mdFilesLayoutsDirName": "docs-layouts"
}
```

---

### Blog
**Use case:** Personal or company blog.

**Full structure:**
```bash
src/
├── posts/          # Blog posts in Markdown
├── blog-layouts/   # Post templates
├── pages/
│   ├── index.hbs
│   ├── about.hbs
│   └── all-posts.hbs
├── partials/
│   ├── head.hbs
│   └── footer.hbs
├── assets/
│   └── images/
└── styles/
    └── main.scss
```

---

### Full Website
**Use case:** Complex site with blog, pages, and custom features.

**Complete structure:** See "Directories structure" section below.

---

## Directories structure

Below is the `src` directory structure from the Default template:

```bash
.
├── assets (optional)
│   ├── images
│   │   └── favicon.png
│   └── js
│       ├── harold.js
│       ├── harold-main-menu.js
│       ├── harold-scroll-top.js
│       └── harold-search.js
├── blog-layouts (optional, required if using posts)
│   └── blog-post.hbs
├── jsonData (auto-generated)
│   └── posts.json
├── pages (optional)
│   ├── about.hbs
│   ├── all-posts-list.hbs
│   ├── author.hbs
│   ├── index.hbs
│   └── projects.hbs
├── partials (optional)
│   ├── footer.hbs
│   ├── go-top-btn.hbs
│   ├── head.hbs
│   ├── main-menu-overlay.hbs
│   └── search-overlay.hbs
├── posts (optional)
│   ├── example1.md
│   ├── example2.md
│   ├── example3.md
│   ├── example4.md
│   ├── example5.md
│   ├── example6.md
│   ├── harold-intro.md
│   └── category/          # Nested subdirectories are supported
│       └── nested-post.md
├── statics (optional)
└── styles (optional)
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

**Note:** Since version 1.3.0, most directories are optional! Harold will gracefully skip missing directories:
- Missing `posts` directory? Harold will build pages only
- Missing `assets`? No problem, just pages will be built
- Missing `styles`? Harold will skip CSS generation
- Missing `pages` or `partials`? Harold will warn but continue

This makes Harold more flexible for different project types (documentation-only sites, minimal landing pages, etc.).

The `styles` and `assets` directories are for SCSS, custom JavaScript, images, and other frontend assets. Harold copies and compiles them into the output directory.

`posts` and `pages` are places for actual content. You write pages with Handlebars markup and posts with Markdown. 

**Nested Posts Support:** You can organize posts in subdirectories within the `posts` directory. The directory structure will be preserved in the output URLs. For example, `src/posts/category/article.md` will be generated as `build/posts/category/article.html` and accessible at `/posts/category/article.html`. This is useful for organizing posts by category or topic.

`blog-layouts` is a place for all custom blog layouts. You can then point particular layout to use in the Markdown file.

`statics` is a place for all custom static files that you would want to copy to the 'build' directory, such as robots.txt, manifest.json, etc. They will land in the root. If you wish, you can also nest directories there.

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
│   ├── example1.html
│   ├── example2.html
│   ├── example3.html
│   ├── example4.html
│   ├── example5.html
│   ├── example6.html
│   ├── harold-intro.html
│   └── category/          # Nested structure preserved
│       └── nested-post.html
├── projects.html
└── styles
    └── main.css
```

As you can see, the result is a static website that is ready to deploy.

## Pages and partials

You build pages with the Handlebars templating engine, so most things possible with Handlebars are possible here too. You can define page content directly and split reusable fragments into partials. A partial is a fragment of your HTML-like document.

```handlebars
<div class="container-full-width docs-layout" data-js-doc-content>
  {{> docs-sidebar-left}}
  <section class="docs-content docs-home">
    <h1>A quick intro to Harold JS</h1>
```

`{{> docs-sidebar-left}}` is a separate `.hbs` file located in the `partials` directory. Harold injects it exactly at that place in the template.

You can also pass parameters to partials. For example, the `head` partial, also located in the `partials` directory, can be used like this:

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

The Handlebars engine injects those parameters into the partial's placeholders. The `head` partial looks like this:

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

In the end, every page file is compiled to standard `.html` output.

Read more in the Handlebars docs: [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/)

## Markdown files

Every Markdown file is compiled into a separate `.html` file located in the `posts` directory, or in a different directory if you configure one. The directory structure inside `posts` is preserved in the output, so nested posts keep their subdirectory paths in generated URLs. Every file defines a few parameters at the top using front matter, which is YAML-style structured data embedded at the top of a Markdown document.

```markdown
---
layout: 'docs'
title: 'Recipes'
publicationDate: '2021-05-01'
tags:
  - learn
ogTitle: "Harold Recipes - Static site generator"
ogDescription: "Ready-to-use recipes you can adapt for your custom template"
ogImage: "https://www.haroldjs.com/assets/images/harold-start.png"
ogUrl: "https://www.haroldjs.com/docs/recipes.html"
twitterTitle: "Harold Recipes - Static site generator"
twitterDescription: "Ready-to-use recipes you can adapt for your custom template"
twitterImage: "https://www.haroldjs.com/assets/images/harold-start.png"
twitterUrl: "https://www.haroldjs.com/docs/recipes.html"

---

Rest of the Markdown content here...
```

You can add as many parameters as you need, but Harold requires these fields in every `.md` file:

- `layout` - defines which blog layout to use
- `title` - defines post title
- `publicationDate` - defines publication date in format YYYY-MM-DD

**Optional front matter fields** supported by Harold:

- `excerpt` - Short description of the post (used in post lists)
- `tags` - Array of tags for categorization and filtering
- `coverImage` - URL or path to cover/featured image

**Custom fields** - You can add any custom fields you want! All front matter data is passed to your layout template and accessible as variables.

**Example with all supported fields:**

```markdown
---
layout: 'blog-post'
title: 'My Awesome Post'
publicationDate: '2025-12-20'
excerpt: 'A brief description of this post'
tags:
  - javascript
  - tutorial
coverImage: '/assets/images/cover.jpg'
customField: 'Any custom data you need'
---

Rest of the Markdown content here...
```

**Accessing custom fields in layouts:**

In your layout `.hbs` file, all front matter fields are available as variables:

```handlebars
<h1>{{title}}</h1>
<p>Published: {{formatDate date=publicationDate}}</p>
{{#if customField}}
  <div class="custom">{{customField}}</div>
{{/if}}
<div class="content">
  {{{content}}}
</div>
```

In Markdown files, you can also use standard HTML. Some special scripting tags are removed during compilation.

Since version 1.3.0, images in Markdown automatically get optimized:
- **Automatic dimensions** - Width and height attributes are added automatically to prevent layout shift (only for local files)
- **Lazy loading** - Native `loading="lazy"` for better performance  
- **Async decoding** - `decoding="async"` for non-blocking rendering

```markdown
![Alt text](assets/images/photo.jpg)
```

Becomes:
```html
<img src="assets/images/photo.jpg" 
     alt="Alt text" 
     width="800" 
     height="600" 
     loading="lazy" 
     decoding="async" />
```

In the Default template, there are predefined styles and structures to be used. For example, centered images: 

```markdown
![Alt text](image.jpg?style=centered)
```

Or wide media elements using query parameters (since v1.3.0):

```markdown
![Wide image](image.jpg?style=wide)
```

Alternatively, you can still use HTML:

```html
<div class="wide-content"><img src="/assets/img.png" alt="alt text" /></div>
```

The query parameter approach is recommended because it keeps your Markdown cleaner.

Another predefined structure is useful when you need to embed iframe-based content.

Since v1.3.0, you can use query parameters for cleaner Markdown:

```html
<iframe src="https://codepen.io/embed/xxxxx?style=embed" height="500"></iframe>
```

Or the traditional HTML wrapper:

```html
<div class="embeded-media-container">
  <iframe src="https://codesandbox.io/embed/proper-usage-of-react-tracked-o8v3s?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="proper usage of react-tracked"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
</div>
```

Both approaches will make your embedded content responsive. The `?style=embed` parameter automatically wraps the iframe in the necessary container div.

## Helpers

Helpers are Handlebars functions exposed to templates. You can use them for loops, conditions, blocks, and other template logic. The list of built-in Handlebars helpers is here: [https://handlebarsjs.com/guide/](https://handlebarsjs.com/guide/).

Harold also offers its own custom helpers:

**responsiveImg** (since v1.3.0)

A powerful helper for creating responsive, optimized images with automatic dimensions:

```handlebars
{{responsiveImg 
  src="assets/images/hero.jpg" 
  alt="Hero image"
  width="1200"
  height="600"
  loading="eager"
  className="hero-image"
  srcset="assets/images/hero-small.jpg 480w, assets/images/hero-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, 1200px"
}}
```

Parameters:
- `src` (required) - Image source path
- `alt` - Alt text for accessibility
- `width` - Image width (auto-detected if not provided)
- `height` - Image height (auto-detected if not provided)
- `loading` - "lazy" (default) or "eager" for above-the-fold images
- `decoding` - "async" (default) or "sync"
- `className` - CSS class name
- `srcset` - Responsive image sources
- `sizes` - Media query sizes

**formatDate**

It is a handy helper when you need to change date formatting across the whole app.

```handlebars
{{formatDate date=publicationDate format='dd mmmm yyyy'}}
```

In the example above, we take `publicationDate`, and we format it using `dd mmmm yyyy`. Check format options here: [https://blog.stevenlevithan.com/archives/date-time-format](https://blog.stevenlevithan.com/archives/date-time-format).

It can be used in every .hbs file.

**postsList**

This helper is useful for building post lists and gives you a lot of control over the output.

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
  readMoreButtonLabel="Let's dive in!"
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

We recommend using this helper in `.hbs` files. If you are fully aware of your paths, you can omit it. In SCSS and Markdown files, use standard paths, including relative paths when needed.

**hostDirName**

```handlebars
{{hostDirName}}
```

It returns the configured subdirectory name where the website is hosted. This is useful when you need that value dynamically in templates. In the default template, it provides paths for the template's JavaScript logic. You probably won't need to use it much unless you write your own Harold template for many different projects.

Custom Handlebars helpers are not supported yet, but they are planned for the future.

## SCSS files

Harold uses SCSS for styling. Anything you can do with SCSS should also be possible here.

You can create many different structures. The Default template uses SCSS imports to separate sections and utility classes. For example, you'll find a `_utils.scss` file with predefined content formatting classes and section files such as `_main-menu.scss`. Everything is then imported in the `main.scss` file.

```scss
@import 'variables';
@import 'utils';
@import 'basic';
@import 'search';
@import 'main-menu';
@import 'docs';
@import 'homepage';
```

Files imported from `main.scss` should use the `_` prefix. This tells the compiler not to create separate `.css` files for them.

Harold also uses [PostCSS](https://postcss.org/) and [Autoprefixer](https://www.npmjs.com/package/autoprefixer) out of the box. Since version 1.3.0, CSS is automatically minified using cssnano for smaller file sizes. Custom PostCSS plugins are not supported yet, but they are planned.

 ## Assets

All images, fonts, and custom JavaScript files should land in the `assets` directory. Harold will move them to the `build` directory.

Always refer to these files using absolute paths.

```html
<script src="/assets/js/harold.js"></script>
```

```html
<img src="/assets/images/img.png" />
```

See example of assets directory [here](https://github.com/harold-js/harold-template-default/tree/main/assets).

## Posts JSON data

There is a special `posts.json` file in the `jsonData` directory. Harold updates it whenever Markdown files change, and it contains data for all posts in JSON format. Ready templates use this file for search, but you can also use it for dynamic post loading, "load more" behavior, or other custom JavaScript features.

## Host from a subdirectory

If you need to host a Harold site from a subdirectory, such as `www.mywebsite.com/blog/`, configure `hostDirName` in the `.haroldrc` file with the name of that subfolder. You also need to be aware of paths for post links, images, styles, and other assets. The default Harold templates support relative paths through the `relativePath` Handlebars helper, so they should work when hosted from the root or from a subdirectory.


[Next: Custom templates](/docs/custom-templates.html)
