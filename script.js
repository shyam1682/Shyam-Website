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
    const heroMask = document.getElementById('heroMask');
    const heroImg = heroMask ? heroMask.querySelector('img') : null;

    if (heroMask && heroImg) {
        heroMask.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = heroMask.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            // Enhanced rotation (corner dipping/elevation) - Mirroring Portfolio Archive intensity
            heroMask.style.transform = `perspective(2000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;

            // Subtle parallax for the image inside
            heroImg.style.transform = `scale(1.1) translate(${-x * 20}px, ${-y * 20}px)`;

            // Dynamic edge glow (opposite corner lighting)
            const glowX = -x * 25;
            const glowY = -y * 25;

            heroMask.style.boxShadow = `
                ${glowX}px ${glowY}px 30px rgba(100, 100, 255, 0.2), 
                inset ${-glowX}px ${-glowY}px 20px rgba(255, 255, 255, 0.15)
            `;
            heroMask.style.borderColor = `rgba(100, 100, 255, 0.3)`;
        });

        heroMask.addEventListener('mouseleave', () => {
            heroMask.style.transform = `perspective(2000px) rotateY(0deg) rotateX(0deg)`;
            heroImg.style.transform = `scale(1) translate(0, 0)`;
            heroMask.style.boxShadow = '';
            heroMask.style.borderColor = '';
        });
    }


    // --- 3. 3D Tilt for Portfolio Archive ---
    const portfolioCTA = document.getElementById('portfolio-cta');
    if (portfolioCTA) {
        portfolioCTA.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = portfolioCTA.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            // Enhanced rotation (corner dipping/elevation)
            portfolioCTA.style.transform = `perspective(2000px) rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;

            // Dynamic edge glow (opposite corner lighting)
            const glowX = -x * 25;
            const glowY = -y * 25;

            portfolioCTA.style.boxShadow = `
                ${glowX}px ${glowY}px 30px rgba(100, 100, 255, 0.2), 
                inset ${-glowX}px ${-glowY}px 20px rgba(255, 255, 255, 0.15)
            `;
            portfolioCTA.style.borderColor = `rgba(100, 100, 255, 0.3)`;
        });

        portfolioCTA.addEventListener('mouseleave', () => {
            portfolioCTA.style.transform = `perspective(2000px) rotateY(0deg) rotateX(0deg)`;
            portfolioCTA.style.boxShadow = '';
            portfolioCTA.style.borderColor = '';
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


    // --- 5. Portfolio Request Handler ---
    const requestBtn = document.getElementById('requestPortfolioBtn');
    if (requestBtn) {
        requestBtn.addEventListener('click', () => {
            const messageField = document.getElementById('message');
            const nameField = document.getElementById('name');
            if (messageField) {
                messageField.value = "Hi Shyam, I'd like to request access to your professional portfolio.";
            }
            if (nameField) {
                // Focus with a slight delay to allow smooth scroll to find its place
                setTimeout(() => {
                    nameField.focus();
                }, 600);
            }
        });
    }


    // --- 6. Contact Form Handler (Formspree Integration) ---
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

    // --- 6. Theme Toggle (Persistent) ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const html = document.documentElement;

        // Function to set theme
        const setTheme = (theme) => {
            html.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            if (theme === 'light') {
                themeIcon.classList.replace('ion-md-moon', 'ion-md-sunny');
            } else {
                themeIcon.classList.replace('ion-md-sunny', 'ion-md-moon');
            }
        };

        // Initialize theme: check localStorage, otherwise default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
    // --- 7. Dynamic Year Sync ---
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
