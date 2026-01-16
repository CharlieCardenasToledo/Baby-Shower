// ==========================================
// ANIMATIONS & INTERACTIONS
// ==========================================

(function () {
    'use strict';

    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('.animate-on-scroll');
        sections.forEach(section => observer.observe(section));
    });

    // ==========================================
    // PARALLAX EFFECT
    // ==========================================

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ==========================================
    // SCROLL PROGRESS BAR
    // ==========================================

    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // ==========================================
    // COUNTDOWN TIMER
    // ==========================================

    function updateCountdown() {
        const eventDate = new Date('2026-01-31T15:00:00-05:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('countdown')?.classList.add('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        updateCountdownDisplay('days', days);
        updateCountdownDisplay('hours', hours);
        updateCountdownDisplay('minutes', minutes);
        updateCountdownDisplay('seconds', seconds);
    }

    function updateCountdownDisplay(unit, value) {
        const element = document.getElementById(unit);
        if (element && element.textContent !== value.toString()) {
            element.classList.add('flip');
            setTimeout(() => {
                element.textContent = value.toString().padStart(2, '0');
                element.classList.remove('flip');
            }, 300);
        } else if (element) {
            element.textContent = value.toString().padStart(2, '0');
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ==========================================
    // FLOATING PARTICLES
    // ==========================================

    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = window.innerWidth < 768 ? 20 : 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ==========================================
    // CONFETTI CELEBRATION
    // ==========================================

    function createConfetti() {
        const colors = ['#f4ab25', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'];
        const confettiCount = 50;
        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
            container.appendChild(confetti);
        }

        setTimeout(() => {
            container.remove();
        }, 6000);
    }

    // ==========================================
    // RIPPLE EFFECT
    // ==========================================

    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    // Add ripple effect to buttons
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.btn-rsvp, .btn-submit, .btn-cancel');
        buttons.forEach(button => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.addEventListener('click', createRipple);
        });
    });

    // ==========================================
    // BREATHING ANIMATION FOR STAR
    // ==========================================

    document.addEventListener('DOMContentLoaded', () => {
        const starIcon = document.querySelector('.hero-icon');
        if (starIcon) {
            starIcon.classList.add('breathing');
        }
    });

    // ==========================================
    // INITIALIZE
    // ==========================================

    window.addEventListener('DOMContentLoaded', () => {
        createParticles();
        console.log('🎨 Animations loaded');
    });

    // Export confetti function for use in app.js
    window.triggerConfetti = createConfetti;

})();
