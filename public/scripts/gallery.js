// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Initialize theme from localStorage or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
    }
    localStorage.setItem('theme', theme);
}

// Set initial theme
setTheme(savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.innerHTML = nav.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Gallery-specific scripts
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filters = document.querySelectorAll('#genre-filter, #tone-filter, #length-filter, #sort');
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    function applyFilters() {
        // In a real implementation, this would filter stories
        console.log('Filters applied');
    }
    
    // Bookmark functionality
    const bookmarks = document.querySelectorAll('.fa-bookmark');
    bookmarks.forEach(bookmark => {
        bookmark.addEventListener('click', function() {
            this.classList.toggle('fas');
            this.classList.toggle('far');
            this.style.color = this.classList.contains('fas') ? 'var(--primary)' : '';
        });
    });
    
    // Story card hover effects
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.querySelector('.grid-container');
    const stories = JSON.parse(localStorage.getItem('vedaTaleStories')) || [];

    if (stories.length === 0) {
        gridContainer.innerHTML = '<p class="empty-gallery-message">Your story gallery is empty. Go create a new story!</p>';
        return;
    }

    // Clear any example cards
    gridContainer.innerHTML = ''; 
    
    // Reverse the array to show newest stories first
    stories.reverse().forEach(story => {
        // Create the HTML for one story card
        const storyCardHTML = `
            <div class="story-card" data-story-id="${story.id}">
                <div class="card-header">
                    <div class="author">
                        <img src="https://via.placeholder.com/40/9d7cff/FFFFFF?text=AI" alt="Author">
                        <span>VedaTale AI</span>
                    </div>
                    <div class="card-actions">
                        <button><i class="far fa-bookmark"></i></button>
                        <button><i class="fas fa-share-alt"></i></button>
                    </div>
                </div>
                <div class="card-content">
                    <h3>${story.title}</h3>
                    <p>${story.content.substring(0, 150)}...</p> 
                </div>
                <div class="card-meta">
                    <span class="genre-tag">${story.genre}</span>
                    <span class="tone-tag">${story.tone}</span>
                    <span class="length-tag">${story.length}</span>
                </div>
                <div class="card-stats">
                    <span><i class="fas fa-eye"></i> 1</span>
                    <span><i class="fas fa-heart"></i> 1</span>
                    <span><i class="fas fa-comment"></i> 0</span>
                </div>
                <button class="btn btn-outline read-btn">Read Full Story</button>
            </div>
        `;
        // Add the new card to the grid
        gridContainer.insertAdjacentHTML('beforeend', storyCardHTML);
    });
});

// --- Modal Functionality ---
const modal = document.getElementById('storyModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// Function to open the modal with specific story content
function openModal(story) {
    modalTitle.textContent = story.title;
    modalBody.textContent = story.content;
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}

// Event listener for closing the modal
closeBtn.onclick = closeModal;
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
};

// Add event listeners to all "Read Full Story" buttons (after cards are rendered)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.story-card');
            if (!card) return;
            const storyId = card.dataset.storyId;
            const stories = JSON.parse(localStorage.getItem('vedaTaleStories')) || [];
            const story = stories.find(s => String(s.id) === String(storyId));
            if (story) {
                openModal(story);
            }
        });
    });
});


