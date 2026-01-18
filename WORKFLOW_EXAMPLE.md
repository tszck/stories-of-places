# Example: Story Submission Workflow

This document demonstrates how the story submission workflow operates from submission to publication.

## User Story Submission Example

### Step 1: User Fills Form

A user visits the website and clicks "Write a Story". They fill in:
- **Title**: "Sunset at Santorini"
- **Location**: "Oia, Santorini, Greece"
- **Latitude**: 36.4618
- **Longitude**: 25.3753
- **Tags**: travel, sunset, greece, europe
- **Story**: A beautiful description of watching the sunset in Santorini
- **Author**: Jane Doe
- **Email**: jane@example.com (optional)

### Step 2: User Submits for Review

When the user clicks "Submit for Review":
1. They are redirected to GitHub Issues
2. An issue is created with the title: "Story Submission: Sunset at Santorini"
3. The issue contains all story details in a structured format
4. The issue is automatically labeled with `story-submission` and `pending-review`
5. A bot comments: "Thank you for your submission! An administrator will review shortly."

### Step 3: Administrator Reviews

The administrator:
1. Goes to GitHub Issues filtered by `story-submission` + `pending-review`
2. Reviews the story for quality and appropriateness
3. Copies the JSON from the issue's code block

### Step 4: Administrator Approves

If approved:
1. Administrator edits `stories.json`
2. Finds the highest existing story ID (e.g., 5)
3. Adds the new story with ID 6:

```json
{
  "id": 6,
  "title": "Sunset at Santorini",
  "location": "Oia, Santorini, Greece",
  "latitude": 36.4618,
  "longitude": 25.3753,
  "author": "Jane Doe",
  "tags": ["travel", "sunset", "greece", "europe"],
  "content": "A beautiful description of watching the sunset in Santorini...",
  "date": "2026-01-18"
}
```

4. Commits with message: `Add story: Sunset at Santorini by Jane Doe`
5. Closes the issue with a thank you comment
6. Adds label `approved` and removes `pending-review`

### Step 5: Automatic Publication

1. GitHub Actions automatically deploys to GitHub Pages
2. The story appears on the website within 1-2 minutes
3. Users can see it on the map and in the story list

## Benefits of This Workflow

- ✅ **No Backend Required**: Pure static site with GitHub as the backend
- ✅ **Quality Control**: All stories are reviewed before publication
- ✅ **Transparent**: Submission history is visible in GitHub Issues
- ✅ **Secure**: No API keys needed, uses GitHub's authentication
- ✅ **Trackable**: Easy to see pending, approved, and declined submissions
- ✅ **User-Friendly**: Simple form interface for non-technical users
- ✅ **Administrator-Friendly**: Clear workflow with GitHub's familiar interface
