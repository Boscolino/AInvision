document.addEventListener('DOMContentLoaded', () => {
    // Create animated background particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {  // Check if element exists
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href'); // Get the href attribute (e.g., "#home")
            const targetElement = document.querySelector(targetId); // Select the target element

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // Scroll smoothly to the target element
                });
            }
        });
    });

    // Header Scroll Effect (Change style on scroll)
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Pixels to scroll before changing header style

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled'); // Add 'scrolled' class if scrolled past threshold
        } else {
            header.classList.remove('scrolled'); // Remove 'scrolled' class if not past threshold
        }
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in animation to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // CTA Button effects
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function (e) {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.width = ripple.style.height = Math.max(this.offsetWidth, this.offsetHeight) + 'px';
            ripple.style.left = (e.clientX - this.getBoundingClientRect().left - this.offsetWidth / 2) + 'px';
            ripple.style.top = (e.clientY - this.getBoundingClientRect().top - this.offsetHeight / 2) + 'px';
            ripple.style.transition = 'transform 0.5s, opacity 0.5s';
            this.appendChild(ripple);
            setTimeout(() => {
                ripple.style.transform = 'scale(2)';
                ripple.style.opacity = '0';
            }, 10);
            setTimeout(() => {
                ripple.remove();
            }, 510);
        });
    });
});
