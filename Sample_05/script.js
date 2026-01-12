document.addEventListener('DOMContentLoaded', () => {

    // 1. Reveal Elements on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Typing Effect for Name in Home Section
    const nameSpan = document.querySelector('.hero-title span');
    if (nameSpan) {
        // Optional: Simple fade-in effect via JS if needed, 
        // though CSS handles the gradient text beautifully.
        nameSpan.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
            if (opacity >= 1) clearInterval(fadeIn);
            nameSpan.style.opacity = opacity;
            opacity += 0.05;
        }, 50);
    }

    // 4. Certificate Carousel
    const carousel = document.getElementById('certCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carousel) {
        // Clone certificates multiple times for seamless infinite scroll
        const cards = Array.from(carousel.querySelectorAll('.cert-card'));
        const cloneCount = 3; // Clone set multiple times
        
        for (let i = 0; i < cloneCount; i++) {
            cards.forEach(card => {
                const clone = card.cloneNode(true);
                carousel.appendChild(clone);
            });
        }

        let isPaused = false;
        const cardWidth = 300; // card width + gap

        // Pause animation on button hover
        [prevBtn, nextBtn].forEach(btn => {
            btn?.addEventListener('mouseenter', () => {
                carousel.style.animationPlayState = 'paused';
                isPaused = true;
            });
            btn?.addEventListener('mouseleave', () => {
                if (!carousel.matches(':hover')) {
                    carousel.style.animationPlayState = 'running';
                    isPaused = false;
                }
            });
        });

        // Next button - scroll right
        nextBtn?.addEventListener('click', () => {
            carousel.style.animation = 'none';
            const currentTransform = window.getComputedStyle(carousel).transform;
            let currentX = 0;
            
            if (currentTransform !== 'none') {
                const matrix = currentTransform.match(/matrix\(([^)]+)\)/);
                if (matrix) {
                    currentX = parseFloat(matrix[1].split(', ')[4]);
                }
            }

            const newX = currentX - cardWidth;
            carousel.style.transform = `translateX(${newX}px)`;
            carousel.style.transition = 'transform 0.5s ease';

            setTimeout(() => {
                carousel.style.transition = 'none';
                carousel.style.animation = 'scroll-left 40s linear infinite';
            }, 500);
        });

        // Previous button - scroll left
        prevBtn?.addEventListener('click', () => {
            carousel.style.animation = 'none';
            const currentTransform = window.getComputedStyle(carousel).transform;
            let currentX = 0;
            
            if (currentTransform !== 'none') {
                const matrix = currentTransform.match(/matrix\(([^)]+)\)/);
                if (matrix) {
                    currentX = parseFloat(matrix[1].split(', ')[4]);
                }
            }

            const newX = currentX + cardWidth;
            carousel.style.transform = `translateX(${newX}px)`;
            carousel.style.transition = 'transform 0.5s ease';

            setTimeout(() => {
                carousel.style.transition = 'none';
                carousel.style.animation = 'scroll-left 40s linear infinite';
            }, 500);
        });
    }
});