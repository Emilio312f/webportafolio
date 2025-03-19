// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Hamburguesa
    const navbar = document.getElementById('navbar');
    const navList = navbar.querySelector('ul');
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '<i class="bx bx-menu"></i>';
    hamburger.className = 'hamburger';
    navbar.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // 2. Mostrar/Ocultar Navbar al hacer scroll
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // 3. Enviar datos a Google Forms silenciosamente
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const type = contactForm.querySelector('select[name="type"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

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

        const formData = new FormData();
        formData.append('entry.687869695', name);
        formData.append('entry.1181229991', email);
        formData.append('entry.1450037853', phone);
        formData.append('entry.1459458064', subject);
        formData.append('entry.318520069', type);
        formData.append('entry.1051858607', message);

        try {
            const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfNsVw3_vB9v1yBu1HUhsqn2DPBEglpqgpzAdpEswf8rYe8Kw/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
            contactForm.reset();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        }
    });

    // 4. Botón "Volver arriba"
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

    // 5. Efecto de revelación al hacer scroll
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
