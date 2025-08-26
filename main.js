//Mobile Menu

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav){ toggle.addEventListener('click', () => { nav.classList.toggle('show'); }) } 
}

showMenu('nav-toggle','nav-menu');

// Toggling Mobile Menu when a navlink is clicked

const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// GSAP Hero Animations
document.addEventListener('DOMContentLoaded', function() {
    // Timeline para coordinar las animaciones
    const tl = gsap.timeline();
    
    // Ocultar elementos inicialmente
    gsap.set([".home-title", ".button", ".home-img"], {
        opacity: 0
    });

    // Animación del título con efecto de aparición dramática
    tl.fromTo(".home-title", {
        opacity: 0,
        y: 100,
        scale: 0.8
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)"
    })
    
    // Animación del botón con retraso
    .fromTo(".button", {
        opacity: 0,
        x: -50,
        rotation: -10
    }, {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.3")
    
    // Animación de la imagen con efecto flotante
    .fromTo(".home-img", {
        opacity: 0,
        x: 100,
        rotation: 15,
        scale: 0.5
    }, {
        opacity: 1,
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    }, "-=0.6")
    
    // Efecto flotante continuo para la imagen
    .to(".home-img", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
    });

    // Animación del header con fade in
    gsap.from(".l-header", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // Animaciones GSAP para productos destacados al hacer scroll
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(".product-card", {
        opacity: 0,
        y: 50,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".featured-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Animación para la sección de ofertas
    gsap.fromTo(".offer-data", {
        opacity: 0,
        scale: 0.8
    }, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".offer",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    // Animación para nuevos productos
    gsap.fromTo(".new-box", {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".new-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Animación para el newsletter/certificación
    gsap.fromTo(".certification-badge", {
        opacity: 0,
        scale: 0,
        rotation: -45
    }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".newsletter",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});