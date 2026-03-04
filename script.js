document.addEventListener('DOMContentLoaded', () => {

    // 0. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                history.pushState(null, null, targetId);

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const navActions = document.querySelector('.nav-actions');
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    navActions.style.display = 'none';
                }
            }
        });
    });

    // 1. Scrolled Navbar Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // 3. Mouse Hover Glow Effect on Bento Cards and Pricing Cards
    const glowCards = document.querySelectorAll('.glow-effect');

    glowCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        // reset on leave is optional, but adds a nice fade out if implemented in css
    });


    // 4. Pricing Toggle Logic
    const toggleBtn = document.getElementById('toggle-billing');
    const amounts = document.querySelectorAll('.price .amount');

    if (toggleBtn) {
        let isYearly = false;

        toggleBtn.addEventListener('click', () => {
            isYearly = !isYearly;

            // Toggle classes
            if (isYearly) {
                toggleBtn.classList.add('active');
                toggleBtn.previousElementSibling.classList.remove('active');
                toggleBtn.nextElementSibling.classList.add('active');
            } else {
                toggleBtn.classList.remove('active');
                toggleBtn.previousElementSibling.classList.add('active');
                toggleBtn.nextElementSibling.classList.remove('active');
            }

            // Animate number change
            amounts.forEach(amount => {
                amount.style.opacity = '0';

                setTimeout(() => {
                    if (amount.hasAttribute('data-monthly') && amount.hasAttribute('data-yearly')) {
                        if (isYearly) {
                            amount.textContent = amount.getAttribute('data-yearly');
                        } else {
                            amount.textContent = amount.getAttribute('data-monthly');
                        }
                    }
                    amount.style.opacity = '1';
                    amount.style.transition = 'opacity 0.3s ease';
                }, 150);
            });
        });
    }

    // 5. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // A simple toggle logic, in real life we could animate this properly
            // Since this is a pure CSS/JS solution without complex frameworks
            const isFlex = window.getComputedStyle(navLinks).display !== 'none';
            if (isFlex) {
                navLinks.style.display = 'none';
                navActions.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 7, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

                navActions.style.display = 'flex';
                navActions.style.flexDirection = 'column';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + ' + navLinks.offsetHeight + 'px)';
                navActions.style.left = '0';
                navActions.style.width = '100%';
                navActions.style.background = 'rgba(5, 5, 7, 0.95)';
                navActions.style.padding = '2rem';
            }
        });
    }
});
