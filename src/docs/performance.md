---
layout: 'docs'
title: 'Performance'
description: "Learn about Harold's built-in performance optimizations including Web Vitals improvements, minification, and best practices"
metaTitle: "Harold Performance & Optimization - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/performance.html"
publicationDate: '2025-12-20'
tags:
  - learn
---

Harold 1.3.0 introduces comprehensive performance optimizations to help your sites achieve excellent Core Web Vitals scores and faster load times.

## Automatic Optimizations (Enabled by Default)

### CSS Minification

All CSS output is automatically minified using cssnano, reducing file sizes by 30-50%.

**What it does:**
- Removes whitespace and comments
- Optimizes colors, units, and other values
- Merges duplicate selectors
- Removes redundant code

**Configuration:**
```json
{
  "minifyCss": true
}
```

Disable it if needed (not recommended):
```json
{
  "minifyCss": false
}
```

### HTML Minification

All HTML output is automatically minified, reducing file sizes by 20-40%.

**What it does:**
- Removes whitespace and comments
- Minifies inline CSS and JavaScript
- Removes redundant attributes
- Uses short doctype

**Configuration:**
```json
{
  "minifyHtml": true
}
```

Disable it if needed (not recommended):
```json
{
  "minifyHtml": false
}
```

## Web Vitals Improvements

### Automatic Image Optimization

Images in markdown posts automatically get optimized for better Core Web Vitals scores.

**Automatic Features:**
1. **Width & Height Attributes** - Prevents Cumulative Layout Shift (CLS)
2. **Lazy Loading** - Native browser `loading="lazy"` for better performance
3. **Async Decoding** - Non-blocking rendering with `decoding="async"`

**Example:**

Input markdown:
```markdown
![My image](assets/images/photo.jpg)
```

Output HTML:
```html
<img src="assets/images/photo.jpg" 
     alt="My image" 
     width="800" 
     height="600" 
     loading="lazy" 
     decoding="async" />
```

**Note:** Remote images (URLs) won't get automatic dimensions. Specify them manually:

```html
<img src="https://example.com/image.jpg" 
     alt="Remote image" 
     width="800" 
     height="600" />
```

### responsiveImg Helper

For advanced image handling, use the `responsiveImg` Handlebars helper:

**Basic usage:**
```handlebars
{{responsiveImg 
  src="assets/images/photo.jpg" 
  alt="My photo"
}}
```

**With explicit dimensions:**
```handlebars
{{responsiveImg 
  src="assets/images/hero.jpg" 
  alt="Hero image"
  width="1200"
  height="600"
}}
```

**Hero image (load immediately):**
```handlebars
{{responsiveImg 
  src="assets/images/hero.jpg" 
  alt="Hero image"
  loading="eager"
  className="hero"
}}
```

**Responsive image with multiple sizes:**
```handlebars
{{responsiveImg 
  src="assets/images/gallery.jpg" 
  alt="Gallery"
  srcset="assets/images/gallery-small.jpg 480w, assets/images/gallery-medium.jpg 800w, assets/images/gallery-large.jpg 1200w"
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
}}
```

**Parameters:**
- `src` (required) - Image source path
- `alt` - Alt text for accessibility (recommended)
- `width` - Image width (auto-detected if not provided)
- `height` - Image height (auto-detected if not provided)
- `loading` - "lazy" (default) or "eager" for above-the-fold images
- `decoding` - "async" (default) or "sync"
- `className` - CSS class name
- `srcset` - Responsive image sources for different screen sizes
- `sizes` - Media query sizes for responsive images

**When to use eager loading:**
- Hero/banner images above the fold
- Logo images
- Critical UI elements
- Images needed for initial render

**When to use lazy loading (default):**
- Gallery images
- Blog post content images
- Footer images
- Any below-the-fold content

**Responsive images example:**

Create multiple image sizes:
```bash
# Original
assets/images/photo.jpg (1200x800)

# Smaller versions
assets/images/photo-small.jpg (480x320)
assets/images/photo-medium.jpg (800x533)
```

Use with srcset:
```handlebars
{{responsiveImg 
  src="assets/images/photo.jpg" 
  alt="Responsive photo"
  srcset="assets/images/photo-small.jpg 480w, assets/images/photo-medium.jpg 800w, assets/images/photo.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 80vw, 1200px"
}}
```

The browser will automatically choose the best image based on screen size and resolution!

### PostsList Images

The `postsList` helper now includes optimized images:

```handlebars
{{postsList
  perPageLimit=6
  noImage=false
}}
```

All cover images automatically include:
- `loading="lazy"`
- `decoding="async"`
- Proper alt text from post title

## Performance Best Practices

### 1. Optimize Images Before Adding

- Compress images using tools like TinyPNG or ImageOptim
- Use modern formats (WebP) when possible
- Create multiple sizes for responsive images

### 2. Use Lazy Loading Strategically

- **Lazy loading** (default) for below-the-fold images
- **Eager loading** for above-the-fold images (hero, logo)

```handlebars
<!-- Above the fold - load immediately -->
{{responsiveImg 
  src="assets/images/hero.jpg" 
  alt="Hero"
  loading="eager"
}}

<!-- Below the fold - lazy load -->
{{responsiveImg 
  src="assets/images/gallery.jpg" 
  alt="Gallery"
  loading="lazy"
}}
```

### 3. Specify Image Dimensions

Always include width and height for images to prevent layout shift:

```markdown
<!-- Local images - dimensions detected automatically -->
![Alt text](assets/images/photo.jpg)

<!-- Remote images - specify manually -->
<img src="https://example.com/image.jpg" 
     alt="Remote" 
     width="800" 
     height="600" />
```

### 4. Monitor Performance

Use these tools to check your site's performance:

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)

## Configuration Example

Complete `.haroldrc` with performance options:

```json
{
  "mdFilesDirName": "posts",
  "mdFilesLayoutsDirName": "blog-layouts",
  "outputDirName": "build",
  "minifyCss": true,
  "minifyHtml": true
}
```

## Troubleshooting

### Images Missing Dimensions

**Issue:** Some images don't have width/height attributes

**Solutions:**
1. Ensure images exist in the filesystem before build
2. For remote images, add dimensions manually
3. Check build output for yellow warnings about missing dimensions

### Minification Disabled

**Issue:** HTML/CSS files are not minified

**Solutions:**
1. Check `.haroldrc` for `minifyHtml` and `minifyCss` settings
2. Run `npm install` to ensure all dependencies are installed
3. Clear build directory and rebuild

### Layout Shift Still Occurring

**Solutions:**
1. Check all images have explicit dimensions
2. Reserve space for ads/embeds with min-height
3. Use CSS aspect-ratio for responsive containers

## Migration from Older Versions

All optimizations are **backward compatible** and enabled by default. No code changes required!

To update your project:

1. Update `harold-scripts` in your `package.json`
2. Run `npm install`
3. Rebuild your site

Your site will automatically benefit from:
- ✅ Minified HTML and CSS
- ✅ Optimized images with dimensions
- ✅ Lazy loading
- ✅ Better Web Vitals scores

[Next: Recipes](/docs/recipes.html)

