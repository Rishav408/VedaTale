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
        
        // Form submission
        document.getElementById('storyForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const inspiration = document.getElementById('inspiration').value;
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
            
            // Simulate API call to Gemma AI
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                alert('Your story has been generated! In a real implementation, this would display the story from the Gemma AI API.');
            }, 2000);
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