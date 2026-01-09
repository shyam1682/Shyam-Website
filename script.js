document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Reveal on Scroll (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 2. Advanced Parallax & Tilt for Hero ---
    const heroSection = document.getElementById('hero');
    const heroMask = document.getElementById('heroMask');
    const heroImg = heroMask.querySelector('img');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize coordinate (-1 to 1)
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            // Tilt the container
            heroMask.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;

            // Move the image INSIDE opposite to create depth
            heroImg.style.transform = `translate(${-x * 15}px, ${-y * 15}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroMask.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            heroImg.style.transform = `translate(0, 0)`;
        });
    }


    // --- 4. Simple Background Spotlight Tracking ---
    const spotlight = document.getElementById('mouseSpotlight');
    if (spotlight) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let spotX = mouseX;
        let spotY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            spotlight.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            spotlight.style.opacity = '1';
        });

        function animateSpotlight() {
            // Smooth interpolation (lerp)
            spotX += (mouseX - spotX) * 0.1;
            spotY += (mouseY - spotY) * 0.1;

            spotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(animateSpotlight);
        }
        animateSpotlight();
    }


    // --- 5. Contact Form Handler (Formspree Integration) ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // --- PASTE YOUR FORMSPREE KEY/ID HERE ---
            const FORMSPREE_ID = "xdaannde"; // Example: "xoqgjrqy"
            const endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;

            // Visual Feedback
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerText = 'Message Sent';
                    submitBtn.style.opacity = '1';
                    submitBtn.style.borderColor = '#4ade80'; /* Green success */
                    submitBtn.style.color = '#fff';

                    // Reset Form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                submitBtn.innerText = 'Error! Try Again';
                submitBtn.style.borderColor = '#ef4444'; /* Red error */
            } finally {
                // Reset Button after delay
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 4000);
            }
        });
    }

    // --- 6. Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const html = document.documentElement;

        themeToggle.addEventListener('click', () => {
            const isLight = html.getAttribute('data-theme') === 'light';

            if (isLight) {
                html.setAttribute('data-theme', 'dark');
                themeIcon.classList.replace('ion-md-sunny', 'ion-md-moon');
            } else {
                html.setAttribute('data-theme', 'light');
                themeIcon.classList.replace('ion-md-moon', 'ion-md-sunny');
            }
        });
    }

});
