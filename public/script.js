// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    let theme = document.body.getAttribute('data-theme');
    if (theme === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    let isMenuOpen = false;

    // Function to open menu
    function openMenu() {
        isMenuOpen = true;
        burgerMenu.classList.add('active');
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Function to close menu
    function closeMenu() {
        isMenuOpen = false;
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Burger menu click handler
    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        isMenuOpen ? closeMenu() : openMenu();
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(section => {
        navObserver.observe(section);
    });
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
@keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
`;
document.head.appendChild(style);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Animations
const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, observerOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form with loading state
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Add loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', formData);
    
    // Remove loading state
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    
    // Clear form
    contactForm.reset();
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message fade-in visible';
    successMessage.textContent = 'Message sent successfully!';
    contactForm.appendChild(successMessage);
    
    // Remove success message after 3 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}); 