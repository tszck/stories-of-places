# Stories of Places

A simple, interactive website for sharing stories about places around the world. Stories are stored in a JSON file in the repository, making it a database-free blog-style website that anyone can contribute to.

## Features

- **Interactive World Map**: Browse stories by location on an interactive map powered by Leaflet.js
- **Write Stories**: Add your own stories with location, tags, and content
- **No Database**: Stories are stored in a `stories.json` file in the repository
- **Blog-Style**: New stories show up automatically when the JSON file is updated
- **Responsive Design**: Works on desktop and mobile devices
- **Tag System**: Organize stories with custom tags
- **Dual Storage**: 
  - Repository stories (in `stories.json`) are visible to everyone
  - Local stories (in browser localStorage) are visible only to you until committed

## How to Use

### Viewing Stories

1. Visit the website to see the interactive world map
2. Click on markers to see story previews
3. Browse recent stories in the list below the map
4. Click on any story card to read the full story

### Writing a Story

There are two ways to add stories:

#### Option 1: Quick Add (Local Only)
1. Click the "Write a Story" button in the header
2. Fill in the form with your story details
3. Submit to add your story locally (visible only in your browser)
4. To make it permanent, copy the JSON from the browser console and add it to `stories.json`

#### Option 2: Permanent Add (Visible to Everyone)
1. Edit the `stories.json` file in the repository
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

1. **Stories Source**: All permanent stories are stored in `stories.json`
2. **Loading**: When the page loads, it fetches stories from the JSON file
3. **Local Additions**: The "Write a Story" form adds stories to your browser's localStorage
4. **Display**: Both repository and local stories are displayed on the map and in the list
5. **Making Stories Permanent**: Copy the JSON from browser console and add to `stories.json`

This approach combines the simplicity of a static site with the flexibility of user contributions through Git.

## License

MIT License - see LICENSE file for details