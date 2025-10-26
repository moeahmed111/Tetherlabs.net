// Minimal JavaScript - No complex animations
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Simple smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Simple scroll
                const targetPosition = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll animations for service cards
function initScrollAnimations() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        const serviceCards = document.querySelectorAll('.service-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        serviceCards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Counter Animation for Campaign Results with Scroll Effects
function initCounterAnimations() {
    const counters = document.querySelectorAll('.metric-number');
    const linkedinGraphic = document.querySelector('.linkedin-icon-graphic');
    const influenceFlow = document.querySelector('.influence-flow');
    
    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = target < 10 ? current.toFixed(1) : Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target < 10 ? target.toFixed(1) : target;
                counter.classList.add('animate');
            }
        };
        
        updateCounter();
    };
    
    // Enhanced scroll-triggered animations
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate counters
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    
                    // Add scroll-based animations
                    if (linkedinGraphic) {
                        linkedinGraphic.style.animation = 'float 6s ease-in-out infinite, scroll-pulse 8s ease-in-out infinite';
                    }
                    
                    if (influenceFlow) {
                        influenceFlow.style.animation = 'pulse-flow 4s ease-in-out infinite, scroll-glow 6s ease-in-out infinite';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(heroSection);
    }
    
    // Add scroll-based movement to metrics
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const metricsDisplay = document.querySelector('.metrics-display');
        
        if (metricsDisplay && scrollY < 500) {
            const moveAmount = scrollY * 0.1;
            metricsDisplay.style.transform = `translateY(${moveAmount}px)`;
        }
    });
}