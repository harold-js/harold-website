---
layout: 'docs'
title: 'Getting Started'
description: "Harold is a static site generator that can help quickly set up websites, blogs, documentation sites, and other simple static websites."
metaTitle: "Harold Getting Started - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/getting-started.html"
publicationDate: '2021-05-01'
tags:
  - docs
---

Harold is a static site generator that can help quickly set up websites, blogs, documentation sites, and other simple static websites.

## Templates demo

Check out the demo of predefined templates, which you can use:

<ul>
  <li><a href="https://haroldjs-default-demo.netlify.app/">Default template</a></li>
  <li><a href="https://haroldjs-docs-demo.netlify.app/">Docs template</a></li>
  <li><a href="https://haroldjs-bare-demo.netlify.app/">Bare template</a></li>
</ul>

## Walk-through video

Below you can watch a quick walk-through video:

<div class="embeded-media-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/DG0T1Fg0mq0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Requirements

- the minimal version of Node is 16.0.0
- basic knowledge of [Handlebars](https://handlebarsjs.com/) templating is required
- basic knowledge of [Markdown](https://commonmark.org/help/) with Front Matter approach is required
- basic knowledge of SCSS is helpful, but you can also write standard CSS using .scss files

## Installation

**npx**
```bash
npx create-harold-app@latest my-app
```
_(npx is a package runner tool that comes with npm 5.2+ and higher, see instructions for older npm versions)_

**npm**
```bash
npm init harold-app@latest my-app
```
_(npm init <initializer> is available in npm 6+)_

**yarn**
```bash
yarn create harold-app@latest my-app
```
_(yarn create <starter-kit-package> is available in Yarn 0.25+)_

It will create a directory called my-app inside the current folder.
Inside that directory, it will generate the initial project structure and install the transitive dependencies.

As an option, you can choose with which template it should init the project. Possible choices:
- default
- docs
- bare

If you want to init the project with `docs` template, pass additional option `-t docs`. For example: `npm init harold-app@latest my-app -t docs` or with npm 7+ `npm init harold-app@latest my-app -- -t docs`. The same for `bare` template.

In the future, there will be a possibility to pass custom templates.

Write `create-harold-app@latest --help` in a terminal to get the list of options.

## Start

From the newly created app's directory (in our case, my-app), run `npm start`. It will serve the app under `localhost:3000`. To change the port, just add `PORT` env, like: `PORT=3002 npm start`.

## Configuration

Harold will search up the directory tree for configuration in the following places:

- a `harold` property in package.json
- a `.haroldrc` file in JSON or YAML format
- a `.haroldrc.json`, `.haroldrc.yaml`, `.haroldrc.yml`, `.haroldrc.js`, or `.haroldrc.cjs` file
- a `harold.config.js` or `harold.config.cjs` CommonJS module exporting an object

For now, there isn't much to configure, but you can configure the directory for md files (by default `posts`) and the directory for md files layouts (by default `blog-layouts`). Quite helpful because these names are also used in urls. For example, by default, `/posts/name-of-the-post` (name of the .md file), but you might want to build the docs website and have `/docs/name-of-the-doc` (name of the .md file).

You can also configure the name for output directory using `outputDirName` and if you want to host your site in subdirectory you would also need to add `hostDirName`.

Example of `.haroldrc` (placed in the root of your harold app):

```
{
  mdFilesDirName: 'docs',
  mdFilesLayoutsDirName: 'docs-layouts',
  outputDirName: 'dist',
  hostDirName: 'subfolder-name'
}
```

Remember to change these directories' names after you init your app.
If you are using the search system, change `postsPath` in `harold-search.js`.

## harold-scripts

[harold-scripts](https://github.com/harold-js/harold-scripts) is the fundamental toolset that will run the dev server and build a static site. It comes as a dependency from a separate package. 

You don't have to think about it much. Create Harold App will install it when initializing the project. The package.json file of the newly created project will already have a configuration for a `start` and `build` scripts using harold-scripts.

**Updating your project:**

1. You need to update `harold-scripts`
1. Check if there are any breaking changes in the [CHANGELOG.md](https://github.com/harold-js/create-harold-app/blob/master/CHANGELOG.md)
2. In your project, update the version of `harold-scripts` package


[Next: Guides](/docs/guides.html)
