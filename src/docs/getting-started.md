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

- the minimal version of Node is 24.0.0
- basic knowledge of [Handlebars](https://handlebarsjs.com/) templating is required
- basic knowledge of [Markdown](https://commonmark.org/help/) with Front Matter approach is required
- basic knowledge of SCSS is helpful, but you can also write standard CSS using .scss files

## Installation

Harold 1.4.2 requires Node 24 or newer.

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

You can also initialize from a custom template archive hosted remotely or stored locally. See [Custom templates](/docs/custom-templates.html) for examples and archive structure requirements.

Write `create-harold-app@latest --help` in a terminal to get the list of options.

## AI-Assisted Setup with Potion Kit

[Potion Kit](https://github.com/uiPotion/potion-kit) is a CLI tool that combines HaroldJS, [UIPotion](https://uipotion.com) components, and AI chat to help you build static websites interactively. You can use it to scaffold a new Harold-style project or work inside an existing project directory.

**Scaffold a new project:**
```bash
npx potion-kit init my-site
cd my-site
```

This creates a ready-to-build site with pages, partials, SCSS, package scripts, and a sample post.

**Start an interactive chat:**
```bash
npx potion-kit chat
```

**One-shot mode:**
```bash
npx potion-kit chat "Add a docs landing page and navigation"
```

Create a `.env` file in the project directory with your LLM provider and API key before chatting. Potion Kit currently supports OpenAI, Anthropic, and Moonshot/Kimi providers.

Helpful commands:

- `npx potion-kit doctor` validates your configuration, provider connectivity, and project structure
- `npx potion-kit clear` resets local chat state for the current project

`init` is optional. You can also run `potion-kit chat` inside an existing Harold project or even an empty folder, as long as you run it from the directory that contains your `.env`.

Potion Kit stores its state in a `.potion-kit/` directory with chat history and event logs.

Learn more: [github.com/uiPotion/potion-kit](https://github.com/uiPotion/potion-kit)

## Start

From the newly created app's directory (in our case, my-app), run `npm start`. It will serve the app under `localhost:3000`. To change the port, just add `PORT` env, like: `PORT=3002 npm start`.

## Configuration

Harold will search up the directory tree for configuration in the following places:

- a `harold` property in package.json
- a `.haroldrc` file in JSON or YAML format
- a `.haroldrc.json`, `.haroldrc.yaml`, `.haroldrc.yml`, `.haroldrc.js`, or `.haroldrc.cjs` file
- a `harold.config.js` or `harold.config.cjs` CommonJS module exporting an object

For now, there are only a few options. You can configure the directory for Markdown files (`posts` by default) and the directory for Markdown layouts (`blog-layouts` by default). These names are also used in URLs. For example, Harold generates `/posts/name-of-the-post.html` by default, but for a documentation site you might prefer `/docs/name-of-the-doc.html`.

You can also configure the output directory with `outputDirName`. If you want to host your site in a subdirectory, add `hostDirName`.

Since version 1.3.0, you can also configure HTML and CSS minification using `minifyHtml` and `minifyCss` options (both enabled by default for better performance).

Example of `.haroldrc` (placed in the root of your harold app):

```
{
  mdFilesDirName: 'docs',
  mdFilesLayoutsDirName: 'docs-layouts',
  outputDirName: 'dist',
  hostDirName: 'subfolder-name',
  minifyHtml: true,
  minifyCss: true
}
```

Remember to change these directories' names after you init your app.
If you are using the search system, change `postsPath` in `harold-search.js`.

## harold-scripts

[harold-scripts](https://github.com/harold-js/harold-scripts) is the fundamental toolset that will run the dev server and build a static site. It comes as a dependency from a separate package. 

You don't have to think about it much. Create Harold App installs it when initializing the project. The generated `package.json` already includes `start` and `build` scripts, plus a compatible `harold-scripts` version pinned in `devDependencies`.

**Updating your project:**

1. You need to update `harold-scripts`
2. Check if there are any breaking changes in the [CHANGELOG.md](https://github.com/harold-js/create-harold-app/blob/master/CHANGELOG.md)
3. In your project, update the version of `harold-scripts` package

[Next: Guides](/docs/guides.html)
