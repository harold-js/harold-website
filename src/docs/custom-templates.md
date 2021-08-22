---
layout: 'docs'
title: 'Custom templates'
description: "Harold is a static site and blog generator based on Handlebars and Markdown. Let's see how to use it."
metaTitle: "Harold Custom Templates - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/custom-templates.html"
publicationDate: '2021-04-29'
tags:
  - docs
---

From version 0.7.0, Harold allows passing the custom template when initializing a new project. The template should be archived and has the proper structure.

There is a possibility to pass an archive from a remote server or local file system.  For example:

## Initialization examples:

```bash
npm init harold-app my-app -t https://github.com/juliancwirko/harold-template-scaffold/archive/refs/heads/main.zip
```

with npm 7+

```bash
npm init harold-app my-app -- -t https://github.com/juliancwirko/harold-template-scaffold/archive/refs/heads/main.zip
```

Or it can also be a local file:

```bash
npm init harold-app my-app -t ./main.zip
```

with npm 7+

```bash
npm init harold-app my-app -- -t ./main.zip
```

## Custom template structure

As you can see, there is a separate very basic repository that includes a scaffold for every custom template. It is a clean starting point. Check it out [here](https://github.com/juliancwirko/harold-template-scaffold).

The structure of your template archive should look like this:

```bash
// my-custom-template.zip file:

. my-custom-template-name-directory
├── assets
├── blog-layouts
├── pages
├── partials
├── posts
├── styles
├── .haroldrc (optional)
```

It is crucial to have the root directory in the archive. It is how it looks by default when you download the .zip file from the repository.

All custom templates should start with a similar file and directories structure. You can also check examples of ready-to-use templates:

- [Default Template repository](https://github.com/juliancwirko/harold-template-default)
- [Docs Template repository](https://github.com/juliancwirko/harold-template-docs)

## Harold config

You can add `.haroldrc` to your custom template. It will overwrite the one at the root of the project (if any). It is helpful because sometimes, the additional configuration for the whole project could be required in custom templates. For example, take a look at [docs template](https://github.com/juliancwirko/harold-template-docs).


## Initialize directly from the repo

There are three main services for git. GitHub, Bitbucket and Gitlab. Each has its paths and ways to download the .zip file or get the path to such a file. For example, for GitHub, you can download the zip file and copy its path depending on the branch. Example: 

```bash
https://github.com/juliancwirko/harold-template-scaffold/archive/refs/heads/main.zip
```

You can always download the zip file and initialize the Harold project using the local file path.

[Next: Guides](/docs/guides.html)
