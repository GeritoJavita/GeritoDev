// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Cambiar estilo del navbar al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Animación de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.service-card, .plan-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí normalmente enviarías el formulario a un servidor
    // Por ahora, solo mostraremos una alerta
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    contactForm.reset();
});

// Efecto de escritura en el hero
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.innerHTML;

// Función para agregar año actual en el footer
document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} DevWeb. Todos los derechos reservados.`;