// Get theme and font elements from HTML
const themeBtn = document.getElementById('theme-btn');
const fontSelect = document.getElementById('font-select');

// Load saved preferences
const savedTheme = localStorage.getItem('theme') || 'light';
const savedFont = localStorage.getItem('font') || 'Inter';

document.documentElement.setAttribute('data-theme', savedTheme);
// Set both the CSS variable and direct style
if (savedFont) {
    document.documentElement.style.setProperty('--font-family', savedFont);
    document.body.style.fontFamily = savedFont;
}

// Theme toggle functionality
themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    themeBtn.innerHTML = `
        <i class="${newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}"></i>
    `;
});

// Font selection functionality
fontSelect.addEventListener('change', (e) => {
    const selectedFont = e.target.value;
    // Apply the font to all elements
    document.body.style.fontFamily = selectedFont;
    // Save to localStorage
    localStorage.setItem('font', selectedFont);
});

// Initialize AOS
AOS.init({
    duration: 800,
    offset: 100,
    once: true
});

// Add AOS initialization to window load event
window.addEventListener('load', () => {
    AOS.init();
});

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');

mobileNavToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        mobileNav.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Update active navigation link
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Update logo color based on theme
const updateLogoColor = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        logo.style.color = '#ff5722';
    } else {
        logo.style.color = '#ff5722';
    }
};

// Initial logo color
updateLogoColor();

// Update logo color when theme changes
themeBtn.addEventListener('click', updateLogoColor);

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            // Here you would typically send the form data to your backend
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Clear the form
            contactForm.reset();
            
            // Remove the success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        }
    });
}

// Add animation on scroll for all sections
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('aos-animate');
        }
    });
};

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Skills animation
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-5px)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0)';
    });
});

// Project card hover effects
const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        const img = image.querySelector('img');
        img.style.transform = 'scale(1.05)';
    });
    
    image.addEventListener('mouseleave', () => {
        const img = image.querySelector('img');
        img.style.transform = 'scale(1)';
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
});

// Add copy to clipboard functionality for email
const emailLink = document.querySelector('.contact-item a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.href.split(':')[1];
        navigator.clipboard.writeText(email);
        alert('Email address copied to clipboard!');
    });
}
