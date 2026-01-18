# Administrator Guide: Story Submission Workflow

This guide explains how to review and approve story submissions from users.

## Overview

When users submit stories through the website, they create GitHub Issues with the label `story-submission` and `pending-review`. As an administrator, you'll review these submissions and add approved stories to the `stories.json` file.

## Story Submission Process (User Side)

1. User fills out the story form on the website
2. User clicks "Submit for Review"
3. User is redirected to GitHub Issues with a pre-filled form
4. User creates the issue (requires a GitHub account)
5. Issue is automatically labeled as `story-submission` and `pending-review`

## Review and Approval Process (Administrator)

### Step 1: View Pending Submissions

1. Go to the repository's Issues page
2. Filter by label: `story-submission` + `pending-review`
3. Review each submission

### Step 2: Review Story Content

Each story submission issue contains:
- Story details (title, location, coordinates, author, tags, content)
- A JSON code block at the bottom with the formatted story data

Review the story for:
- **Content Quality**: Is the story well-written and appropriate?
- **Accuracy**: Are the coordinates correct for the location?
- **Completeness**: Are all required fields filled in?
- **Appropriateness**: Does it meet community guidelines?

### Step 3: Approve and Add Story

If approved:

1. **Copy the JSON data** from the code block at the bottom of the issue
2. **Edit `stories.json`** in the repository
3. **Assign a unique ID**: Find the highest existing ID and increment by 1
4. **Add the story** to the JSON array (paste the JSON and update the ID)
5. **Commit** with message: `Add story: [Story Title]`
6. **Close the issue** with a comment thanking the author
7. **Add label** `approved` and remove `pending-review`

Example commit message:
```
Add story: Tokyo's Hidden Temple by Emily Chen
```

### Step 4: If Changes Needed

If the story needs modifications:

1. **Comment on the issue** explaining what needs to be changed
2. **Add label** `needs-changes`
3. **Keep** the `pending-review` label
4. Wait for the user to update the issue

### Step 5: If Rejected

If the story is not appropriate:

1. **Close the issue** with a polite explanation
2. **Add label** `declined`
3. **Remove** the `pending-review` label

## Adding Story to stories.json

### Manual Method

1. Open `stories.json`
2. Find the highest `id` number in existing stories
3. Copy the JSON from the issue's code block
4. Update the `id` field to be highest ID + 1
5. Add the story object to the array
6. Verify JSON syntax is valid
7. Commit and push

### Example Addition

If the last story has `id: 5`, add the new story with `id: 6`:

```json
[
  {
    "id": 1,
    "title": "Existing Story 1",
    ...
  },
  ...
  {
    "id": 5,
    "title": "Existing Story 5",
    ...
  },
  {
    "id": 6,
    "title": "New Submitted Story",
    "location": "Paris, France",
    "latitude": 48.8566,
    "longitude": 2.3522,
    "author": "John Doe",
    "tags": ["travel", "culture"],
    "content": "My amazing story...",
    "date": "2026-01-18"
  }
]
```

## Automating with GitHub Actions (Optional)

You can optionally create a GitHub Action workflow to:
- Automatically validate story submissions
- Check for required fields
- Verify coordinate formats
- Comment on issues with validation results

See `.github/workflows/validate-story-submission.yml` for an example (if implemented).

## Email Notifications

If the submitter provided an email in the submission:
- You can manually notify them when their story is published
- Consider setting up GitHub issue notifications to auto-notify users

## Tips for Administrators

1. **Be Responsive**: Try to review submissions within 1-2 days
2. **Be Constructive**: If rejecting, explain why and suggest improvements
3. **Verify Coordinates**: Use Google Maps to verify location accuracy
4. **Check for Duplicates**: Ensure the story isn't already published
5. **Maintain Quality**: Keep a consistent standard for story quality
6. **Thank Contributors**: Always thank users for their submissions

## Common Issues

### Invalid JSON Format
- If JSON is malformed, fix it before adding to `stories.json`
- Use a JSON validator (e.g., jsonlint.com)

### Wrong Coordinates
- Ask the submitter to verify the coordinates
- You can correct minor coordinate errors yourself

### Missing Information
- Request the missing information via issue comment
- Label with `needs-changes`

## Quick Reference Commands

```bash
# Clone repository
git clone https://github.com/tszck/stories-of-places.git
cd stories-of-places

# Edit stories.json
nano stories.json  # or use your preferred editor

# Commit changes
git add stories.json
git commit -m "Add story: [Story Title] by [Author]"
git push origin main

# Check GitHub Pages deployment
# Visit: https://github.com/tszck/stories-of-places/actions
```

## Questions?

If you have questions about the review process, create an issue with the label `admin-question`.
