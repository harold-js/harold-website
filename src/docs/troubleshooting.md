---
layout: 'docs'
title: 'Troubleshooting'
description: "Common issues and solutions when working with Harold"
metaTitle: "Harold Troubleshooting - Static site generator"
metaUrl: "https://www.haroldjs.com/docs/troubleshooting.html"
publicationDate: '2025-12-20'
tags:
  - learn
---

Common issues and their solutions when working with Harold.

## Build Errors

### Build fails with "Cannot find module"

**Symptoms:**
```bash
Error: Cannot find module 'harold-scripts'
```

**Solution:**
1. Install dependencies: `npm install`
2. Ensure `harold-scripts` is in your `package.json`
3. Delete `node_modules` and `package-lock.json`, then run `npm install` again

---

### Build fails with "Missing Front Matter keys"

**Symptoms:**
```
Missing Front Matter keys for example.md. Required keys are: layout, title, publicationDate. File was not generated!
```

**Solution:**
Ensure all markdown files have required front matter fields:

```markdown
---
layout: 'blog-post'
title: 'My Post Title'
publicationDate: '2025-12-20'
---
```

All three fields are **required** for every markdown file.

---

### "No posts directory found" warning

**Symptoms:**
```
No posts directory found. Skipping posts generation.
```

**Solution:**
This is normal if you don't have a `posts` directory. Since v1.3.0, directories are optional. To fix:

1. Create `src/posts/` directory if you want blog posts
2. Or ignore the warning if building a pages-only site

---

### "Could not determine dimensions for image"

**Symptoms:**
```
Could not determine dimensions for image: image.jpg
```

**Solution:**
- **For local images:** Ensure the image file exists in the correct path
- **For remote images:** Add dimensions manually:
  ```html
  <img src="https://example.com/image.jpg" width="800" height="600" alt="Image" />
  ```

---

## Development Server Issues

### Dev server won't start - Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
1. **Change port:** `PORT=3001 npm start`
2. **Kill existing process:**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   # Kill it
   kill -9 <PID>
   ```

---

### Changes not reflecting in browser

**Symptoms:**
File changes don't appear when refreshing browser.

**Solution:**
1. **Hard refresh:** Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. **Clear build directory:** Delete `build/` folder and rebuild
3. **Check file watcher:** Restart dev server (`npm start`)
4. **Disable browser cache:** Open DevTools > Network tab > Check "Disable cache"

---

## Styling Issues

### Styles not loading on first page load

**Symptoms:**
CSS loads on refresh but not on initial load.

**Solution:**
This was fixed in v1.3.0. Update harold-scripts:

```bash
npm install harold-scripts@latest
```

---

### CSS changes not applying

**Symptoms:**
SCSS changes saved but not visible in browser.

**Solution:**
1. **Hard refresh browser:** Ctrl+Shift+R
2. **Check SCSS syntax:** Look for compilation errors in terminal
3. **Verify file imports:** Ensure partial files have `_` prefix and are imported
4. **Clear cache:** Delete `build/styles/` and restart dev server

---

### Styles work in dev but not in production

**Symptoms:**
Site looks fine locally but broken when deployed.

**Solution:**
1. **Check paths:** Use `relativePath` helper for all asset paths
2. **Verify hostDirName:** If hosting in subdirectory, configure `.haroldrc`:
   ```json
   {
     "hostDirName": "my-subdirectory"
   }
   ```
3. **Build and test locally:** Run `npm run build` and serve the `build/` folder

---

## Image Issues

### Images not loading / 404 errors

**Symptoms:**
Images show broken icon or 404 in Network tab.

**Solution:**
1. **Check file exists:** Verify image is in `src/assets/images/`
2. **Use absolute paths:** `/assets/images/photo.jpg` (not `../images/photo.jpg`)
3. **Check case sensitivity:** Linux servers are case-sensitive (`Photo.jpg` ≠ `photo.jpg`)
4. **Verify build output:** Check if image exists in `build/assets/images/`

---

### Images causing layout shift

**Symptoms:**
Page content jumps when images load.

**Solution:**
For v1.3.0+:
- **Local images:** Dimensions are automatic
- **Remote images:** Add width/height manually:
  ```html
  <img src="https://example.com/image.jpg" width="800" height="600" alt="Image" />
  ```

---

## Path Issues

### Links broken when hosting in subdirectory

**Symptoms:**
Internal links return 404 when site is in subdirectory (e.g., `example.com/blog/`).

**Solution:**
1. Configure `.haroldrc`:
   ```json
   {
     "hostDirName": "blog"
   }
   ```
2. Use `relativePath` helper for all links:
   ```handlebars
   <a href="{{relativePath 'about.html'}}">About</a>
   <img src="{{relativePath 'assets/images/photo.jpg'}}" />
   ```

---

### Absolute paths not working

**Symptoms:**
Paths starting with `/` don't work.

**Solution:**
- In `.hbs` files: Use `relativePath` helper
- In `.scss` files: Use relative paths or configure `hostDirName`
- In markdown: Use paths relative to public directory

---

## Configuration Issues

### Configuration not loading

**Symptoms:**
Changes to `.haroldrc` not taking effect.

**Solution:**
1. **Verify JSON syntax:** Use a JSON validator
2. **Restart dev server:** Configuration loads at startup
3. **Check location:** Place `.haroldrc` in project root or `src/` directory
4. **Check file name:** Must be exactly `.haroldrc` (not `.haroldrc.txt`)

---

### Custom directory names not working

**Symptoms:**
Changed `mdFilesDirName` but URLs still use `/posts/`.

**Solution:**
1. **Rename actual directory:** If config says `"docs"`, rename `src/posts/` to `src/docs/`
2. **Rename layouts directory too:** Update `mdFilesLayoutsDirName` to match
3. **Update search paths:** If using search, update paths in `harold-search.js`
4. **Rebuild completely:** Delete `build/` and run `npm run build`

---

## Performance Issues

### Build is very slow

**Symptoms:**
Build takes minutes instead of seconds.

**Solution:**
1. **Check image sizes:** Compress large images before adding
2. **Reduce markdown files:** Split large posts into smaller ones
3. **Check for infinite loops:** Review custom Handlebars helpers
4. **Update harold-scripts:** Newer versions have performance improvements

---

### Site loads slowly

**Symptoms:**
Page takes long to load in browser.

**Solution:**
1. **Enable minification:**
   ```json
   {
     "minifyCss": true,
     "minifyHtml": true
   }
   ```
2. **Optimize images:** Use tools like TinyPNG, Squoosh, or ImageOptim
3. **Use lazy loading:** Images automatically lazy load in v1.3.0+
4. **Check hosting:** Use CDN or good hosting service

---

## Markdown Issues

### HTML in markdown not rendering

**Symptoms:**
HTML tags appear as text instead of rendering.

**Solution:**
Harold supports raw HTML in markdown by default. If not working:
1. **Check for special characters:** Ensure `<` and `>` aren't escaped
2. **Verify tag support:** Some script tags are sanitized for security
3. **Use allowed tags:** Check sanitization schema in harold-scripts

---

### Markdown syntax not working

**Symptoms:**
Markdown like `**bold**` or `# Heading` not rendering.

**Solution:**
1. **Check file extension:** Must be `.md` or `.markdown`
2. **Verify front matter:** Must have `---` delimiters
3. **Check for typos:** Markdown syntax must be exact
4. **Test with simple file:** Create minimal test case

---

## Deployment Issues

### Build succeeds locally but fails on hosting

**Symptoms:**
`npm run build` works locally but fails on Netlify/Vercel/GitHub Actions.

**Solution:**
1. **Check Node version:** Ensure hosting uses Node 20+
   ```json
   {
     "engines": {
       "node": ">=20.0.0"
     }
   }
   ```
2. **Verify build command:** Should be `harold-scripts build`
3. **Check dependencies:** Ensure `harold-scripts` is in `dependencies` not `devDependencies`

---

### Deployed site shows 404s

**Symptoms:**
Pages work locally but return 404 when deployed.

**Solution:**
1. **Check output directory:** Hosting should serve from `build/` (or your configured `outputDirName`)
2. **Verify index.html exists:** Must be in root of output directory
3. **Check hosting configuration:** Some hosts need specific settings for SPAs
4. **Verify file names:** Some hosts are case-sensitive

---

## Getting Help

If you're still stuck:

1. **Check GitHub Issues:** [harold-js/harold-scripts/issues](https://github.com/harold-js/harold-scripts/issues)
2. **Search existing issues:** Your problem might already be solved
3. **Create new issue:** Include:
   - Harold version (`npm list harold-scripts`)
   - Node version (`node --version`)
   - Error messages
   - Minimal reproduction steps
4. **Check templates:** Review official template repositories for examples

---

## Debugging Tips

### Enable verbose logging

Add to your `package.json`:
```json
{
  "scripts": {
    "start": "DEBUG=* harold-scripts start",
    "build": "DEBUG=* harold-scripts build"
  }
}
```

### Test with minimal setup

Create a minimal test case:
1. Single page in `src/pages/index.hbs`
2. Single stylesheet in `src/styles/main.scss`
3. No posts, no partials
4. Build and verify

### Check generated files

Inspect `build/` directory:
- Are files generated?
- Do paths look correct?
- Is HTML structure valid?
- Are styles present?

---

[Next: Caveats](/docs/caveats.html)

