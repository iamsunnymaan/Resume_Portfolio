document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Typewriter Effect for Hero
    const name = "Sunny Maan";
    let i = 0;
    const target = document.getElementById("typewriter");

    function type() {
        if (i < name.length) {
            target.innerHTML += name.charAt(i);
            i++;
            setTimeout(type, 150);
        }
    }
    type();

    // 2. Intersection Observer for Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. Mouse Follow Background Glow
    const area = document.querySelector('.area');
    document.addEventListener('mousemove', (e) => {
        area.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(99, 102, 241, 0.1) 0%, #020617 60%)`;
    });

    // 4. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 90,
                behavior: 'smooth'
            });
        });
    });
});