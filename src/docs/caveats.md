---
layout: 'docs'
title: 'Caveats'
publicationDate: '2021-05-01'
tags:
  - learn
ogTitle: "Harold Caveats - Static site generator"
ogDescription: "Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how to use it."
ogUrl: "https://www.haroldjs.com/docs/caveats.html"
twitterTitle: "Harold Caveats - Static site generator"
twitterDescription: "Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how to use it."
twitterUrl: "https://www.haroldjs.com/docs/caveats.html"
---

There are some limitations when using Harold. Hopefully, we solve most of them over time.

## Nesting directories

Harold doesn't support nesting directories for Pages and Posts. It is something which we will introduce later. It would need some core rewrites, which is quite time-consuming, and the value of that isn't tremendous.

For Pages, you should put .hbs files in the `pages` directory, and the output will be a .html file in the root of the output directory.

For Posts, you should put .md files in the `posts` directory, and output will be a .html file in the `posts` directory in the output directory.

You can change the names of directories using `.haroldrc` config. See the guides section on how to do this. 

## Support for multiple languages

There is no a simple possibility to have multiple language blogs. When nesting directories are available, I think it will be more straightforward. The quickest solution would be to host two separate instances in subfolders of the main website. Like for example `www.myhost.com/en`.

## Scss, PostCSS and Handlebars customization

Harold doesn't provide any customization for Scss, PostCSS, and Handlebars. It will be possible to some extent in the future. For now, when it comes to PostCSS, we use only Autoprefixer, and you can define browser support in the package.json file (see how to do this in Autoprefixer docs).

In most cases, the current configuration is good enough.

## Posts list pagination

Harold doesn't support dynamic pagination for posts list at the moment. You can define `perPageLimit` and `currentPage` in the `postsList` helper, but you would have to prepare pagination manually. It is, of course, doable.

It is something for further research for sure.

## Markdown tags

Harold supports only the default set of Markdown tags. There are styles and HTML structures prepared in the default theme, like wide content for images and iframes. But you still have to write standard HTML there. 

In the future, there are plans to prepare a custom markdown parser plugin to be able to incorporate some custom Markdown structures.
