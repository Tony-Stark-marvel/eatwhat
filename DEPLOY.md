# Deployment Guide for EatWhat

## Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name it `eatwhat` (or any name you prefer)
4. Keep it Public (required for free GitHub Pages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Upload Files

#### Option A: Using Git Command Line (Recommended)

```bash
# Navigate to your project folder
cd d:\ProJect\eatwhat

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: EatWhat AI food calorie analyzer"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/eatwhat.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Option B: Using GitHub Web Interface

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all files from `d:\ProJect\eatwhat` folder
3. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Select branch: "main" and folder: "/ (root)"
6. Click "Save"

### Step 4: Access Your Live Site

Your site will be available at:
```
https://YOUR_USERNAME.github.io/eatwhat
```

It may take 1-2 minutes for the site to become available.

## Important Notes

### API Key Security

⚠️ **IMPORTANT**: Never commit your API key to the repository!

The app stores the API key in the browser's localStorage, so:
- Each user must enter their own API key
- The key is never uploaded to GitHub
- The key stays in the user's browser only

### First Time Setup for Users

When users visit your site for the first time:
1. They'll see a modal asking for Gemini API key
2. Provide instructions on how to get one (see README)
3. Once saved, the key persists in their browser

### Custom Domain (Optional)

To use a custom domain:
1. Go to Settings > Pages
2. Under "Custom domain", enter your domain
3. Follow the DNS configuration instructions
4. Create a CNAME file in your repository root

## Troubleshooting

### Site Not Loading After Deployment

1. Check that all files were uploaded correctly
2. Verify `.nojekyll` file exists in the root
3. Wait 2-3 minutes for GitHub Pages to build
4. Check browser console for errors (F12)

### Images Not Loading

Make sure paths are correct:
- CSS: `css/style.css`
- JS: `js/app.js`, `js/gemini.js`, `js/storage.js`

### API Errors

Common issues:
- Invalid API key - user needs to get a valid key
- Quota exceeded - wait or check Google AI Studio
- Network error - check internet connection

## Updating Your Site

After making changes:

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically update within 1-2 minutes.

## Monitoring Usage

Check your Gemini API usage:
1. Visit [Google AI Studio](https://makersuite.google.com)
2. Go to your API dashboard
3. Monitor request count and token usage

Free tier typically includes:
- 60 requests per minute
- 1500 requests per day
- Varies by model used

## Performance Tips

For better performance on GitHub Pages:

1. **Image Optimization**: The app already compresses images before sending to API
2. **Minification**: Consider minifying CSS/JS for production (optional)
3. **Caching**: Browser caches static assets automatically
4. **CDN**: GitHub Pages serves from CDN automatically

## Backup Your Data

Since all data is stored locally in browsers:

**For Users:**
- Export data manually (future feature)
- Use same browser/device for consistent history
- Clear browser data = lose history

**For Developers:**
- Repository is backed up on GitHub
- Clone to multiple locations for safety

## Support & Issues

If you encounter problems:
1. Check the README troubleshooting section
2. Review browser console for errors
3. Verify API key is valid
4. Test with different images

---

Happy deploying! 🚀
