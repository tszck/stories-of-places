# Testing Guide for Story Submission Workflow

This document provides instructions for testing the story submission workflow.

## Prerequisites

- A GitHub account (free)
- Access to the repository

## Test Case 1: Submit a Story via Form

### Steps:
1. Visit the website (local or deployed)
2. Click "Write a Story" button in the header
3. Fill in all required fields:
   - Title: "Test Story"
   - Location: "Test Location, Country"
   - Latitude: 40.7128
   - Longitude: -74.0060
   - Tags: test, demo
   - Story: "This is a test story for validation."
   - Author: "Test User"
4. Click "Submit for Review"
5. Click "OK" on the confirmation dialog
6. Verify you're redirected to GitHub Issues page
7. Verify the form is pre-filled with your data
8. Click "Submit new issue" on GitHub

### Expected Results:
- ✓ GitHub issue is created with title "Story Submission: Test Story"
- ✓ Issue contains all story details in the body
- ✓ Issue has a JSON code block at the bottom
- ✓ Issue is labeled with `story-submission` and `pending-review`
- ✓ Bot adds a welcome comment (if workflow is set up)

## Test Case 2: Preview Story Locally

### Steps:
1. Click "Write a Story" button
2. Fill in the form (same as Test Case 1)
3. Click "Preview Locally First"
4. Check the map (if Leaflet loaded correctly)
5. Check the "Recent Stories" section

### Expected Results:
- ✓ Story appears in the "Recent Stories" list
- ✓ Story marker appears on the map (if Leaflet loaded)
- ✓ Story is saved in browser localStorage
- ✓ Story persists on page reload
- ✓ Alert confirms it's a local preview

## Test Case 3: Administrator Review Process

### Steps (As Administrator):
1. Go to GitHub Issues page
2. Filter by labels: `story-submission`, `pending-review`
3. Open a story submission issue
4. Review the story content
5. Copy the JSON from the code block
6. Open `stories.json` in the repository
7. Find the highest ID number
8. Paste the JSON and update the ID
9. Commit with message: "Add story: [Title] by [Author]"
10. Push changes
11. Close the issue with a thank you comment
12. Add label `approved` and remove `pending-review`

### Expected Results:
- ✓ JSON is valid and well-formatted
- ✓ Story is added to `stories.json` successfully
- ✓ GitHub Pages deploys automatically
- ✓ Story appears on the website after deployment
- ✓ Issue is properly closed and labeled

## Test Case 4: Form Validation

### Steps:
1. Click "Write a Story"
2. Try to submit with empty fields
3. Try to submit with invalid coordinates:
   - Latitude > 90
   - Latitude < -90
   - Longitude > 180
   - Longitude < -180
4. Try to submit with non-numeric coordinates

### Expected Results:
- ✓ Browser validation prevents submission with empty required fields
- ✓ JavaScript validation shows alert for invalid coordinates
- ✓ Form cannot be submitted with invalid data

## Test Case 5: Graceful Degradation

### Steps:
1. Block the Leaflet CDN (use browser dev tools)
2. Reload the page
3. Try to use the story submission form

### Expected Results:
- ✓ Page loads without JavaScript errors
- ✓ Form is still functional
- ✓ Stories list displays correctly
- ✓ Map area is empty but doesn't break the page
- ✓ Story submission via GitHub Issues still works

## Test Case 6: XSS Prevention

### Steps:
1. Fill in the form with potentially malicious content:
   - Title: `<script>alert('XSS')</script>`
   - Content: `<img src=x onerror=alert('XSS')>`
2. Preview locally
3. View the story

### Expected Results:
- ✓ Script tags are escaped and displayed as text
- ✓ No JavaScript executes from story content
- ✓ Content is properly escaped in the DOM

## Test Case 7: Mobile Responsiveness

### Steps:
1. Open the site on mobile device or mobile viewport
2. Click "Write a Story"
3. Fill in and submit the form

### Expected Results:
- ✓ Form is properly sized for mobile
- ✓ All fields are accessible
- ✓ Buttons are easily clickable
- ✓ Modal scrolls properly on small screens

## Test Case 8: GitHub Actions Workflow

### Steps:
1. Create a story submission issue (via form or manually)
2. Check the issue page

### Expected Results:
- ✓ Labels are automatically added
- ✓ Welcome comment appears from bot
- ✓ Issue appears in filtered views

## Automated Testing Notes

This project currently has no automated test suite. Manual testing is required for:
- UI interactions
- Form submission
- GitHub integration
- Administrator workflow

## Known Limitations

1. **GitHub Account Required**: Users must have a GitHub account to submit stories
2. **Manual Approval**: Administrator must manually copy/paste JSON
3. **No Email Notifications**: Email field is informational only
4. **Client-Side Only**: All validation happens in the browser

## Troubleshooting

### Issue: Map not loading
- Check browser console for Leaflet errors
- Verify CDN is accessible
- Form should still work without map

### Issue: GitHub redirect not working
- Check REPO_CONFIG in app.js
- Verify repository name is correct
- Check browser popup blocker

### Issue: Issue template not appearing
- Verify `.github/ISSUE_TEMPLATE/story-submission.md` exists
- Check file format and YAML front matter

## Success Criteria

The workflow is considered successful if:
1. ✓ Users can submit stories via the form
2. ✓ Submissions create properly formatted GitHub Issues
3. ✓ Administrators can review and approve stories
4. ✓ Approved stories appear on the website
5. ✓ No security vulnerabilities present
6. ✓ Form works even if map doesn't load
7. ✓ All user inputs are properly escaped
