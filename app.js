// Initialize the map (check if Leaflet is available)
let map;
if (typeof L !== 'undefined') {
    map = L.map('map').setView([20, 0], 2);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);
} else {
    console.warn('Leaflet library not loaded. Map features will be disabled.');
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Story data structure (simulating a database-free approach)
let stories = [];
let repositoryStories = [];
let localStories = [];

// Load stories from JSON file and localStorage
async function loadStories() {
    try {
        // Load stories from the repository JSON file
        const response = await fetch('stories.json');
        if (response.ok) {
            repositoryStories = await response.json();
        }
    } catch (error) {
        console.log('Could not load stories from repository:', error);
        repositoryStories = [];
    }
    
    // Load locally added stories from localStorage
    const savedLocalStories = localStorage.getItem('localStories');
    if (savedLocalStories) {
        try {
            localStories = JSON.parse(savedLocalStories);
        } catch (error) {
            console.error('Failed to parse localStorage data:', error);
            localStories = [];
            // Clear corrupted data
            localStorage.removeItem('localStories');
        }
    } else {
        localStories = [];
    }
    
    // Combine repository stories with local stories
    stories = [...repositoryStories, ...localStories];
}

// Save locally added stories to localStorage
function saveLocalStories() {
    localStorage.setItem('localStories', JSON.stringify(localStories));
}

// Add markers to the map
function addMarkersToMap() {
    if (!map) return; // Skip if map is not initialized
    
    stories.forEach(story => {
        // Validate coordinates before creating marker
        if (typeof story.latitude !== 'number' || typeof story.longitude !== 'number' ||
            isNaN(story.latitude) || isNaN(story.longitude)) {
            console.warn('Skipping story with invalid coordinates:', story);
            return;
        }
        
        const marker = L.marker([story.latitude, story.longitude]).addTo(map);
        
        const content = story.content || '';
        const contentPreview = content.substring(0, 100) + (content.length > 100 ? '...' : '');
        
        marker.bindPopup(`
            <h3>${escapeHtml(story.title || 'Untitled')}</h3>
            <p><strong>${escapeHtml(story.location || 'Unknown location')}</strong></p>
            <p>${escapeHtml(contentPreview)}</p>
        `);
        
        marker.on('click', () => {
            showStoryDetail(story);
        });
    });
}

// Display stories in the list
function displayStories() {
    const storiesList = document.getElementById('storiesList');
    storiesList.innerHTML = '';
    
    // Sort stories by date (newest first), with fallback for invalid dates
    const sortedStories = [...stories].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
    });
    
    sortedStories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.onclick = () => showStoryDetail(story);
        
        const content = story.content || '';
        const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '');
        const tags = story.tags || [];
        
        storyCard.innerHTML = `
            <h3>${escapeHtml(story.title || 'Untitled')}</h3>
            <div class="location">📍 ${escapeHtml(story.location || 'Unknown location')}</div>
            <div class="excerpt">${escapeHtml(excerpt)}</div>
            <div class="tags">
                ${tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            </div>
            <div class="meta">By ${escapeHtml(story.author || 'Anonymous')} on ${escapeHtml(story.date || '')}</div>
        `;
        
        storiesList.appendChild(storyCard);
    });
}

// Show story detail modal
function showStoryDetail(story) {
    const modal = document.getElementById('storyDetailModal');
    const storyDetail = document.getElementById('storyDetail');
    
    const tags = story.tags || [];
    
    storyDetail.innerHTML = `
        <h2>${escapeHtml(story.title || 'Untitled')}</h2>
        <div class="detail-location">📍 ${escapeHtml(story.location || 'Unknown location')}</div>
        <div class="detail-tags">
            ${tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="detail-content">${escapeHtml(story.content || 'No content available')}</div>
        <div class="detail-meta">Written by ${escapeHtml(story.author || 'Anonymous')} on ${escapeHtml(story.date || '')}</div>
    `;
    
    modal.style.display = 'block';
}

// Modal handling
const writeStoryBtn = document.getElementById('writeStoryBtn');
const storyModal = document.getElementById('storyModal');
const storyDetailModal = document.getElementById('storyDetailModal');
const closeBtns = document.getElementsByClassName('close');

writeStoryBtn.onclick = () => {
    storyModal.style.display = 'block';
};

Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        this.parentElement.parentElement.style.display = 'none';
    };
});

window.onclick = (event) => {
    if (event.target == storyModal) {
        storyModal.style.display = 'none';
    }
    if (event.target == storyDetailModal) {
        storyDetailModal.style.display = 'none';
    }
};

// Helper function to create GitHub issue URL with pre-filled data
function createGitHubIssueURL(storyData) {
    // Get repository info from the current page URL or use a default
    const repoOwner = 'tszck';  // Repository owner
    const repoName = 'stories-of-places';  // Repository name
    
    // Create the issue body with story data
    const issueBody = `## Story Details

**Title:** ${storyData.title}

**Location Name:** ${storyData.location}

**Latitude:** ${storyData.latitude}

**Longitude:** ${storyData.longitude}

**Author:** ${storyData.author}

${storyData.email ? `**Email:** ${storyData.email}\n\n` : ''}**Tags:** ${storyData.tags}

**Story Content:**

${storyData.content}

---

<!-- DO NOT EDIT BELOW THIS LINE -->
<!-- This format is used for automated processing -->

\`\`\`json
{
  "title": "${storyData.title.replace(/"/g, '\\"')}",
  "location": "${storyData.location.replace(/"/g, '\\"')}",
  "latitude": ${storyData.latitude},
  "longitude": ${storyData.longitude},
  "author": "${storyData.author.replace(/"/g, '\\"')}",
  "tags": [${storyData.tagsArray.map(t => `"${t.replace(/"/g, '\\"')}"`).join(', ')}],
  "content": "${storyData.content.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
  "date": "${storyData.date}"
}
\`\`\`
`;
    
    const issueTitle = encodeURIComponent(`Story Submission: ${storyData.title}`);
    const issueBodyEncoded = encodeURIComponent(issueBody);
    const labels = encodeURIComponent('story-submission,pending-review');
    
    return `https://github.com/${repoOwner}/${repoName}/issues/new?title=${issueTitle}&body=${issueBodyEncoded}&labels=${labels}`;
}

// Handle local preview button
const previewLocalBtn = document.getElementById('previewLocalBtn');
previewLocalBtn.onclick = (e) => {
    e.preventDefault();
    
    const formData = new FormData(storyForm);
    
    // Validate coordinates
    const latitude = parseFloat(formData.get('latitude'));
    const longitude = parseFloat(formData.get('longitude'));
    
    if (isNaN(latitude) || isNaN(longitude) || 
        latitude < -90 || latitude > 90 || 
        longitude < -180 || longitude > 180) {
        alert('Please enter valid coordinates.\nLatitude must be between -90 and 90.\nLongitude must be between -180 and 180.');
        return;
    }
    
    // Generate unique ID by finding max existing ID and incrementing
    const validIds = stories.filter(s => typeof s.id === 'number' && !isNaN(s.id)).map(s => s.id);
    const maxId = validIds.length > 0 ? Math.max(...validIds) : 0;
    
    const newStory = {
        id: maxId + 1,
        title: formData.get('title'),
        location: formData.get('location'),
        latitude: latitude,
        longitude: longitude,
        content: formData.get('content'),
        tags: (formData.get('tags') || '').split(',').map(tag => tag.trim()).filter(tag => tag),
        author: formData.get('author'),
        date: new Date().toISOString().split('T')[0]
    };
    
    // Add to local stories and combined stories array
    localStories.push(newStory);
    stories.push(newStory);
    saveLocalStories();
    
    // Add only the new marker to the map (more efficient)
    if (map && typeof L !== 'undefined') {
        const marker = L.marker([newStory.latitude, newStory.longitude]).addTo(map);
        
        const contentPreview = newStory.content.substring(0, 100) + (newStory.content.length > 100 ? '...' : '');
        
        marker.bindPopup(`
            <h3>${escapeHtml(newStory.title)}</h3>
            <p><strong>${escapeHtml(newStory.location)}</strong></p>
            <p>${escapeHtml(contentPreview)}</p>
        `);
        marker.on('click', () => {
            showStoryDetail(newStory);
        });
    }
    
    // Refresh the stories list
    displayStories();
    
    // Close modal and reset form
    storyModal.style.display = 'none';
    storyForm.reset();
    
    // Pan to new story location
    if (map) {
        map.setView([newStory.latitude, newStory.longitude], 10);
    }
    
    alert('Story preview added locally! This is only visible in your browser.\n\nTo submit for publication, click "Write a Story" again and use "Submit for Review".');
};

// Handle form submission - Submit to GitHub Issues for review
const storyForm = document.getElementById('storyForm');
storyForm.onsubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(storyForm);
    
    // Validate coordinates
    const latitude = parseFloat(formData.get('latitude'));
    const longitude = parseFloat(formData.get('longitude'));
    
    if (isNaN(latitude) || isNaN(longitude) || 
        latitude < -90 || latitude > 90 || 
        longitude < -180 || longitude > 180) {
        alert('Please enter valid coordinates.\nLatitude must be between -90 and 90.\nLongitude must be between -180 and 180.');
        return;
    }
    
    // Prepare story data for submission
    const storyData = {
        title: formData.get('title'),
        location: formData.get('location'),
        latitude: latitude,
        longitude: longitude,
        content: formData.get('content'),
        tags: formData.get('tags') || '',
        tagsArray: (formData.get('tags') || '').split(',').map(tag => tag.trim()).filter(tag => tag),
        author: formData.get('author'),
        email: formData.get('email') || '',
        date: new Date().toISOString().split('T')[0]
    };
    
    // Create GitHub issue URL with pre-filled data
    const issueURL = createGitHubIssueURL(storyData);
    
    // Close modal
    storyModal.style.display = 'none';
    
    // Show confirmation and redirect
    const confirmed = confirm(
        'Your story will be submitted for review via GitHub Issues.\n\n' +
        'You will be redirected to GitHub to create an issue. The form will be pre-filled with your story details.\n\n' +
        'An administrator will review your submission and add it to the website if approved.\n\n' +
        'Click OK to continue to GitHub.'
    );
    
    if (confirmed) {
        // Open GitHub issue creation page in a new window
        window.open(issueURL, '_blank');
        
        // Reset form
        storyForm.reset();
        
        // Show thank you message
        setTimeout(() => {
            alert('Thank you for your submission!\n\nYour story has been sent for review. You will be notified once it\'s published.');
        }, 500);
    } else {
        // User cancelled, show modal again
        storyModal.style.display = 'block';
    }
};

// Initialize the application
loadStories().then(() => {
    addMarkersToMap();
    displayStories();
});
