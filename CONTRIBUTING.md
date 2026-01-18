# How to Add Stories

There are three ways to add stories to the Stories of Places website:

## Method 1: Via Website Form (Recommended for All Users)

This is the easiest method for most users. Stories submitted this way will be reviewed by administrators before publication.

### Steps:

1. **Visit the website** and click "Write a Story"
2. **Fill in the story details**:
   - Title: A clear, descriptive title for your story
   - Location: The name of the place (e.g., "Grand Canyon, Arizona, USA")
   - Latitude & Longitude: Coordinates for map placement
     - Tip: Right-click on Google Maps and select the coordinates to copy them
   - Tags: Comma-separated categories (e.g., "adventure, nature, hiking")
   - Story: Your story content (be descriptive!)
   - Author: Your name
   - Email (optional): For notification when your story is published
3. **Click "Submit for Review"**
4. **Create GitHub Issue**: You'll be redirected to GitHub to create an issue
   - The form will be pre-filled with your story data
   - Click "Submit new issue" on GitHub
   - You'll need a GitHub account (it's free!)
5. **Wait for Review**: An administrator will review your submission (usually 1-2 days)
6. **Get Notified**: You'll receive a notification when your story is published

### Optional: Preview First

Before submitting, you can click "Preview Locally First" to see how your story will look on the map. This only saves it in your browser for testing.

## Method 2: Via GitHub Issue (Manual)

If you prefer, you can manually create a GitHub Issue:

1. Go to the [Issues page](https://github.com/tszck/stories-of-places/issues)
2. Click "New Issue"
3. Select "Story Submission" template
4. Fill in your story details
5. Submit the issue

## Method 3: Via Repository (For Contributors with Access)

This method is for contributors who have direct push access to the repository.

### Steps:

1. **Edit the `stories.json` file** in the repository
2. **Add your story** to the JSON array following this format:

```json
{
    "id": 6,
    "title": "Your Story Title",
    "location": "City, Country",
    "latitude": 12.3456,
    "longitude": 78.9012,
    "content": "Your story content goes here. Write as much as you want about the place and your experience.",
    "tags": ["tag1", "tag2", "tag3"],
    "author": "Your Name",
    "date": "2026-01-18"
}
```

3. **Finding Coordinates:**
   - Use [Google Maps](https://www.google.com/maps) - Right-click on a location and select the coordinates
   - Use [LatLong.net](https://www.latlong.net/)
   - Or any GPS device/app

4. **Commit and Push:**
   ```bash
   git add stories.json
   git commit -m "Add story: Your Story Title"
   git push
   ```

5. **Wait for GitHub Pages to deploy** (usually takes 1-2 minutes)

### Tips:

- Use a unique `id` for each story (increment from the last story's id)
- Format the date as `YYYY-MM-DD`
- Tags should be lowercase and relevant
- Keep story titles clear and descriptive
- Be accurate with coordinates for the correct map location
- Review your story for spelling and grammar before submitting

### Example Pull Request Workflow:

If you don't have direct push access:

1. Fork the repository
2. Edit `stories.json` in your fork
3. Add your story following the format above
4. Create a Pull Request with a clear title like "Add story: [Your Story Title]"
5. Wait for review and merge

## Bulk Adding Stories

If you have multiple stories to add, you can add them all at once to `stories.json`:

```json
[
    {
        "id": 1,
        "title": "Existing Story",
        ...
    },
    {
        "id": 6,
        "title": "New Story 1",
        ...
    },
    {
        "id": 7,
        "title": "New Story 2",
        ...
    }
]
```

Just make sure:
- The JSON syntax is valid (use a JSON validator if needed)
- Each story has a unique ID
- All required fields are present

## Required Fields

Every story must have:
- `id` (number): Unique identifier
- `title` (string): Story title
- `location` (string): Place name
- `latitude` (number): Latitude coordinate
- `longitude` (number): Longitude coordinate
- `content` (string): Story text
- `tags` (array of strings): Category tags
- `author` (string): Author name
- `date` (string): Date in YYYY-MM-DD format

## Questions?

Create an issue in the repository if you need help adding a story!
