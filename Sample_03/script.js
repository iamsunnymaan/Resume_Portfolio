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
});