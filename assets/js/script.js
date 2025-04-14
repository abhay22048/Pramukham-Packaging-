// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const loader = document.querySelector('.loader-container');
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 2000); // 2 seconds delay before hiding loader

    // Navbar scroll effect
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        if (mobileMenuBtn.querySelector('i').classList.contains('fa-bars')) {
            mobileMenuBtn.querySelector('i').classList.replace('fa-bars', 'fa-times');
        } else {
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinksContainer.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', function() {
        // Header shadow on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Animate elements on scroll
        animateOnScroll();
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // You would typically send form data to a server here
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
            }, 1500);
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input').value;
            
            // Simulate subscription
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }, 800);
        });
    }

    // Animation on scroll functionality
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 100) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Initial animation check
    setTimeout(() => {
        animateOnScroll();
    }, 500);

    // Number counter animation for stats
    function animateNumbers() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = Math.ceil(target / (duration / 16)); // 60fps
            
            const counter = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target + '+';
                    clearInterval(counter);
                } else {
                    stat.textContent = count + '+';
                }
            }, 16);
        });
    }

    // Run number animation when the about section is in view
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product animations
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });

    // Initialize any tooltips or popovers
    const btnSmall = document.querySelectorAll('.btn-small');
    btnSmall.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });



});