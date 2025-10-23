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
// Configuración de EmailJS
(function() {
    // Inicializar EmailJS con tu Public Key
    emailjs.init("nMsZIgou_h6obIJt4");
    
    // Estado del formulario
    let isSubmitting = false;
    
    // Elementos del formulario
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessages = document.getElementById('form-messages');
    
    // Función para mostrar mensajes
    function showMessage(message, type) {
        formMessages.innerHTML = `
            <div class="message ${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                ${message}
            </div>
        `;
        formMessages.style.display = 'block';
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            formMessages.style.display = 'none';
        }, 5000);
    }
    
    // Función para mostrar estado de carga
    function setLoadingState(loading) {
        isSubmitting = loading;
        if (loading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'block';
            submitBtn.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    }
    
    // Validación del formulario
    function validateForm(formData) {
        const { from_name, from_email, subject, message } = formData;
        
        if (!from_name.trim()) {
            showMessage('Por favor, ingresa tu nombre', 'error');
            return false;
        }
        
        if (!from_email.trim()) {
            showMessage('Por favor, ingresa tu email', 'error');
            return false;
        }
        
        if (!/\S+@\S+\.\S+/.test(from_email)) {
            showMessage('Por favor, ingresa un email válido', 'error');
            return false;
        }
        
        if (!subject.trim()) {
            showMessage('Por favor, ingresa un asunto', 'error');
            return false;
        }
        
        if (!message.trim()) {
            showMessage('Por favor, ingresa tu mensaje', 'error');
            return false;
        }
        
        return true;
    }
    
    // Envío del formulario
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        const formData = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validar formulario
        if (!validateForm(formData)) {
            return;
        }
        
        // Mostrar estado de carga
        setLoadingState(true);
        formMessages.style.display = 'none';
        
        try {
            // Enviar email usando EmailJS
            const response = await emailjs.send(
                'service_jg266zd',
                'template_0a906ed', 
                formData
            );
            
            // Éxito
            showMessage('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Error
            console.error('Error al enviar el mensaje:', error);
            showMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
        } finally {
            // Quitar estado de carga
            setLoadingState(false);
        }
    });
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });
})();

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