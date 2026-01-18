# GitHub Pages Setup Guide

## Quick Setup

1. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section (in the sidebar under "Code and automation")
   - Under "Source", select the branch you want to deploy (e.g., `main` or `copilot/add-interactive-world-map`)
   - Click **Save**

2. **Wait for Deployment**
   - GitHub will automatically build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a message with your site URL: `https://tszck.github.io/stories-of-places/`

3. **Visit Your Site**
   - Once deployed, click the URL or visit it in your browser
   - The interactive map should load with all the story markers

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the repository root with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. In GitHub Pages settings, enter your custom domain

See: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Troubleshooting

### Site Not Loading
- Wait a few minutes for GitHub Actions to complete
- Check the Actions tab to see deployment status
- Make sure the branch is set correctly in Pages settings

### Map Not Showing
- Check browser console for errors
- Ensure you have internet connection (Leaflet.js loads from CDN)
- Try a different browser or disable ad blockers

### Stories Not Appearing
- Verify `stories.json` is valid JSON (use a JSON validator)
- Check browser console for fetch errors
- Ensure file is in the root directory

## Adding New Stories

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on adding stories.

## Local Testing

To test locally before deploying:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx http-server
```

Then visit `http://localhost:8000`

## More Information

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Leaflet.js Documentation](https://leafletjs.com/)
