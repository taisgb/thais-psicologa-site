document.addEventListener('DOMContentLoaded', function() {
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
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });

    // =============================================
    // MENU MOBILE - ÚNICA IMPLEMENTAÇÃO
    // =============================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Função para alternar o menu
        const toggleMenu = () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.setAttribute('aria-hidden', isExpanded);
            document.body.classList.toggle('menu-open', !isExpanded);
        };

        // Evento de clique no hambúrguer
        hamburger.addEventListener('click', toggleMenu);
        
        // Fechar menu ao clicar nos links (apenas em mobile)
        if (window.innerWidth <= 800) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', (e) => {
                    if (hamburger.getAttribute('aria-expanded') === 'true') {
                        e.preventDefault();
                        toggleMenu();
                        setTimeout(() => {
                            window.location.href = link.href;
                        }, 400);
                    }
                });
            });
        }
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
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const getValue = (selector) => 
                form.querySelector(selector)?.value.trim() || '';
            
            const message = `Olá! Mensagem do site Elas Merecem:%0A%0A` +
                           `*Nome:* ${getValue('[name="name"]')}%0A` +
                           `*E-mail:* ${getValue('[name="email"]')}%0A` +
                           `*Telefone:* ${getValue('[name="phone"]')}%0A` +
                           `*Assunto:* ${getValue('[name="subject"]')}%0A` +
                           `*Mensagem:* ${getValue('[name="message"]')}`;
            
            window.open(`https://wa.me/5524981128603?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // =============================================
    // AJUSTES PARA iOS
    // =============================================
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        document.documentElement.classList.add('ios-device');
        
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.content += ', shrink-to-fit=no';
        }
        
        if (navMenu) {
            navMenu.style.webkitBackdropFilter = 'blur(5px)';
        }
    }
});