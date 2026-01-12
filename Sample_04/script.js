document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // CUSTOM CURSOR
    // ========================================
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    });
    
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // ========================================
    // PARTICLES ANIMATION
    // ========================================
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particles.appendChild(particle);
    }
    
    // ========================================
    // NAVIGATION
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // ========================================
    // ROTATING TEXT
    // ========================================
    const rotateWords = document.querySelectorAll('.rotate-word');
    let currentWordIndex = 0;
    
    function rotateText() {
        rotateWords[currentWordIndex].classList.remove('active');
        currentWordIndex = (currentWordIndex + 1) % rotateWords.length;
        rotateWords[currentWordIndex].classList.add('active');
    }
    
    if (rotateWords.length > 0) {
        rotateWords[0].classList.add('active');
        setInterval(rotateText, 3000);
    }
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.style.getPropertyValue('--progress');
                    bar.style.width = progress;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const progressBars = category.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            bar.style.width = '0';
        });
        skillObserver.observe(category);
    });
    
    // ========================================
    // TYPING EFFECT FOR NAME
    // ========================================
    const nameElement = document.getElementById('name-text');
    if (nameElement) {
        const originalText = nameElement.textContent;
        nameElement.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                nameElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // ========================================
    // CONTACT FORM
    // ========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (data.name && data.email && data.message) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // ========================================
    // SMOOTH SCROLL INDICATOR
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
    
    // ========================================
    // PARALLAX EFFECT
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxElements = document.querySelectorAll('.profile-card, .floating-badges');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // ========================================
    // HEADER BACKGROUND ON SCROLL
    // ========================================
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 15, 30, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 15, 30, 0.8)';
            header.style.boxShadow = 'none';
        }
    });
    
    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
    console.log('%cWelcome to my portfolio. Feel free to explore the code!', 'font-size: 14px; color: #9ca3af;');
    console.log('%c🚀 Built with HTML, CSS, and Vanilla JavaScript', 'font-size: 12px; color: #8b5cf6;');
    
});