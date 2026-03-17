document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initSmoothScrolling();
    initMobileMenu();
    initFadeInSections();
    initCounterAnimations();
});

// ─── Navigation ────────────────────────────────────────────────────────────
function initNavigation() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

// ─── Smooth scrolling ──────────────────────────────────────────────────────
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();

            // Close mobile menu
            document.querySelector('.nav-menu')?.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');

            window.scrollTo({
                top: target.offsetTop - 76,
                behavior: 'smooth'
            });
        });
    });
}

// ─── Mobile menu ───────────────────────────────────────────────────────────
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ─── Scroll fade-in for every section ──────────────────────────────────────
function initFadeInSections() {
    const sections = document.querySelectorAll('.fade-in-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(s => observer.observe(s));
}

// ─── Count-up animation ────────────────────────────────────────────────────
//  Works for any element with data-target (integer) + data-suffix (string).
//  Optional data-from sets the starting value (default 0).
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const animateCounter = (el) => {
        const target   = parseFloat(el.getAttribute('data-target'));
        const from     = parseFloat(el.getAttribute('data-from') ?? '0');
        const suffix   = el.getAttribute('data-suffix') ?? '';
        const duration = 1800; // ms
        const startTime = performance.now();
        const isInt    = Number.isInteger(target) && Number.isInteger(from);

        const tick = (now) => {
            const elapsed  = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased    = 1 - Math.pow(1 - progress, 3);
            const current  = from + (target - from) * eased;

            el.textContent = (isInt ? Math.round(current) : current.toFixed(1)) + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target + suffix;
            }
        };

        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    counters.forEach(el => observer.observe(el));
}

// ─── Legacy helpers (kept for any existing calls) ──────────────────────────
function toggleReadMore(button) {
    const description = button.previousElementSibling;
    const expanded    = description.classList.toggle('expanded');
    button.textContent = expanded ? 'Read less' : 'Read more';
}

function toggleDeliverables(button) {
    const content = button.nextElementSibling;
    const open    = content.classList.toggle('open');
    button.classList.toggle('active', open);
}
