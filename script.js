// Minimal JavaScript - No complex animations
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimations();
    initAccordion();
    initIntelligenceFlow();
    initStickyProgressLine();
});

// Sticky progress line for How We Drive Results (mobile)
function initStickyProgressLine() {
    const section = document.querySelector('.process-timeline-section');
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('in-view');
            } else {
                section.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });
    
    observer.observe(section);
}

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

// Intelligence Flow - Scroll animations and tooltip interactions
function initIntelligenceFlow() {
    const flowSection = document.querySelector('.intelligence-flow-section');
    
    if (flowSection) {
        // Scroll animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate nodes
                    const nodes = entry.target.querySelectorAll('.flow-node');
                    nodes.forEach((node, index) => {
                        setTimeout(() => {
                            node.style.opacity = '1';
                            node.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    
                    // Animate highlight cards
                    const highlights = entry.target.querySelectorAll('.highlight-card, .highlight-item');
                    highlights.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 600 + index * 100);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Set initial state for nodes
        const nodes = flowSection.querySelectorAll('.flow-node');
        nodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'translateY(20px)';
            node.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        });
        
        // Set initial state for highlights
        const highlights = flowSection.querySelectorAll('.highlight-card, .highlight-item');
        highlights.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
            item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        });
        
        observer.observe(flowSection);
        
        // Mobile tooltip interactions
        const isMobile = () => window.innerWidth <= 768;
        
        nodes.forEach(node => {
            const circle = node.querySelector('.node-circle');
            
            // Touch/click handler for mobile
            circle.addEventListener('click', function(e) {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close all other tooltips
                    nodes.forEach(n => {
                        if (n !== node) {
                            n.classList.remove('tooltip-active');
                        }
                    });
                    
                    // Toggle current tooltip
                    node.classList.toggle('tooltip-active');
                }
            });
            
            // Keyboard accessibility
            circle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    node.classList.toggle('tooltip-active');
                }
                if (e.key === 'Escape') {
                    node.classList.remove('tooltip-active');
                }
            });
        });
        
        // Close tooltips when clicking outside
        document.addEventListener('click', function(e) {
            if (isMobile() && !e.target.closest('.flow-node')) {
                nodes.forEach(node => {
                    node.classList.remove('tooltip-active');
                });
            }
        });
        
        // Handle resize
        window.addEventListener('resize', function() {
            if (!isMobile()) {
                nodes.forEach(node => {
                    node.classList.remove('tooltip-active');
                });
            }
        });
    }
}