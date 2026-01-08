document.addEventListener('DOMContentLoaded', () => {
    // --- Matrix Rain Effect ---
    // --- Matrix Rain Effect (Disabled) ---
    /*
    const canvas = document.getElementById('matrix');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        // Effect initialization and loop removed due to user request
        // To restore: uncomment logic and setInterval
    }
    */


    // --- Typewriter Effect ---
    const text = "System.out.print('Hello, World!'); // ...just kidding. I break things to make them stronger.";
    const bioElement = document.getElementById('bio-text');
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            bioElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing when about section is in view or if it's already visible
    // Simple check: if about section exists
    const aboutSection = document.getElementById('about');
    if (aboutSection && bioElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (bioElement.innerHTML === '') {
                        typeWriter();
                    }
                }
            });
        });
        observer.observe(aboutSection);
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Glitch Effect on Hover for Logo ---
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.style.textShadow = '2px 0 red, -2px 0 blue';
        });

        logo.addEventListener('mouseout', () => {
            logo.style.textShadow = 'none';
        });
    }
});
