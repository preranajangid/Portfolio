// Main JavaScript file for Prerana Jangid Portfolio

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initSmoothScrolling();
    initNavbarEffects();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initTypingEffect();
    initParticleBackground();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    if (!themeToggle || !themeIcon) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if targetId is just '#' or empty
            if (!targetId || targetId === '#' || targetId.length <= 1) {
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLinkOnScroll();
    });
    
    // Highlight current section in navigation
    function updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionIdAttr = section.getAttribute('id');
            
            // Skip if section doesn't have a valid ID
            if (!sectionIdAttr || sectionIdAttr.trim() === '') {
                return;
            }
            
            const sectionId = '#' + sectionIdAttr;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink(sectionId);
            }
        });
    }
}

function updateActiveNavLink(targetId) {
    // Validate targetId before proceeding
    if (!targetId || targetId === '#' || targetId.trim() === '') {
        return;
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add stagger effect for multiple elements
                const delay = Array.from(animatedElements).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = delay + 'ms';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Skill Bar Animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset width and animate
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 500);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalBtnText = submitBtn.innerHTML;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!contactForm.checkValidity()) {
            e.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }
        
        // Simulate form submission
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Create mailto link with form data
        const mailtoLink = `mailto:jangidprerana790@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        
        // Enhanced email client opening with multiple fallbacks
        try {
            // Method 1: Direct window location (most reliable)
            window.location.href = mailtoLink;
            
            // Method 2: Fallback for web-based email clients
            setTimeout(() => {
                // If still on page after 1 second, try window.open
                if (document.hasFocus()) {
                    window.open(mailtoLink, '_blank', 'noopener,noreferrer');
                }
            }, 1000);
            
            // Method 3: Create temporary link as final fallback
            setTimeout(() => {
                if (document.hasFocus()) {
                    const tempLink = document.createElement('a');
                    tempLink.href = mailtoLink;
                    tempLink.target = '_blank';
                    tempLink.rel = 'noopener noreferrer';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                }
            }, 2000);
            
        } catch (error) {
            console.error('Email client opening failed:', error);
            // Ultimate fallback: show email details
            showNotification(`Please email directly to: jangidprerana790@gmail.com`, 'warning');
        }
        
        // Provide user feedback
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-envelope me-2"></i>Email Client Opened';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');
            
            showNotification('Email client should open shortly. If not, please copy: jangidprerana790@gmail.com', 'success');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
            }, 4000);
            
        }, 500);
    });
    
    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const isValid = field.checkValidity();
    
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const typewriterElement = document.querySelector('#typing-text');
    if (!typewriterElement) return;
    
    const texts = [
        'Computer Engineer & AI/ML Enthusiast',
        'Python, C, C++, SQL & Excel Expert',
        'Data Visualization Specialist',
        'Freelance Developer & Problem Solver',
        'AI in Project Management Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeEffect();
                }, pauseTime);
                return;
            }
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(typeEffect, speed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
}

// Particle Background Effect
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('home');
    
    // Insert canvas
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    heroSection.appendChild(canvas);
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb';
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(37, 99, 235, ${0.2 - distance / 500})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations or effects here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://pixabay.com/get/g1f7f2152e45a4917ece45abe0b9cc8d7fb45f2acd4cb8d3205e7ec1b0878daa645859e5b72003297b3fd7ec352cd5a8cc782c70dec20f328906542335c903a3b_1280.jpg',
        'https://pixabay.com/get/gf548d322ecd8b7ed3f386af32453e19d0a1f1128a28bdfd5014fe15b464c4cf029dcfd6b63f595e3cbbca3fa21362eb541f1ac5de18419ac9c0b43c072480761_1280.jpg',
        'https://pixabay.com/get/g35fa60ca0e68cf5b1992b6acfe141219c0341fa06750a415c27c2ce2f78e7906804fafee4d79311aa5c037541856082764dbebafad76d39e772ff182bc2699ad_1280.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add loading states for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Hide any loading spinners or overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23374151">Image not available</text></svg>';
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const modal = bootstrap.Modal.getInstance(openModal);
            modal.hide();
        }
    }
    
    // Arrow keys for section navigation
    if (e.altKey) {
        const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            const nextSectionId = sections[currentIndex + 1];
            if (nextSectionId && nextSectionId.trim() !== '') {
                const nextSection = document.querySelector(`#${nextSectionId}`);
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            const prevSectionId = sections[currentIndex - 1];
            if (prevSectionId && prevSectionId.trim() !== '') {
                const prevSection = document.querySelector(`#${prevSectionId}`);
                if (prevSection) {
                    prevSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            return section.getAttribute('id');
        }
    }
    
    return 'home';
}

// Enhanced email handling function
function handleEmailClick(event, email) {
    // Track analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'email_click', {
            'email_address': email,
            'source': 'portfolio_website'
        });
    }
    
    // Show user feedback
    showNotification('Opening email client...', 'info');
    
    // For mobile devices, add a small delay to ensure the notification shows
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        setTimeout(() => {
            // Additional fallback for mobile email apps
            const mailtoUrl = event.target.closest('a').href;
            try {
                window.open(mailtoUrl, '_self');
            } catch (error) {
                window.location.href = mailtoUrl;
            }
        }, 300);
        event.preventDefault();
        return false;
    }
    
    // Let the default mailto action proceed for desktop
    return true;
}

// Copy email to clipboard function
function copyEmailToClipboard() {
    const email = 'jangidprerana790@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email address copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(email);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(email);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Email address copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy email. Please select manually: ' + text, 'warning');
    }
    
    document.body.removeChild(textArea);
}

// Console easter egg
console.log(`
    ╔══════════════════════════════════════╗
    ║          Prerana Jangid              ║
    ║        Computer Engineer             ║
    ║         & AI/ML Enthusiast          ║
    ║                                      ║
    ║  Thanks for checking out my code!    ║
    ║  Let's connect and build something   ║
    ║         amazing together!            ║
    ╚══════════════════════════════════════╝
`);
