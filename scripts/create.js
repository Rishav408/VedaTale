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

// Story length selection
document.querySelectorAll('.length-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.length-option').forEach(el => {
            el.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Form submission with AI integration
document.getElementById('storyForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const inspiration = document.getElementById('inspiration').value;
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const tone = document.getElementById('tone').value;
    const length = document.querySelector('.length-option.active').dataset.length;
    
    // Validate inputs
    if (!inspiration.trim()) {
        alert('Please provide story inspiration!');
        return;
    }
    
    if (!genre) {
        alert('Please select a story genre!');
        return;
    }
    
    if (!tone) {
        alert('Please select a story tone!');
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.generate-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    submitBtn.disabled = true;
    
    try {
        // Send request to backend
        const response = await fetch('http://localhost:8000/api/generate', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                inspiration, 
                title, 
                genre, 
                tone, 
                length 
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Story generation failed');
        }
        
        const storyData = await response.json();
        
        // Display the generated story
        document.getElementById('storyTitle').textContent = storyData.title;
        
        // Format content with paragraphs
        const formattedContent = storyData.content
            .split('\n\n')
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('');
        
        document.getElementById('storyContent').innerHTML = formattedContent;
        
        // Update meta information
        document.querySelector('.meta-item:nth-child(1) span').textContent = `Genre: ${getGenreName(genre)}`;
        document.querySelector('.meta-item:nth-child(2) span').textContent = `Tone: ${getToneName(tone)}`;
        document.querySelector('.meta-item:nth-child(3) span').textContent = `Length: ${length} words`;
        
        // Show the story display section
        document.getElementById('storyDisplay').style.display = 'block';
        
        // Scroll to the story display
        document.getElementById('storyDisplay').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    } finally {
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

// Helper functions to get display names
function getGenreName(genre) {
    const genreMap = {
        'fantasy': 'Fantasy',
        'sci-fi': 'Sci-Fi',
        'romance': 'Romance',
        'mystery': 'Mystery',
        'mythology': 'Mythology',
        'adventure': 'Adventure',
        'historical': 'Historical',
        'horror': 'Horror'
    };
    return genreMap[genre] || genre;
}

function getToneName(tone) {
    const toneMap = {
        'epic': 'Epic',
        'mysterious': 'Mysterious',
        'humorous': 'Humorous',
        'dark': 'Dark',
        'inspiring': 'Inspiring',
        'romantic': 'Romantic',
        'whimsical': 'Whimsical',
        'suspenseful': 'Suspenseful'
    };
    return toneMap[tone] || tone;
}

// Regenerate button functionality
document.querySelector('.story-actions .btn-outline').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('storyForm').dispatchEvent(new Event('submit'));
});

// Save story button functionality
document.querySelector('.story-actions .btn-primary').addEventListener('click', function(e) {
    e.preventDefault();
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    try {
        // 1. Get the current story data from the page
        const storyTitle = document.getElementById('storyTitle').textContent;
        const storyContent = document.getElementById('storyContent').innerText; // Use innerText to get clean text
        const genre = document.querySelector('.meta-item:nth-child(1) span').textContent.replace('Genre: ', '');
        const tone = document.querySelector('.meta-item:nth-child(2) span').textContent.replace('Tone: ', '');
        const length = document.querySelector('.meta-item:nth-child(3) span').textContent.replace('Length: ', '');

        // 2. Create a story object
        const newStory = {
            id: Date.now(), // Unique ID based on timestamp
            title: storyTitle,
            content: storyContent,
            genre: genre,
            tone: tone,
            length: length
        };

        // 3. Get existing stories from localStorage or create a new array
        const stories = JSON.parse(localStorage.getItem('vedaTaleStories')) || [];

        // 4. Add the new story and save back to localStorage
        stories.push(newStory);
        localStorage.setItem('vedaTaleStories', JSON.stringify(stories));

        // 5. Give success feedback
        this.innerHTML = '<i class="fas fa-check"></i> Saved!';
        alert('Your story has been saved to the Gallery!');
        
        // Reset button after a delay
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-save"></i> Save Story';
        }, 2000);

    } catch (error) {
        console.error("Failed to save story:", error);
        alert("Sorry, there was an error saving your story.");
        this.innerHTML = '<i class="fas fa-save"></i> Save Story';
    }
});

// Add subtle animations to elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.feature-card, .creation-container').forEach(el => {
    observer.observe(el);
});