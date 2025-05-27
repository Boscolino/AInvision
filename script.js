document.addEventListener('DOMContentLoaded', () => {
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

    // Basic Lazy Loading for Images (Media Section)
    const lazyImages = document.querySelectorAll('.gallery-grid img[data-src]');
    // A small placeholder image (1x1 transparent pixel)
    const placeholderSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const actualSrc = image.getAttribute('data-src');

                    image.src = actualSrc; // Set the actual image source
                    image.removeAttribute('data-src'); // Remove data-src to prevent re-processing

                    // Optional: Add a class to indicate the image has loaded, for styling
                    // image.classList.add('loaded');

                    observer.unobserve(image); // Stop observing the image once loaded
                }
            });
        });

        lazyImages.forEach(image => {
            // Set a placeholder src if not already set (or if you want to enforce it)
            if (!image.src || image.src === window.location.href) { // Check if src is empty or points to current page
                image.src = placeholderSrc;
            }
            imageObserver.observe(image); // Start observing the image
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        // Load all images immediately or implement a simpler scroll-based lazy load
        console.warn('IntersectionObserver not supported. Loading all images directly.');
        lazyImages.forEach(image => {
            const actualSrc = image.getAttribute('data-src');
            if (actualSrc) {
                image.src = actualSrc;
                image.removeAttribute('data-src');
            }
        });
    }
});
