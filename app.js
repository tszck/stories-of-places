// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

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
    stories.forEach(story => {
        const marker = L.marker([story.latitude, story.longitude]).addTo(map);
        
        marker.bindPopup(`
            <h3>${escapeHtml(story.title)}</h3>
            <p><strong>${escapeHtml(story.location)}</strong></p>
            <p>${escapeHtml(story.content.substring(0, 100))}...</p>
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

// Handle form submission
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
    const marker = L.marker([newStory.latitude, newStory.longitude]).addTo(map);
    marker.bindPopup(`
        <h3>${escapeHtml(newStory.title)}</h3>
        <p><strong>${escapeHtml(newStory.location)}</strong></p>
        <p>${escapeHtml(newStory.content.substring(0, 100))}...</p>
    `);
    marker.on('click', () => {
        showStoryDetail(newStory);
    });
    
    // Refresh the stories list
    displayStories();
    
    // Close modal and reset form
    storyModal.style.display = 'none';
    storyForm.reset();
    
    // Pan to new story location
    map.setView([newStory.latitude, newStory.longitude], 10);
    
    // Show instructions for making the story permanent
    const instructions = `
Story added successfully to your local browser!

To make this story visible to everyone:
1. Copy the story data from the browser console
2. Add it to the stories.json file in the repository
3. Commit and push the changes to GitHub

Check the browser console for the JSON data.
    `;
    
    console.log('=== NEW STORY JSON ===');
    console.log(JSON.stringify(newStory, null, 2));
    console.log('=== Add this to stories.json ===');
    
    alert(instructions);
};

// Initialize the application
loadStories().then(() => {
    addMarkersToMap();
    displayStories();
});
