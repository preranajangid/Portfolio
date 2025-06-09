# GitHub Pages Deployment Guide

## Step-by-Step Deployment Instructions

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository" or the "+" icon
3. Name your repository: `portfolio` or `prerana-jangid-portfolio`
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have files)
6. Click "Create repository"

### 2. Upload Your Portfolio Files
You have two options:

#### Option A: Using Git Commands (Recommended)
1. Download all files from this project
2. Open terminal/command prompt in the project folder
3. Run these commands:
```bash
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

#### Option B: Using GitHub Web Interface
1. Download all files from this project
2. Go to your new GitHub repository
3. Click "uploading an existing file"
4. Drag and drop all files or click "choose your files"
5. Add commit message: "Initial portfolio deployment"
6. Click "Commit changes"

### 3. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### 4. Access Your Live Portfolio
- Your portfolio will be available at: `https://YOUR_USERNAME.github.io/REPOSITORY_NAME/`
- GitHub will provide the exact URL in the Pages settings
- It may take 5-10 minutes for the site to go live

### 5. Custom Domain (Optional)
If you want a custom domain like `preranajangid.com`:
1. Purchase a domain from a domain registrar
2. In your repository, edit the `CNAME` file to include your domain
3. Configure DNS settings with your domain provider
4. In GitHub Pages settings, add your custom domain

### 6. Future Updates
To update your portfolio:
1. Make changes to your files
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Update portfolio content"
git push
```
3. Changes will automatically deploy to GitHub Pages

## Troubleshooting
- **Site not loading**: Check that repository is public and GitHub Pages is enabled
- **Images not showing**: Ensure all image paths are relative (no leading slash)
- **CSS/JS not loading**: Check file paths and case sensitivity
- **Custom domain not working**: Verify DNS settings and CNAME file

## File Structure
```
portfolio/
├── index.html          # Main portfolio page
├── css/
│   └── style.css      # Custom styles
├── js/
│   └── script.js      # Custom JavaScript
├── assets/
│   ├── profile-photo.jpg
│   ├── resume.pdf
│   └── resume.txt
├── README.md          # Project documentation
├── CNAME             # Custom domain configuration
└── .gitignore        # Git ignore file
```

Your portfolio is now ready for deployment to GitHub Pages!