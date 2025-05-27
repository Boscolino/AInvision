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

    // Language switcher functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('preferred-language') || 'en';

    function updateContent(lang) {
        // Update active button state
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        try {
            // Update Hero Section
            document.querySelector('#home h1').textContent = translations[lang].title;
            document.querySelector('#home p').textContent = translations[lang].subtitle;
            document.querySelector('#home button').textContent = translations[lang].discover;

            // Update Lore Section
            document.querySelector('#lore h2').textContent = translations[lang].falltitle;
            const loreParagraphs = document.querySelectorAll('#lore .lore-text');
            loreParagraphs[0].textContent = translations[lang].lore1;
            loreParagraphs[1].textContent = translations[lang].lore2;
            loreParagraphs[2].textContent = translations[lang].lore3;

            // Update Features Section
            document.querySelector('#features h2').textContent = translations[lang].featuresTitle;
            const features = document.querySelectorAll('#features .feature-card');
            features[0].querySelector('h3').textContent = translations[lang].feature1;
            features[0].querySelector('p').textContent = translations[lang].feature1desc;
            features[1].querySelector('h3').textContent = translations[lang].feature2;
            features[1].querySelector('p').textContent = translations[lang].feature2desc;
            features[2].querySelector('h3').textContent = translations[lang].feature3;
            features[2].querySelector('p').textContent = translations[lang].feature3desc;
            features[3].querySelector('h3').textContent = translations[lang].feature4;
            features[3].querySelector('p').textContent = translations[lang].feature4desc;
            features[4].querySelector('h3').textContent = translations[lang].feature5;
            features[4].querySelector('p').textContent = translations[lang].feature5desc;

            // Update Pre-order Section
            document.querySelector('#preorder h2').textContent = translations[lang].preorderNow;
            document.querySelector('.price-tag').textContent = translations[lang].price;
            document.querySelector('#preorder h4').textContent = translations[lang].included;
            const benefits = document.querySelectorAll('.benefits-list li');
            benefits[0].textContent = translations[lang].benefit1;
            benefits[1].textContent = translations[lang].benefit2;
            benefits[2].textContent = translations[lang].benefit3;
            benefits[3].textContent = translations[lang].benefit4;
            benefits[4].textContent = translations[lang].benefit5;
            document.querySelector('#preorder .cta-button').textContent = translations[lang].preorderButton;

            // Update DLC Section
            document.querySelector('#dlc h2').textContent = translations[lang].futureUpdates;
            const dlcItems = document.querySelectorAll('.dlc-item');
            dlcItems[0].querySelector('h3').textContent = translations[lang].dlc1Title;
            dlcItems[0].querySelector('p').textContent = translations[lang].dlc1Text;
            dlcItems[1].querySelector('h3').textContent = translations[lang].dlc2Title;
            dlcItems[1].querySelector('p').textContent = translations[lang].dlc2Text;
            dlcItems[2].querySelector('h3').textContent = translations[lang].dlc3Title;
            dlcItems[2].querySelector('p').textContent = translations[lang].dlc3Text;

            // Update Media Section
            document.querySelector('#media h2').textContent = translations[lang].mediaGallery;
            document.querySelector('.trailer-title').textContent = translations[lang].trailer;

            // Update System Requirements Section
            document.querySelector('#system-reqs h2').textContent = translations[lang].systemRequirements;
            document.querySelector('#system-reqs h3').textContent = translations[lang].ps6Exclusive;
            const reqBlocks = document.querySelectorAll('.req-block h4');
            reqBlocks[0].textContent = translations[lang].minRequirements;
            reqBlocks[1].textContent = translations[lang].recommendedExp;
            reqBlocks[2].textContent = translations[lang].optimalExp;
            document.querySelector('.performance-note p em').textContent = translations[lang].performanceNote;

            const minReqList = document.querySelectorAll('.req-block')[0].querySelectorAll('ul li');
            translations[lang].minReqList.forEach((item, i) => minReqList[i].textContent = item);
            const recReqList = document.querySelectorAll('.req-block')[1].querySelectorAll('ul li');
            translations[lang].recReqList.forEach((item, i) => recReqList[i].textContent = item);
            const optReqList = document.querySelectorAll('.req-block')[2].querySelectorAll('ul li');
            translations[lang].optReqList.forEach((item, i) => optReqList[i].textContent = item);

            // Update Footer
            document.querySelector('footer p:first-of-type').textContent = translations[lang].copyright;
            document.querySelector('footer p:last-of-type').textContent = translations[lang].disclaimer;

            // Update navigation items
            document.querySelectorAll('nav ul li a').forEach(link => {
                const key = link.getAttribute('href').replace('#', '');
                if (translations[lang][key]) {
                    link.textContent = translations[lang][key];
                }
            });
            
        } catch (error) {
            console.error('Error updating content:', error);
        }

        // Store language preference
        localStorage.setItem('preferred-language', lang);
    }

    // Initialize language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            currentLang = lang;
            updateContent(lang);
        });
    });

    // Set initial language
    updateContent(currentLang);
});
