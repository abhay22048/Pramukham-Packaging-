document.addEventListener('DOMContentLoaded', function() {
    // Carousel Functionality
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;
    let autoplayInterval;

    function showSlide(index) {
        // Handle boundary cases
        if (index < 0) index = carouselItems.length - 1;
        if (index >= carouselItems.length) index = 0;
        
        // Update active class
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
        
        // Move carousel
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Event listeners for carousel buttons
    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        resetAutoplay();
    });

    // Touch/swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe to register
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left -> next slide
            showSlide(currentIndex + 1);
            resetAutoplay();
        }
        else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right -> previous slide
            showSlide(currentIndex - 1);
            resetAutoplay();
        }
    }

    // Autoplay functionality
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Initialize carousel
    startAutoplay();

    // Pause autoplay when user hovers over carousel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Premium Animations with GSAP
    
    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');

    // Initialize GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a timeline for product cards animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Add staggered animation for product cards
    tl.to(productCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // Fallback for browsers that might not support GSAP
    if (typeof gsap === 'undefined') {
        // Simple animation fallback
        function checkIfInView() {
            const cards = document.querySelectorAll('.product-card');
            const windowHeight = window.innerHeight;
            
            cards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                if (cardTop < windowHeight - 100) {
                    card.classList.add('slide-up');
                }
            });
        }
        
        // Add scroll event listener
        window.addEventListener('scroll', checkIfInView);
        // Initial check
        checkIfInView();
    }

    // Hover effects for product cards
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Initial animation for page load
    gsap.from('header', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    gsap.from('h1', {
        y: -30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "back.out(1.7)"
    });
    
    gsap.from('.carousel-container', {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });
    
});
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});