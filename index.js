// Navigation Indicator
const navLinks = document.querySelectorAll('.nav-link');
const indicator = document.querySelector('.nav-indicator');

function updateIndicator(link) {
    const rect = link.getBoundingClientRect();
    const navRect = document.querySelector('.nav-content').getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - navRect.left}px`;
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        updateIndicator(link);
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === sectionId);
                if (link.classList.contains('active')) updateIndicator(link);
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
    themeIndicator.style.background = theme === 'dark' ? '#00ff88' : theme === 'light' ? '#22d3ee' : '#f97316';
    themeIndicator.style.boxShadow = `0 0 15px ${theme === 'dark' ? '#00ff88' : theme === 'light' ? '#22d3ee' : '#f97316'}`;
    setTimeout(() => {
        themeIndicator.classList.remove('active');
    }, 1500);
}

themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'default' ? 'light' : currentTheme === 'light' ? 'dark' : 'default';
    document.body.setAttribute('data-theme', currentTheme);
    showThemeIndicator(currentTheme);
    updateParticleColors();
    updateCodeColors();
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

document.querySelectorAll('.reveal-text, .exp-card, .skill-item, .project-card').forEach(el => {
    revealObserver.observe(el);
});

document.querySelectorAll('.skill-gauge').forEach(gauge => {
    revealObserver.observe(gauge);
});

// Certificate Dialer
const certItems = document.querySelectorAll('.cert-item');
const certDisplay = document.getElementById('cert-display');
let activeCert = null;
let rotationAngle = 0;

// Initialize certificate positions with angles
certItems.forEach((item, index) => {
    const angle = (index * 90) - 90; // Evenly distribute around the circle (0°, 90°, 180°, 270°)
    item.style.setProperty('--angle', `${angle}deg`);
    item.dataset.angle = angle;
    item.style.transform = `rotate(${angle}deg) translateY(-180px)`;
    item.style.opacity = '0.7'; // Initial visibility for orbiting
});

// Handle hover and click events
certItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        if (!activeCert) {
            const certType = item.dataset.cert;
            let content = '';
            switch (certType) {
                case 'responsive':
                    content = `<img src="https://i.imgur.com/Y7n0L6l.png" alt="Responsive Web Design Certificate"><p>Responsive Web Design - FreeCodeCamp (July 30, 2024, ~300 hours)</p>`;
                    break;
                case 'front-end':
                    content = `<img src="https://i.imgur.com/3sGqZ5U.png" alt="Front End Development Libraries Certificate"><p>Front End Development Libraries - FreeCodeCamp (September 27, 2024, ~300 hours)</p>`;
                    break;
                case 'javascript':
                    content = `<img src="https://i.imgur.com/3jL2v2I.png" alt="JavaScript Algorithms and Data Structures Certificate"><p>JavaScript Algorithms and Data Structures (Beta) - FreeCodeCamp (July 9, 2024, ~300 hours)</p>`;
                    break;
                case 'quality':
                    content = `<p>Quality Experience - FreeCodeCamp (Duration TBD, ~ hours)</p>`;
                    break;
            }
            certDisplay.innerHTML = content;
            certDisplay.classList.add('active');
            item.classList.add('active');
            activeCert = item;
            const angle = parseFloat(item.dataset.angle) || 0;
            certItems.forEach(i => {
                i.style.transform = `rotate(${angle}deg) translateY(-180px)`;
                i.style.opacity = i === item ? '1' : '0.3';
            });
        }
    });

    item.addEventListener('mouseout', () => {
        if (activeCert !== item) {
            certDisplay.classList.remove('active');
            item.classList.remove('active');
            certItems.forEach(i => {
                const angle = parseFloat(i.dataset.angle) || 0;
                i.style.transform = `rotate(${angle}deg) translateY(-180px)`;
                i.style.opacity = '0.7';
            });
        }
    });

    item.addEventListener('click', () => {
        if (activeCert === item) {
            certDisplay.classList.remove('active');
            item.classList.remove('active');
            activeCert = null;
            certItems.forEach(i => {
                const angle = parseFloat(i.dataset.angle) || 0;
                i.style.transform = `rotate(${angle}deg) translateY(-180px)`;
                i.style.opacity = '0.7';
            });
        } else {
            certItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            activeCert = item;
            const certType = item.dataset.cert;
            let content = '';
            switch (certType) {
                case 'responsive':
                    content = `<img src="https://i.imgur.com/Y7n0L6l.png" alt="Responsive Web Design Certificate"><p>Responsive Web Design - FreeCodeCamp (July 30, 2024, ~300 hours)</p>`;
                    break;
                case 'front-end':
                    content = `<img src="https://i.imgur.com/3sGqZ5U.png" alt="Front End Development Libraries Certificate"><p>Front End Development Libraries - FreeCodeCamp (September 27, 2024, ~300 hours)</p>`;
                    break;
                case 'javascript':
                    content = `<img src="https://i.imgur.com/3jL2v2I.png" alt="JavaScript Algorithms and Data Structures Certificate"><p>JavaScript Algorithms and Data Structures (Beta) - FreeCodeCamp (July 9, 2024, ~300 hours)</p>`;
                    break;
                case 'quality':
                    content = `<p>Quality Experience - FreeCodeCamp (Duration TBD, ~ hours)</p>`;
                    break;
            }
            certDisplay.innerHTML = content;
            certDisplay.classList.add('active');
            const angle = parseFloat(item.dataset.angle) || 0;
            certItems.forEach(i => {
                i.style.transform = `rotate(${angle}deg) translateY(-180px)`;
                i.style.opacity = i === item ? '1' : '0.3';
            });
        }
    });

    // Auto-rotate certificates every 5 seconds
    setInterval(() => {
        if (!activeCert) {
            rotationAngle += 5;
            certItems.forEach(item => {
                const baseAngle = parseFloat(item.dataset.angle) || 0;
                item.style.transform = `rotate(${baseAngle + rotationAngle}deg) translateY(-180px)`;
            });
        }
    }, 50); // Faster rotation for smoother effect
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
        }, 2000);
    }, 1000);
});

// Particle Background (Full Page)
const particleCanvas = document.getElementById('particle-canvas');
const particleCtx = particleCanvas.getContext('2d');
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 200; i++) {
    particles.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        radius: Math.random() * 4 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 50%)` // Default: Cyan-orange
    });
}

function updateParticleColors() {
    const theme = document.body.getAttribute('data-theme');
    particles.forEach(p => {
        if (theme === 'light') {
            p.color = `hsl(${Math.random() * 60 + 20}, 100%, 50%)`; // Light: Orange-yellow
        } else if (theme === 'dark') {
            p.color = `hsl(${Math.random() * 60 + 120}, 100%, 50%)`; // Dark: Green-purple
        } else {
            p.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`; // Default: Cyan-orange
        }
    });
}

function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > particleCanvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > particleCanvas.height) p.speedY *= -1;

        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        particleCtx.fillStyle = p.color;
        particleCtx.fill();

        for (let j = 0; j < particles.length; j++) {
            const dx = p.x - particles[j].x;
            const dy = p.y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                particleCtx.beginPath();
                particleCtx.moveTo(p.x, p.y);
                particleCtx.lineTo(particles[j].x, particles[j].y);
                particleCtx.strokeStyle = `rgba(${theme === 'dark' ? '0, 255, 136' : theme === 'light' ? '249, 115, 22' : '249, 115, 22'}, ${1 - distance / 120})`;
                particleCtx.stroke();
            }
        }
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();
updateParticleColors();
window.addEventListener('resize', () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
});

// Code Background (Moving Code Elements)
const codeCanvas = document.getElementById('code-canvas');
const codeCtx = codeCanvas.getContext('2d');
codeCanvas.width = window.innerWidth;
codeCanvas.height = window.innerHeight;

const codeLines = [];
const characters = '01<>!@#$%^&*()_+-=[]{}|;:,./?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
for (let i = 0; i < 50; i++) {
    codeLines.push({
        x: Math.random() * codeCanvas.width,
        y: Math.random() * codeCanvas.height,
        speed: Math.random() * 2 + 1,
        length: Math.floor(Math.random() * 10) + 5,
        text: generateCodeLine()
    });
}

function generateCodeLine() {
    let line = '';
    for (let i = 0; i < Math.floor(Math.random() * 20) + 10; i++) {
        line += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return line;
}

function updateCodeColors() {
    const theme = document.body.getAttribute('data-theme');
    const color = theme === 'light' ? 'rgba(249, 115, 22, 0.8)' : theme === 'dark' ? 'rgba(0, 255, 136, 0.8)' : 'rgba(34, 211, 238, 0.8)';
    codeCtx.fillStyle = color;
}

function animateCode() {
    codeCtx.clearRect(0, 0, codeCanvas.width, codeCanvas.height);
    codeLines.forEach(line => {
        line.y += line.speed;
        if (line.y > codeCanvas.height) {
            line.y = -50;
            line.x = Math.random() * codeCanvas.width;
            line.text = generateCodeLine();
        }

        codeCtx.fillStyle = codeCtx.fillStyle; // Use the updated color
        codeCtx.font = '12px monospace';
        codeCtx.fillText(line.text, line.x, line.y);
    });
    requestAnimationFrame(animateCode);
}

animateCode();
updateCodeColors();
themeBtn.addEventListener('click', updateCodeColors);
window.addEventListener('resize', () => {
    codeCanvas.width = window.innerWidth;
    codeCanvas.height = window.innerHeight;
});

// Dynamic CSS for Animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .reveal-text, .exp-card, .skill-item, .project-card {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal-text.visible, .exp-card.visible, .skill-item.visible, .project-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);