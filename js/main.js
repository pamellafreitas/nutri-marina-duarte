// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburguer
    const hamburger = document.querySelector('.hamburger-btn');
    const nav = document.querySelector('.main-nav');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ==========================================
    // DIVISORES ELEGANTES (INJETADOS VIA JS)
    // ==========================================
    const sectionsToDivide = [
        '.hero',
        '.strategy-section',
        '.services-section',
        '.target-section',
        '.transform-section',
        '.process-section',
        '.final-cta-section',
        '.about-section',
        '.testimonials-section',
        '.faq-section'
    ];

    const leafDivider = `
        <div class="elegant-divider">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6"></path>
                <path d="M9.5 14.52 12 13 13 12"></path>
            </svg>
        </div>
    `;

    sectionsToDivide.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.insertAdjacentHTML('afterend', leafDivider);
        }
    });

    // ==========================================
    // ANIMAÇÕES DE SURGIMENTO (SCROLL REVEAL)
    // ==========================================
    const elementsToReveal = [
        '.elegant-divider',
        '.hero-text-wrapper > *',
        '.strategy-title', '.strategy-content > *',
        '.services-header', '.service-card',
        '.target-image-wrapper', '.target-title', '.target-list li',
        '.transform-header-sticky', '.transform-item',
        '.process-header', '.process-step',
        '.final-cta-image-wrapper', '.final-text p', '.final-action',
        '.about-image-wrapper', '.about-text p', '.about-content h2', '.about-content .cta-button',
        '.testimonials-header', '.testimonial-card',
        '.faq-header', '.faq-item',
        '.bottom-cta-title', '.bottom-cta-action'
    ];

    // Adiciona as classes dinamicamente
    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            
            // Adiciona delay escalonado para itens em lista/grid
            if (el.classList.contains('service-card') || 
                el.classList.contains('transform-item') ||
                el.classList.contains('process-step') ||
                el.classList.contains('testimonial-card') ||
                el.tagName.toLowerCase() === 'li' ||
                el.classList.contains('faq-item')) {
                el.style.transitionDelay = `${index * 0.15}s`;
            }
        });
    });

    // Observer para acionar a classe reveal-visible
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Só anima a primeira vez
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px', // Aciona um pouco antes de aparecer por completo
        threshold: 0
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
