document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .card').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });

    // Logo hover glow effect tracking mouse
    const logo = document.querySelector('.logo-icon');
    if (logo) {
        document.addEventListener('mousemove', (e) => {
            const rect = logo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            logo.style.setProperty('--x', `${x}px`);
            logo.style.setProperty('--y', `${y}px`);
        });
    }
});
