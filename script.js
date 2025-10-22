// ==============================
// NAVEGACIÓN MÓVIL
// ==============================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ==============================
// EFECTOS DE SCROLL Y ANIMACIONES
// ==============================
const header = document.querySelector('header');
const hero = document.querySelector('.hero');
const progressBar = document.querySelector('.progress-bar');
const sections = document.querySelectorAll('section');



// Observar secciones y elementos animados
document.querySelectorAll('section, .service-card, .plan-card, .portfolio-item, .custom-banner')
  .forEach(el => scrollObserver.observe(el));

// ==============================
// EVENTO SCROLL PRINCIPAL (ÚNICO)
// ==============================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const winHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // --- Cambiar estilo del navbar ---
  header.classList.toggle('scrolled', scrollY > 50);

  // --- Fondo activo según sección ---
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 300) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  // --- Parallax del hero ---
  if (hero) hero.style.transform = `translateY(${scrollY * 0.5}px)`;

  // --- Barra de progreso ---
  const scrollPercent = (scrollY / (docHeight - winHeight)) * 100;
  if (progressBar) progressBar.style.width = `${scrollPercent}%`;
});

// ==============================
// FORMULARIO DE CONTACTO
// ==============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    contactForm.reset();
  });
}

// ==============================
// FOOTER (AÑO AUTOMÁTICO)
// ==============================
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
  footerText.innerHTML = `&copy; ${new Date().getFullYear()} DevWeb. Todos los derechos reservados.`;
}
window.addEventListener('scroll', () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});