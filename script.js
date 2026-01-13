// Minimal JavaScript - No complex animations
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
    initAccordion();
    initAttributionFlow();
    initCampaignTimeline();
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

// Toggle Read More for service descriptions on mobile
function toggleReadMore(button) {
    const description = button.previousElementSibling;
    const isExpanded = description.classList.contains('expanded');
    
    if (isExpanded) {
        description.classList.remove('expanded');
        button.textContent = 'Read more';
    } else {
        description.classList.add('expanded');
        button.textContent = 'Read less';
    }
}

// Accordion functionality - disabled on mobile (content always visible)
function initAccordion() {
    // No accordion behavior needed - all content is visible by default
    return;
}

// Attribution Flow - Mobile touch interactions
function initAttributionFlow() {
    const stageCards = document.querySelectorAll('.attribution-flow .stage-card');
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        stageCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Close other tooltips
                document.querySelectorAll('.stage-tooltip.mobile-visible').forEach(tooltip => {
                    if (tooltip !== this.querySelector('.stage-tooltip')) {
                        tooltip.classList.remove('mobile-visible');
                    }
                });
                
                // Toggle current tooltip
                const tooltip = this.querySelector('.stage-tooltip');
                if (tooltip) {
                    tooltip.classList.toggle('mobile-visible');
                }
            });
        });
        
        // Close tooltip when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.stage-card')) {
                document.querySelectorAll('.stage-tooltip.mobile-visible').forEach(tooltip => {
                    tooltip.classList.remove('mobile-visible');
                });
            }
        });
    }
    
    // Scroll animation for attribution flow
    const flowSection = document.querySelector('.attribution-flow');
    if (flowSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stages = entry.target.querySelectorAll('.flow-stage');
                    stages.forEach((stage, index) => {
                        setTimeout(() => {
                            stage.style.opacity = '1';
                            stage.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Set initial state for animation
        const stages = flowSection.querySelectorAll('.flow-stage');
        stages.forEach(stage => {
            stage.style.opacity = '0';
            stage.style.transform = 'translateY(20px)';
            stage.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        });
        
        observer.observe(flowSection);
    }
}

// Campaign Timeline - Scroll animations
function initCampaignTimeline() {
    const timelineSection = document.querySelector('.campaign-timeline');
    
    if (timelineSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const weeks = entry.target.querySelectorAll('.timeline-week');
                    weeks.forEach((week, index) => {
                        setTimeout(() => {
                            week.style.opacity = '1';
                            week.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Set initial state for animation
        const weeks = timelineSection.querySelectorAll('.timeline-week');
        weeks.forEach(week => {
            week.style.opacity = '0';
            week.style.transform = 'translateY(30px)';
            week.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        });
        
        observer.observe(timelineSection);
    }
    
    // Handle window resize for mobile interactions
    window.addEventListener('resize', () => {
        // Re-initialize on resize if needed
        const isMobile = window.innerWidth <= 767;
        document.querySelectorAll('.stage-tooltip.mobile-visible').forEach(tooltip => {
            if (!isMobile) {
                tooltip.classList.remove('mobile-visible');
            }
        });
    });
}