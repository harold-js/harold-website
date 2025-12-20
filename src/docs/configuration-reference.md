---
layout: 'docs'
title: 'Configuration Reference'
description: "Complete reference of all Harold configuration options"
metaTitle: "Harold Configuration Reference - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/configuration.html"
publicationDate: '2025-12-20'
tags:
  - docs
---

This page lists all available configuration options for Harold. Configuration can be placed in any of these locations:

- A `harold` property in package.json
- A `.haroldrc` file (JSON or YAML)
- A `.haroldrc.json`, `.haroldrc.yaml`, `.haroldrc.yml` file
- A `.haroldrc.js` or `harold.config.js` file (CommonJS)

## Configuration Options

### Directory Names

#### `mdFilesDirName`
**Type:** `string`  
**Default:** `'posts'`

The directory name for markdown blog post files.

**Example:**
```json
{
  "mdFilesDirName": "docs"
}
```

**Use Case:** Change to `docs` for documentation sites, or `articles` for article-based sites. This name is used in URLs (e.g., `/docs/article-name`).

#### `mdFilesLayoutsDirName`
**Type:** `string`  
**Default:** `'blog-layouts'`

The directory name for markdown file layout templates.

**Example:**
```json
{
  "mdFilesLayoutsDirName": "docs-layouts"
}
```

**Use Case:** Keep layouts organized by purpose. If using `mdFilesDirName: "docs"`, you might want `mdFilesLayoutsDirName: "docs-layouts"` for clarity.

#### `outputDirName`
**Type:** `string`  
**Default:** `'build'`

The directory name for built/compiled output files.

**Example:**
```json
{
  "outputDirName": "dist"
}
```

**Use Cases:**
- Use `"dist"` for distribution directory
- Use `"docs"` for GitHub Pages hosting (required by GitHub)
- Use `"public"` if deploying to certain hosting services

#### `hostDirName`
**Type:** `string`  
**Default:** `''` (empty - site hosted at root)

The subdirectory name if hosting your site in a subdirectory rather than root.

**Example:**
```json
{
  "hostDirName": "blog"
}
```

**Use Case:** If your site is hosted at `www.example.com/blog/` instead of `www.example.com/`, set this to `"blog"`. Harold will adjust all internal paths accordingly.

**Note:** The default Harold templates use the `relativePath` helper which automatically handles this configuration.

### Performance Options

#### `minifyCss`
**Type:** `boolean`  
**Default:** `true`

Enable or disable CSS minification.

**Example:**
```json
{
  "minifyCss": true
}
```

**Details:**
- Uses cssnano for minification
- Reduces CSS file size by 30-50%
- Removes whitespace, comments, and optimizes code
- **Recommended:** Keep enabled for production

**When to disable:** Only for debugging CSS issues or if you have a custom minification process.

#### `minifyHtml`
**Type:** `boolean`  
**Default:** `true`

Enable or disable HTML minification.

**Example:**
```json
{
  "minifyHtml": true
}
```

**Details:**
- Uses html-minifier-terser for minification
- Reduces HTML file size by 20-40%
- Removes whitespace, comments, and redundant attributes
- Also minifies inline CSS and JavaScript
- **Recommended:** Keep enabled for production

**When to disable:** Only for debugging HTML structure issues or inspecting generated HTML.

## Complete Example

Here's a complete `.haroldrc` configuration file with all options:

```json
{
  "mdFilesDirName": "docs",
  "mdFilesLayoutsDirName": "docs-layouts",
  "outputDirName": "build",
  "hostDirName": "",
  "minifyCss": true,
  "minifyHtml": true
}
```

## Common Configurations

### Documentation Site
```json
{
  "mdFilesDirName": "docs",
  "mdFilesLayoutsDirName": "docs-layouts",
  "outputDirName": "build"
}
```

### GitHub Pages (username.github.io)
```json
{
  "outputDirName": "docs"
}
```

### GitHub Pages (repository subdirectory)
```json
{
  "outputDirName": "docs",
  "hostDirName": "my-project"
}
```

### Blog with Custom Structure
```json
{
  "mdFilesDirName": "articles",
  "mdFilesLayoutsDirName": "article-layouts",
  "outputDirName": "dist"
}
```

### Development (Unminified)
```json
{
  "minifyCss": false,
  "minifyHtml": false
}
```

**Note:** Consider using environment-based config files (`.haroldrc.dev.js`, `.haroldrc.prod.js`) for different environments.

## Configuration in package.json

You can also place configuration directly in package.json:

```json
{
  "name": "my-harold-site",
  "version": "1.0.0",
  "harold": {
    "mdFilesDirName": "docs",
    "outputDirName": "dist",
    "minifyCss": true
  }
}
```

## Internal Directories (Not Configurable)

These directories are used internally and cannot be configured:

- `src` - Source directory (always used)
- `pages` - Handlebars page files
- `partials` - Handlebars partial files
- `styles` - SCSS/CSS files
- `assets` - Images, fonts, JavaScript
- `jsonData` - Auto-generated JSON data
- `statics` - Static files copied to root

All of these directories are **optional** (since v1.3.0). Harold will gracefully skip missing directories.

## Validation & Errors

Harold will:
- ✅ Use defaults for missing configuration values
- ✅ Validate boolean types for `minifyCss` and `minifyHtml`
- ✅ Accept string values for directory names
- ⚠️ Warn if configuration file has syntax errors
- ⚠️ Continue with defaults if configuration cannot be loaded

## Configuration Priority

Harold searches for configuration in this order (first found wins):

1. `.haroldrc` in the `src` directory (template-specific)
2. `harold` key in `package.json`
3. `.haroldrc` in project root
4. `.haroldrc.json`, `.haroldrc.yaml`, `.haroldrc.yml`
5. `.haroldrc.js`, `harold.config.js`
6. Default values

**Tip:** Template-specific `.haroldrc` in `src/` overrides project-level configuration.

## Environment-Specific Configuration

For different configurations in development vs production:

**Option 1: Multiple config files**
```bash
# Development
cp .haroldrc.dev .haroldrc

# Production
cp .haroldrc.prod .haroldrc
```

**Option 2: JavaScript config with environment variables**

`.haroldrc.js`:
```javascript
module.exports = {
  mdFilesDirName: 'posts',
  outputDirName: 'build',
  minifyCss: process.env.NODE_ENV === 'production',
  minifyHtml: process.env.NODE_ENV === 'production'
};
```

Then use:
```bash
NODE_ENV=development npm start
NODE_ENV=production npm run build
```

[Next: Performance & Optimization](/docs/performance.html)

