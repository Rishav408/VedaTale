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
        
        // Form submission
        document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success message
                alert('Your message has been sent! Our team will get back to you soon.');
                this.reset();
            }, 2000);
        });