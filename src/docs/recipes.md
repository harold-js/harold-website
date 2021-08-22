---
layout: 'docs'
title: 'Recipes'
description: "Ready-to-use recipes. You can take them as inspiration or copy it as it is and use in your custom template"
metaTitle: "Harold Recipes - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/recipes.html"
publicationDate: '2021-05-02'
tags:
  - learn
---

Below are ready-to-use recipes. You can take them as inspiration or copy it as it is and use in your custom template.

## Featured post

You can use `postsList` Handlebars helper with `perPageLimit` param set to 1. Then you can provide your wrapper `className` and style it as you need.

```handlebars
{{postsList
  perPageLimit=1
  currentPage=1
  className="homepage-featured-post"
  dateFormat="dd mmmm yyyy"
  noTags=true
  noExcerpt=true
  noDate=true
  byTagName="featured"
  readMoreButtonLabel="Lets dive in!"
}}
```

## Posts categories

You can use `postsList` Handlebars helper with `perPageLimit` param. You can use tags as categories. Posts will be divided into sections and listed by tag name.

```handlebars
<div class="homepage-section homepage-section-bg">
  <div class="container">
    <h1 class="homepage-header">Coding</h1>
    {{postsList
    perPageLimit=3
    currentPage=1
    className="post-list-items"
    dateFormat="dd mmmm yyyy"
    byTagName="coding"
    readMoreButtonLabel="&#8674;"
    }}
  </div>
</div>

<div class="homepage-section">
  <div class="container">
    <h1 class="homepage-header">Art and Design</h1>
    {{postsList
    perPageLimit=3
    currentPage=1
    className="post-list-items"
    dateFormat="dd mmmm yyyy"
    byTagName="art"
    readMoreButtonLabel="&#8674;"
    }}
  </div>
</div>
```

More examples on [GitHub](https://github.com/juliancwirko/harold-template-default)

## Simple posts list

You can use the `postsList` Handlebars helper with disabled most of its contents to achieve a simple posts list that can generate menus.

```handlebars
{{postsList
  className="docs-articles-list"
  noTags=true
  noExcerpt=true
  noDate=true
  noReadMoreButton=true
  byTagName='docs'
}}
```

This documentation uses this approach to generate left sidebar menus.

## Similar posts

You can use the `postsList` with `byTagName`, which you should set up the same as the current post tag or tags. This way, you will be able to display a similar posts list. Remember to do this in the layout hbs file, not in Markdown files.


```handlebars
{{postsList
  className="docs-articles-list"
  byTagName=tags.[0]
}}
```

## Set OG tags

You can do this for pages and also in Markdown files for blog/docs posts.

```handlebars
{{> head
  title="Homepage"
  description="Harold app default theme"
  ogTitle="Harold Homepage"
  ogDescription="Harold Description"
  ogImage=""
  twitterTitle="Harold Homepage"
  twitterDescription="Harold Description"
  twitterImage=""
}}
```

```bash
---
layout: 'blog-post'
title: 'Harold is alive!'
excerpt: "Excerpt of the featured example post."
coverImage: 'https://picsum.photos/id/82/1500/600'
tags:
  - tag7
  - featured
publicationDate: '2021-04-18'
ogTitle: 'Harold is alive!'
ogDescription: 'Harold is a static site generator based on Handlebars templating system and markdown'
ogUrl: 'https://my-website.com/blog/doc1'
ogImage: 'https://my-website.com/assets/images/ogImage.png'
twitterTitle: 'Harold is alive!'
twitterDescription: 'Harold is a static site generator based on Handlebars templating system and markdown'
twitterUrl: 'https://my-website.com/blog/doc1'
twitterImage: 'https://my-website.com/assets/images/ogImage.png'
---
```

More examples on [GitHub](https://github.com/juliancwirko/harold-template-default)

## Posts JSON data

By default, you have access to JSON data with all posts. It is useful when you want to do something dynamic using JavaScript. For example, 'load more' functionality or search. The search system is implemented already in the default template. Here is an example:  

```javascript
const postsJsonDataPath = '/jsonData/posts.json';

const fetchPostsJsonData = () => {
  return fetch(postsJsonDataPath)
    .then((response) => response.json())
    .then((data) => {
      postsJSON = data;
      return data;
    });
};

fetchPostsJsonData().then((data) => {
  searchIndex = lunr(function () {
    this.ref('fileName');
    this.field('title');
    this.field('body');
    this.field('excerpt');
    this.field('tags');
    data.forEach((doc) => {
      this.add(
        Object.assign(doc, {
          tags: doc.tags.join(' '),
          body: doc.body.replace(/(<([^>]+)>)/gi, ''),
        })
      );
    }, this);
  });
});
```

More examples on [GitHub](https://github.com/juliancwirko/harold-template-default/tree/main/assets)

## Custom directories names

Sometimes you don't want to build a blog, but let's say, documentation. There is a `posts` directory for Markdown files and a `blog-layouts` directory for layouts by default. Because URLs are using `posts` directory name, you will end with `/posts/my-documentation-article-1`, which isn't optimal. You can change it by using the `.haroldrc` configuration file. Example:

```bash
{
  mdFilesDirName: 'docs',
  mdFilesLayoutsDirName: 'docs-layouts'
}

```

## Adding robots.txt, manifest.json, etc.

In many cases, there is a need to add some custom files to the root of your website. You can do this using the optional `src/statics` directory. Example: `src/statics/robots.txt` will be placed in `build/robots.txt` next to your index.html file. You can also nest your directories like `src/statics/some-dir/some-dir/file.txt`. It will land in `build/some-dir/some-dir/file.txt`.

## Github Pages hosting

If you want to host Harold's website under your main username (username.github.io), you would need to rename your output directory to supported by Github. It is the `docs` directory. You would need to create a `.haroldrc` file and put the output directory name there.

```bash
{
  outputDirName: 'docs',
}
```

Build your Harold app and push it to the repo. Remember to add the `.gitignore` file, and exclude `node_modules` but keep the output directory (`docs`).

Configure  your Github Pages to take the source from the `docs` directory.

Here is the quick walk-through demo on how to do that:

<div class="embeded-media-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/VjCWn3qeZnY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

If you want to host Harold's website under the repository subdirectory name (username.github.io/my-blog), you need to add `hostDirName` and remember to keep your paths in order. You can use the `relativePath` handlebars helper. The default template (from v0.4.0) is already using it, so it should work as-is.

```bash
{
  outputDirName: 'docs',
  hostDirName: 'my-blog'
}
```

Check out demo: [github.com/juliancwirko/testing-github-pages](https://github.com/juliancwirko/testing-github-pages)

## Netlify hosting

With Netlify, it is a little bit simpler. You just need to point to the Git branch and directory you want to deploy your site. You don't even need the source in the repo because Netlify will run the build scripts for you.

Here is the quick walk-through demo on how to do that:

<div class="embeded-media-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ZjeYgAgiHRE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Other ideas?

I would be thrilled if you could share your ideas. Let me know.

Please read [Guides](/docs/guides.html) section if you need more detailed docs.

[Next: Caveats](/docs/caveats.html)
