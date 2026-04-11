---
layout: 'docs'
title: 'Caveats'
description: "Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how to use it."
metaTitle: "Harold Caveats - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/caveats.html"
publicationDate: '2021-05-01'
tags:
  - learn
---

There are some limitations when using Harold. Hopefully, we solve most of them over time.

## Nesting directories

Posts can be nested, but pages cannot.

For Pages, put `.hbs` files directly in the `pages` directory. Harold reads only that top-level directory, and the output will be an `.html` file in the root of the output directory.

For Posts, you can put `.md` files anywhere inside the `posts` directory. Harold preserves the subdirectory structure in the output, so `src/posts/category/nested-post.md` becomes `build/posts/category/nested-post.html`.

You can change the Markdown posts directory name using `.haroldrc` config. See the guides section on how to do this.

## Support for multiple languages

There is no simple built-in way to structure a multilingual Harold site yet. Nested posts help organize Markdown content, but pages are still flat, so the quickest solution is still to host separate Harold instances in subfolders of the main website. For example: `www.myhost.com/en`.

## Scss, PostCSS and Handlebars customization

Harold doesn't provide any customization for Scss, PostCSS, and Handlebars. It will be possible to some extent in the future. For now, when it comes to PostCSS, we use only Autoprefixer, and you can define browser support in the package.json file (see how to do this in Autoprefixer docs).

In most cases, the current configuration is good enough.

## Posts list pagination

Harold doesn't support dynamic pagination for posts list at the moment. You can define `perPageLimit` and `currentPage` in the `postsList` helper, but you would have to prepare pagination manually. It is, of course, doable.

It is something for further research for sure.

## Markdown tags

Harold supports the default set of Markdown tags. Since version 1.3.0, Harold includes a custom markdown processing plugin that enables cleaner syntax for common layouts:

**Query Parameter Styling (v1.3.0+):**
- `![image](photo.jpg?style=wide)` - Full-width images
- `![icon](icon.png?style=centered)` - Centered images  
- `<iframe src="url?style=embed">` - Responsive embeds

These query parameters automatically wrap elements with appropriate HTML structures, eliminating the need for manual HTML wrappers in most cases.

**Traditional HTML** still works if you prefer:
- `<div class="wide-content"><img...></div>`
- `<div class="embeded-media-container"><iframe...></iframe></div>`

See the [Guides](/docs/guides.html) section for more details on query parameter styling.
