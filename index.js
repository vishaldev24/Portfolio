document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const heroText = document.querySelector(".hero-text");
    const darkModeToggle = document.querySelector(".dark-mode-toggle");
    const body = document.body;

    // Mobile menu toggle
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("open");
    });

    // Smooth scrolling
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const targetId = e.target.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth"
            });
            navLinks.classList.remove("active");
            menuToggle.classList.remove("open");
        });
    });

    // Hero section text animation
    setTimeout(() => {
        heroText.classList.add("fade-in");
    }, 500);

    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });

    // Scroll animations
    const elements = document.querySelectorAll(".fade-effect");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});
