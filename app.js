// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

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
        localStories = JSON.parse(savedLocalStories);
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
            <h3>${story.title}</h3>
            <p><strong>${story.location}</strong></p>
            <p>${story.content.substring(0, 100)}...</p>
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
    
    // Sort stories by date (newest first)
    const sortedStories = [...stories].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedStories.forEach(story => {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.onclick = () => showStoryDetail(story);
        
        const excerpt = story.content.substring(0, 150) + (story.content.length > 150 ? '...' : '');
        
        storyCard.innerHTML = `
            <h3>${story.title}</h3>
            <div class="location">📍 ${story.location}</div>
            <div class="excerpt">${excerpt}</div>
            <div class="tags">
                ${story.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="meta">By ${story.author} on ${story.date}</div>
        `;
        
        storiesList.appendChild(storyCard);
    });
}

// Show story detail modal
function showStoryDetail(story) {
    const modal = document.getElementById('storyDetailModal');
    const storyDetail = document.getElementById('storyDetail');
    
    storyDetail.innerHTML = `
        <h2>${story.title}</h2>
        <div class="detail-location">📍 ${story.location}</div>
        <div class="detail-tags">
            ${story.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="detail-content">${story.content}</div>
        <div class="detail-meta">Written by ${story.author} on ${story.date}</div>
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
    
    // Generate unique ID by finding max existing ID and incrementing
    const maxId = stories.length > 0 ? Math.max(...stories.map(s => s.id)) : 0;
    
    const newStory = {
        id: maxId + 1,
        title: formData.get('title'),
        location: formData.get('location'),
        latitude: parseFloat(formData.get('latitude')),
        longitude: parseFloat(formData.get('longitude')),
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
        <h3>${newStory.title}</h3>
        <p><strong>${newStory.location}</strong></p>
        <p>${newStory.content.substring(0, 100)}...</p>
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
