/**
 * Archivo JavaScript principal para la página web de Ismael Palencia
 * Funcionalidades básicas: menú móvil, formulario de contacto, animaciones
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. Menú móvil
    // ====================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alternar la clase 'active' en el botón y el menú
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Cambiar el texto del atributo aria-label
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.setAttribute('aria-label', isExpanded ? 'Cerrar menú' : 'Abrir menú');
        });
        
        // Cerrar el menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
        
        // Cerrar el menú al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });
    }
    
    // ====================
    // 2. Formulario de contacto (simulación)
    // ====================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación simple
            if (!name || !email || !subject || !message) {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, introduce un correo electrónico válido.');
                return;
            }
            
            // Simular envío del formulario
            console.log('Simulando envío de formulario:');
            console.log('Nombre:', name);
            console.log('Email:', email);
            console.log('Asunto:', subject);
            console.log('Mensaje:', message);
            
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado con éxito! En una implementación real, esto se enviaría a un servidor. Para contacto inmediato, usa WhatsApp.');
            
            // Resetear el formulario
            contactForm.reset();
        });
    }
    
    // ====================
    // 3. Actualizar año en el footer
    // ====================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
    
    // ====================
    // 4. Animación de elementos al hacer scroll
    // ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar al hacer scroll
    const animateElements = document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // ====================
    // 5. Smooth scroll para enlaces internos
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Solo para enlaces internos (no para # solo)
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ====================
    // 6. Cambiar estilos del header al hacer scroll
    // ====================
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Ejecutar al cargar y al hacer scroll
    updateHeaderOnScroll();
    window.addEventListener('scroll', updateHeaderOnScroll);
    
    // ====================
    // 7. Reemplazar placeholders en enlaces de WhatsApp
    // ====================
    // Nota: El cliente debe reemplazar "XXXXXXXXXX" con su número real de WhatsApp
    // Se incluye un mensaje de consola para recordar hacerlo
    console.log('IMPORTANTE: Recuerda reemplazar "XXXXXXXXXX" en los enlaces de WhatsApp con tu número real (sin espacios ni caracteres especiales).');
});
