document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll for nav links (fallback if CSS scroll-behavior is not enough or for specific offsets)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    // Close mobile nav if open
                    if (document.querySelector('.nav-links').classList.contains('nav-active')) {
                        toggleNav();
                    }
                }
            }
        });
    });
    
    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
             if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }


    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    const toggleNav = () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Animate links (optional, simple fade-in)
        const navLinksElements = document.querySelectorAll('.nav-links li');
        navLinksElements.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    }

    if (burger) {
        burger.addEventListener('click', toggleNav);
    }
    
    // Keyframes for nav link fade (add to CSS or keep here)
    // This could be done in CSS but for simplicity, here's a JS way to toggle it.
    // Better to define in CSS:
    // @keyframes navLinkFade { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }

    // Initialize AOS (Animate On Scroll Library)
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
        offset: 100, // offset (in px) from the original trigger point
    });

    // Initialize Swiper JS for Recipe Carousel
    const swiper = new Swiper('.recipe-carousel', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        },
        // Optional: Autoplay
        /*
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        */
    });

    // Sticky Header on Scroll (optional, enhances fixed header appearance)
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scroll Down
            header.style.top = `-${header.offsetHeight}px`; // Hide header
        } else {
            // Scroll Up or at top
            header.style.top = '0';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

        // Add a class if scrolled past a certain point for background change
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    // Add this CSS for the .scrolled class effect on header (if you want a different bg on scroll)
    // header.scrolled { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(15px); }

});