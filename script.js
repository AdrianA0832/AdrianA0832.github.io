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

    // --- AJAX Contact Form ---
    const contactForm = document.querySelector('.terminal-form');
    // Ensure we are targeting the form inside the contact section
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default redirection

            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Disable button during transmission
            submitBtn.disabled = true;
            submitBtn.innerText = "TRANSMITTING...";

            // Fade out inputs to indicate disabled state
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.disabled = true;
                input.style.opacity = '0.5';
                input.style.cursor = 'not-allowed';
            });

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        // Success: Hide form, show feedback
                        contactForm.style.display = 'none';
                        const feedback = document.getElementById('feedback');
                        if (feedback) {
                            feedback.style.display = 'block';
                        }
                    } else {
                        // Error state
                        throw new Error('Network response was not ok');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    submitBtn.innerText = "TRANSMISSION FAILED. RETRY?";
                    submitBtn.disabled = false;
                    alert("Error connecting to secure channel. Please try again.");
                });
        });
    }
});
