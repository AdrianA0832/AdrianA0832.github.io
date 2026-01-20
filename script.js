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


    // --- Scroll Reveal Effect ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Trigger once only
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% visible
        });

        revealElements.forEach(el => revealObserver.observe(el));
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


    // --- Domain Security Check ---
    const allowedDomains = ['localhost', '127.0.0.1', 'adrianinfosec.me', 'adriananthony0832.github.io'];
    const currentDomain = window.location.hostname;

    // Check if we are on an allowed domain
    // Simple check: if hostname is not in allowed list (and not empty for file://)
    if (currentDomain && !allowedDomains.includes(currentDomain)) {
        console.warn('Security Alert: Unauthorized Domain Access detected.');
    }
    // --- how_i_work Interaction (Mobile/Click support) ---
    const workTrigger = document.querySelector('.work-trigger');
    if (workTrigger) {
        workTrigger.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent click from bubbling to document immediately
            this.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!workTrigger.contains(e.target)) {
                workTrigger.classList.remove('active');
            }
        });
    }

    const contactForm = document.querySelector('.terminal-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent native redirect

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            // Use fetch to post to FormSubmit
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    // Hiding form and showing feedback regardless of strict 200 to ensure UX flow
                    contactForm.style.display = 'none';
                    const feedback = document.getElementById('feedback');
                    if (feedback) {
                        feedback.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Transmission failed:', error);
                    submitBtn.innerText = 'TRANSMISSION FAILED - RETRY';
                    submitBtn.disabled = false;
                });
        });
    }
});
