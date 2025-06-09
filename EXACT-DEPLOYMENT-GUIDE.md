# Exact GitHub Deployment Guide

To make your GitHub Pages portfolio look identical to your current version, follow these steps:

## Step 1: Copy index.html
1. Go to https://github.com/preranajangid/portfolio
2. Click "Add file" → "Create new file"
3. Name: `index.html`
4. Copy and paste the content from `github-ready-index.html` file (created in this project)

## Step 2: Copy CSS file
1. Click "Add file" → "Create new file"
2. Name: `css/style.css`
3. Copy the ENTIRE content from your current `css/style.css` file

## Step 3: Copy JavaScript file
1. Click "Add file" → "Create new file"
2. Name: `js/script.js`
3. Copy the ENTIRE content from your current `js/script.js` file

## Step 4: Upload profile photo
1. Click "Add file" → "Upload files"
2. Create path: `assets/profile-photo.jpg`
3. Upload any professional photo (the fallback image will work if no photo is uploaded)

## Step 5: Enable GitHub Pages
1. Go to Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main"
4. Folder: "/ (root)"
5. Save

Your portfolio will be live at: https://preranajangid.github.io/portfolio/

## Why this method works:
- Uses your exact file structure (css/, js/, assets/)
- Preserves all animations and styling
- Maintains the same responsive design
- All external links work (RangrezDecor, Looker Studio, GitHub)
- Email functionality works exactly the same

The key is copying your actual working files, not the standalone version.