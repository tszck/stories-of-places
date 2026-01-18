# Stories of Places - Quick Reference

## 🌍 What is this?
A collaborative website for sharing travel stories on an interactive world map. No database, no complicated setup - just pure storytelling!

## 🚀 Quick Links
- **View Site**: `https://tszck.github.io/stories-of-places/` (after GitHub Pages is enabled)
- **Add Story**: Click "Write a Story" button on the website
- **Documentation**: See README.md for full details

## 📝 Adding a Story (2 Ways)

### Quick Method (Browser Only)
1. Visit the website
2. Click "Write a Story" button
3. Fill in the form and submit
4. Story saves to your browser only

### Permanent Method (Everyone Can See)
1. Edit `stories.json` in the repository
2. Add your story in this format:
```json
{
  "id": 6,
  "title": "Your Story Title",
  "location": "City, Country",
  "latitude": 12.3456,
  "longitude": 78.9012,
  "content": "Your story here...",
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "date": "2026-01-18"
}
```
3. Commit and push to GitHub
4. Done! Story appears for everyone

## 🗺️ Finding Coordinates
- **Google Maps**: Right-click → Click coordinates
- **LatLong.net**: https://www.latlong.net/
- **GPS App**: Use any GPS/maps app on your phone

## 📁 Project Structure
```
├── index.html          → Main page
├── styles.css          → Styling
├── app.js              → Functionality
├── stories.json        → Story data
├── README.md           → Full documentation
├── CONTRIBUTING.md     → Contribution guide
└── SETUP.md            → Deployment guide
```

## 🛠️ Key Features
- ✅ Interactive world map (Leaflet.js)
- ✅ Story markers on map
- ✅ Click markers/cards to read stories
- ✅ Add stories via form
- ✅ Tag system for categorization
- ✅ Responsive design (mobile & desktop)
- ✅ No database needed
- ✅ GitHub Pages ready

## 🎯 Technologies Used
- **HTML5** - Structure
- **CSS3** - Styling
- **JavaScript (ES6+)** - Functionality
- **Leaflet.js** - Interactive maps
- **OpenStreetMap** - Map tiles
- **GitHub Pages** - Hosting

## 💡 Tips
- Be descriptive with your story titles
- Use accurate coordinates for correct map placement
- Add relevant tags for better categorization
- Keep stories engaging and personal
- Include specific location details

## 🐛 Troubleshooting
- **Map not loading?** Check internet connection / disable ad blockers
- **Stories not showing?** Verify `stories.json` is valid JSON
- **Can't find coordinates?** Use Google Maps or LatLong.net

## 📚 Learn More
- Full documentation: `README.md`
- How to contribute: `CONTRIBUTING.md`
- Setup guide: `SETUP.md`

---

**Happy Storytelling! 🌍✈️📖**
