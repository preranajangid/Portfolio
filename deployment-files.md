# Complete Portfolio Deployment Files

## Method 1: Direct File Copy (Recommended)

### Step 1: Copy Your Current HTML
Go to your GitHub repository and create `index.html` with this exact content from your working portfolio:

```html
[Copy the entire content from your current index.html file - the one that's working perfectly now]
```

### Step 2: Copy Your Current CSS  
Create `css/style.css` with your actual CSS file content

### Step 3: Copy Your Current JavaScript
Create `js/script.js` with your actual JavaScript file content

### Step 4: Upload Your Profile Photo
Upload your actual profile photo to `assets/profile-photo.jpg`

## Method 2: Quick Upload (Easiest)

1. Right-click on your project folder in Replit
2. Download as ZIP
3. Extract the ZIP file on your computer
4. Go to GitHub repository
5. Click "Upload files"
6. Drag the entire extracted folder contents
7. Commit changes

This preserves your exact file structure and all your customizations.

## Method 3: Clone and Push (Advanced)

```bash
git clone https://github.com/preranajangid/portfolio.git
# Copy all your portfolio files into the cloned folder
git add .
git commit -m "Deploy portfolio"
git push origin main
```

The key is using your ACTUAL working files, not any modified versions. Your current portfolio on port 5000 is perfect - we just need to replicate it exactly on GitHub.