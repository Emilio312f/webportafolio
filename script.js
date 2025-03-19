// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mostrar/Ocultar Navbar al hacer scroll
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // 2. Enviar datos a Google Forms silenciosamente
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado del formulario

        // Obtener los valores del formulario
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const type = contactForm.querySelector('select[name="type"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Validaciones básicas
        if (!name || !email || !phone || !subject || !type || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert('El nombre solo debe contener letras y espacios.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!/^\+?\d{9,12}$/.test(phone)) {
            alert('Por favor, ingresa un número de teléfono válido (ej. +51987654321).');
            return;
        }

        // Preparar los datos para enviar a Google Forms
        const formData = new FormData();
        formData.append('entry.687869695', name); // Nombre Completo
        formData.append('entry.1181229991', email); // Correo Electrónico
        formData.append('entry.1450037853', phone); // Número de teléfono
        formData.append('entry.1459458064', subject); // Asunto
        formData.append('entry.318520069', type); // Tipo de consulta
        formData.append('entry.1051858607', message); // Mensaje

        try {
            // Enviar los datos a Google Forms
            const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfNsVw3_vB9v1yBu1HUhsqn2DPBEglpqgpzAdpEswf8rYe8Kw/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Necesario para evitar problemas de CORS
            });

            // Mostrar mensaje de confirmación
            alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
            contactForm.reset();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        }
    });

    // 3. Botón "Volver arriba"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Efecto de revelación al hacer scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});