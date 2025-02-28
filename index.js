// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active'); // Optional: Add animation class to hamburger
});

// Navigation Indicator
const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === sectionId);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section').forEach(section => observer.observe(section));

// Theme Toggle with Indicator
const themeBtn = document.getElementById('theme-btn');
const themeIndicator = document.getElementById('theme-indicator');
let currentTheme = 'default';

function showThemeIndicator(theme) {
    themeIndicator.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    themeIndicator.classList.add('active');
    themeIndicator.style.background = theme === 'dark' ? '#00ff88' : theme === 'light' ? '#40c4ff' : '#ff6b35';
    themeIndicator.style.boxShadow = `0 0 15px ${theme === 'dark' ? '#00ff88' : theme === 'light' ? '#40c4ff' : '#ff6b35'}`;
    setTimeout(() => {
        themeIndicator.classList.remove('active');
    }, 1000);
}

themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'default' ? 'light' : currentTheme === 'light' ? 'dark' : 'default';
    document.body.setAttribute('data-theme', currentTheme);
    showThemeIndicator(currentTheme);
});

// Scroll Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skill-gauge')) {
                entry.target.style.setProperty('--level', `${entry.target.dataset.level}%`);
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal-text, .exp-card, .skill-item, .project-card, .cert-card, .contact-grid').forEach(el => {
    revealObserver.observe(el);
});

document.querySelectorAll('.skill-gauge').forEach(gauge => {
    revealObserver.observe(gauge);
});

// Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Sent!';
        form.reset();
        setTimeout(() => {
            btn.textContent = 'Send';
            btn.disabled = false;
        }, 1500); // Reduced delay for Nike-like speed
    }, 1000);
});

// Dynamic CSS for Animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .reveal-text, .exp-card, .skill-item, .project-card, .cert-card, .contact-grid {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal-text.visible, .exp-card.visible, .skill-item.visible, .project-card.visible, .cert-card.visible, .contact-grid.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .hamburger.active {
            transform: rotate(90deg);
            color: var(--accent-primary);
        }
    </style>
`);