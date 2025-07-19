document.addEventListener('DOMContentLoaded', function() {
    // Question card click navigation
    const questionCards = document.querySelectorAll('.question-card');
    
    questionCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                // For now, we'll create the page dynamically
                // In a real implementation, you'd navigate to separate HTML files
                window.location.href = `${targetPage}.html`;
            }
        });
    });

    // Card hover effects
    questionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Image error handling
    const heroImage = document.querySelector('.hero-image');
    const placeholder = document.querySelector('.image-placeholder.hero-image');
    
    if (heroImage) {
        heroImage.onerror = function() {
            this.style.display = 'none';
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        };
    }

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe question cards for animation
    questionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add animation delays for staggered effect
    questionCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
});

// Utility function for responsive design
function isMobile() {
    return window.innerWidth <= 768;
}

// Handle resize events
window.addEventListener('resize', function() {
    // Adjust layouts for mobile if needed
    if (isMobile()) {
        // Mobile-specific adjustments
        const questionCards = document.querySelectorAll('.question-card');
        questionCards.forEach(card => {
            card.style.cursor = 'pointer';
        });
    }
});