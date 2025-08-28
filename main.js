//Mobile Menu with Overlay

const showMenu = (toggleId, navId, overlayId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    const overlay = document.getElementById(overlayId);

    if(toggle && nav && overlay) {
        toggle.addEventListener('click', () => { 
            nav.classList.toggle('show');
            overlay.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
    }
}

// Función para cerrar el menú
const closeMenu = () => {
    const nav = document.getElementById('nav-menu');
    const overlay = document.getElementById('nav-overlay');
    
    if (nav && overlay) {
        nav.classList.remove('show');
        overlay.classList.remove('show');
        document.body.classList.remove('menu-open');
    }
}

showMenu('nav-toggle','nav-menu', 'nav-overlay');

// Cerrar menú al hacer click en el overlay
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('nav-overlay');
    const navMenu = document.getElementById('nav-menu');
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    // Cerrar menú al hacer click en el botón X (::before)
    if (navMenu) {
        navMenu.addEventListener('click', (e) => {
            const rect = navMenu.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Área aproximada del botón X (esquina superior derecha)
            if (clickX > rect.width - 60 && clickY < 60) {
                closeMenu();
            }
        });
    }
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});

// Toggling Mobile Menu when a navlink is clicked

const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active');

    // Cerrar menú al hacer click en un enlace
    closeMenu();
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

    // Animación para Instagram Stories
    gsap.fromTo(".text-content", {
        opacity: 0,
        x: -50
    }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".instagram-stories",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.fromTo(".slide", {
        opacity: 0,
        x: 50,
        scale: 0.8
    }, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.2)",
        scrollTrigger: {
            trigger: ".instagram-stories",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// ===== WHATSAPP BUTTON FUNCTIONALITY =====

// Número de WhatsApp de la tienda (cambiar por el número real)
const WHATSAPP_NUMBER = '5491123456789'; // Formato: 54 + código área + número

// Máscara para teléfono argentino
function phoneMask(value) {
    if (!value) return '';
    value = value.replace(/\D/g,'');
    
    // Formato argentino: (11) 1234-5678 o (011) 1234-5678
    if (value.length <= 2) {
        return value;
    } else if (value.length <= 4) {
        return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 8) {
        return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
        return `(${value.slice(0, 3)}) ${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }
}

// Función para obtener datos del formulario
function getData(form) {
    var formData = new FormData(form);
    return Object.fromEntries(formData);
}

// Inicializar funcionalidad de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const wppButton = document.getElementById('wpp-link');
    const wppForm = document.getElementById('wpp-form');
    const closeButton = document.getElementById('close-bt');
    const phone = document.getElementById('telefono');
    const mask = document.querySelector('#wpp-fix .mask');
    const response = document.querySelector('#wpp-form .response-output');

    // Aplicar máscara al teléfono
    if (phone) {
        phone.addEventListener('keyup', function(e) {
            phone.value = phoneMask(e.target.value);
        });
    }

    // Abrir formulario
    if (wppButton) {
        wppButton.addEventListener('click', function() {
            wppButton.classList.add('hide-this');
        });
    }

    // Cerrar formulario con máscara
    if (mask) {
        mask.addEventListener('click', function() {
            wppButton.classList.remove('hide-this');
        });
    }

    // Cerrar formulario con botón X
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            wppButton.classList.remove('hide-this');
        });
    }

    // Manejar envío del formulario
    if (wppForm) {
        wppForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = getData(e.target);
            
            // Validar campos
            if (!formData.nombre || !formData.telefono || !formData.email) {
                alert('Por favor completá todos los campos');
                return;
            }

            // Mostrar estado de envío
            wppForm.classList.add('submitting');
            
            // Simular carga
            setTimeout(() => {
                wppForm.classList.remove('submitting');
                wppForm.classList.add('sent');
                
                if (response) {
                    response.innerHTML = '¡Te estamos redirigiendo a WhatsApp!';
                    response.style.display = 'flex';
                }
                
                // Crear mensaje para WhatsApp
                const message = `¡Hola! Mi nombre es *${formData.nombre}* 👋

🛍️ Me interesa conocer más sobre los productos de SARA

📞 *Mis datos de contacto:*
• Teléfono: ${formData.telefono}
• Email: ${formData.email}

¡Espero tu respuesta!`;

                // Redirigir a WhatsApp después de un momento
                setTimeout(() => {
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    // Cerrar formulario después del redirect
                    setTimeout(() => {
                        wppButton.classList.remove('hide-this');
                        wppForm.classList.remove('sent');
                        wppForm.reset();
                        if (response) {
                            response.style.display = 'none';
                            response.innerHTML = '';
                        }
                    }, 1000);
                    
                }, 1500);
                
            }, 2000);
        });
    }

    // Cerrar con tecla Escape
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            wppButton.classList.remove('hide-this');
        }
    });
});

// ===== INSTAGRAM STORIES SLIDER =====
class SlideStories {
    constructor(id) {
        this.slide = document.querySelector(`[data-slide=${id}]`);
        if (!this.slide) return;
        this.active = 0;
        this.init();
    }

    activeSlide(index) {
        this.active = index;
        this.items.forEach((item) => {
            item.classList.remove("active");
        });
        this.items[index].classList.add("active");
        this.thumbItems.forEach((item) => {
            item.classList.remove("active");
            item.classList.remove("done");
        });
        
        // Marcar como completados los anteriores
        for(let i = 0; i < index; i++) {
            this.thumbItems[i].classList.add("done");
        }
        
        this.thumbItems[index].classList.add("active");
        this.autoSlide();
    }

    prev() {
        if (this.active > 0) {
            this.activeSlide(this.active - 1);
        } else {
            this.activeSlide(this.items.length - 1);
        }
    }

    next() {
        if (this.active < this.items.length - 1) {
            this.activeSlide(this.active + 1);
        } else {
            this.activeSlide(0);
        }
    }

    addNavigation() {
        const nextBtn = this.slide.querySelector(".slide-next");
        const prevBtn = this.slide.querySelector(".slide-prev");
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener("click", this.next);
            prevBtn.addEventListener("click", this.prev);
        }
    }

    addThumbItems() {
        this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
        this.thumbItems = Array.from(this.thumb.children);
    }

    autoSlide() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.next, 5000);
    }

    init() {
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.thumb = this.slide.querySelector(".slide-thumb");
        this.refresh();
        this.addNavigation();
    }
    
    refresh() {
        // Limpiar timeout anterior
        clearTimeout(this.timeout);
        
        // Actualizar elementos
        this.items = this.slide.querySelectorAll(".slide-items > *");
        
        if (this.thumb && this.items.length > 0) {
            // Limpiar thumbs anteriores
            this.thumb.innerHTML = '';
            
            // Recrear thumbs
            this.addThumbItems();
            
            // Resetear estado
            this.active = 0;
            this.activeSlide(0);
        }
    }
}

// Variable global para el slider
let storiesSlider = null;

// Inicializar slider cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadStoriesFromAdmin();
});

// Cargar stories desde el admin
function loadStoriesFromAdmin() {
    const storeData = localStorage.getItem('saraStoreData');
    if (storeData) {
        const data = JSON.parse(storeData);
        if (data.stories && data.stories.length > 0) {
            updateStoriesInDOM(data.stories);
        }
    }
    
    // Inicializar el slider después de cargar las stories
    setTimeout(() => {
        if (storiesSlider) {
            storiesSlider.refresh();
        } else {
            storiesSlider = new SlideStories("slide");
        }
    }, 100);
}

// Escuchar cambios en localStorage para actualizar en tiempo real
window.addEventListener('storage', function(e) {
    if (e.key === 'saraStoreData') {
        loadStoriesFromAdmin();
    }
});

// Función para refrescar stories manualmente (llamada desde admin)
function refreshStoriesFromAdmin() {
    loadStoriesFromAdmin();
}

// Actualizar las stories en el DOM
function updateStoriesInDOM(stories) {
    const slideItems = document.querySelector('.slide-items');
    if (!slideItems) return;
    
    // Ordenar stories por order
    const sortedStories = stories.sort((a, b) => a.order - b.order);
    
    // Limpiar contenido actual
    slideItems.innerHTML = '';
    
    // Agregar las nuevas stories
    sortedStories.forEach((story, index) => {
        const img = document.createElement('img');
        img.src = story.image;
        img.alt = `Historia ${index + 1}`;
        img.onerror = function() {
            console.log('Error cargando imagen:', story.image);
        };
        slideItems.appendChild(img);
    });
    
    console.log(`Actualizadas ${sortedStories.length} stories en el DOM`);
}