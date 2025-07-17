document.addEventListener('DOMContentLoaded', function () {
    // =============================================
    // ANIMAÇÕES DE SCROLL
    // =============================================
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    function handleScrollAnimations() {
        fadeInElements.forEach(el => {
            if (!el.classList.contains('visible') && 
                el.getBoundingClientRect().top < window.innerHeight - 150) {
                el.classList.add('visible');
            }
        });
    }
    
    // Inicializa animações
    window.addEventListener('load', () => {
        handleScrollAnimations();
        window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    });

    // =============================================
    // MENU MOBILE - VERSÃO OTIMIZADA PARA iOS
    // =============================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    // Função principal do menu
    function toggleMobileMenu() {
        const isActive = navMenu.classList.contains('active');
        
        // Forçar reflow para evitar bugs visuais no iOS
        void navMenu.offsetWidth;
        
        // Alternar estados
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Gerenciamento de scroll para iOS moderno
        if (!isActive) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        
        // iOS 16+ fix - evitar double tap
        if (!isActive) {
            setTimeout(() => {
                navMenu.style.transform = 'translate3d(0,0,0)';
            }, 10);
        }
    }
    
    // Configuração dos event listeners
    if (hamburger && navMenu) {
        // Hamburguer
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        }, { passive: false });
        
        // Botão fechar
        if (closeMenu) {
            closeMenu.addEventListener('click', (e) => {
                e.preventDefault();
                toggleMobileMenu();
            }, { passive: false });
        }
        
        // Overlay e links
        menuOverlay.addEventListener('click', toggleMobileMenu, { passive: false });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active')) {
                    e.preventDefault();
                    toggleMobileMenu();
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }
            }, { passive: false });
        });
    }

    // =============================================
    // DESTACAR LINK ATIVO NO MENU
    // =============================================
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').replace(/^\.\//, '');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // =============================================
    // FORMULÁRIO DE CONTATO VIA WHATSAPP
    // =============================================
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = {
                name: form.querySelector('[name="name"]').value.trim(),
                email: form.querySelector('[name="email"]').value.trim(),
                phone: form.querySelector('[name="phone"]').value.trim(),
                subject: form.querySelector('[name="subject"]').value.trim(),
                message: form.querySelector('[name="message"]').value.trim()
            };
            
            // Construir mensagem formatada
            const message = `Olá! Mensagem do site Elas Merecem:%0A%0A` +
                           `*Nome:* ${formData.name}%0A` +
                           `*E-mail:* ${formData.email}%0A` +
                           (formData.phone ? `*Telefone:* ${formData.phone}%0A` : '') +
                           `*Assunto:* ${formData.subject}%0A` +
                           `*Mensagem:* ${formData.message}`;
            
            // Abrir WhatsApp
            window.open(`https://wa.me/5524981128603?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // =============================================
    // DETECÇÃO DE iOS PARA AJUSTES ESPECÍFICOS
    // =============================================
    function isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }
    
    if (isIOS()) {
        document.documentElement.classList.add('ios-device');
        
        // Correção adicional para viewport em iOS
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content = viewportMeta.content + ', shrink-to-fit=no';
        }
    }
});