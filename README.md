# Stories of Places

A simple, interactive website for sharing stories about places around the world. Stories are stored in a JSON file in the repository, making it a database-free blog-style website that anyone can contribute to.

## Features

- **Interactive World Map**: Browse stories by location on an interactive map powered by Leaflet.js
- **Submit Stories**: Users can submit stories for review through a simple form
- **Administrator Review**: All submissions are reviewed before publication
- **No Database**: Stories are stored in a `stories.json` file in the repository
- **Blog-Style**: New stories show up automatically when the JSON file is updated
- **Responsive Design**: Works on desktop and mobile devices
- **Tag System**: Organize stories with custom tags
- **Preview Mode**: Preview your story locally before submitting
- **GitHub-based**: Uses GitHub Issues for submission workflow

## How to Use

### Viewing Stories

1. Visit the website to see the interactive world map
2. Click on markers to see story previews
3. Browse recent stories in the list below the map
4. Click on any story card to read the full story

### Writing a Story

#### Submit for Review (Recommended)

1. Click the "Write a Story" button in the header
2. Fill in the form with your story details:
   - Title and location
   - Coordinates (tip: right-click on Google Maps)
   - Tags to categorize your story
   - Your story content
   - Author name and optional email for notifications
3. Click "Submit for Review"
4. You'll be redirected to GitHub to create an issue with your story
5. An administrator will review and publish your story if approved
6. You'll be notified when your story is published

**Note**: Submissions are reviewed to ensure quality and appropriateness. Most stories are approved within 1-2 days.

#### Preview Locally First (Optional)

1. Click the "Write a Story" button
2. Fill in the form
3. Click "Preview Locally First" to see how your story looks
4. The story will appear on your map (visible only to you)
5. When ready, submit for review using the steps above

#### Direct Contribution (For Contributors)

If you have direct access to the repository:

1. Edit the `stories.json` file directly
2. Add your story following the JSON format
3. Commit and push your changes
4. GitHub Pages will automatically update the website

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on adding stories.

## Technical Details

- **Frontend Only**: Pure HTML, CSS, and JavaScript
- **Map Library**: Leaflet.js for interactive maps
- **Storage**: 
  - Repository: `stories.json` file (shared stories)
  - Browser: localStorage (personal draft stories)
- **Hosting**: GitHub Pages
- **No Build Process**: Direct deployment of source files

## Local Development

Simply open `index.html` in a web browser, or serve it with any static file server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## GitHub Pages Deployment

This site is configured to work with GitHub Pages. To deploy:

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select the branch to deploy (e.g., `main`)
4. Your site will be available at `https://yourusername.github.io/stories-of-places/`

## Contributing

We welcome story contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to add your stories.

## How It Works

1. **Stories Source**: All published stories are stored in `stories.json`
2. **Loading**: When the page loads, it fetches stories from the JSON file
3. **Story Submission**: Users submit stories via the form, which creates a GitHub Issue
4. **Review Process**: Administrators review GitHub Issues labeled `story-submission`
5. **Publication**: Approved stories are added to `stories.json` by administrators
6. **Display**: All published stories appear on the map and in the list
7. **Preview Mode**: Users can preview stories locally before submitting

This approach combines the simplicity of a static site with a review workflow through GitHub Issues.

## For Administrators

See [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for detailed instructions on reviewing and approving story submissions.

## License

MIT License - see LICENSE file for details