document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE ANIMAÇÃO ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    function handleScrollAnimations() {
        fadeInElements.forEach(element => {
            // Se o elemento já está visível, não faz nada
            if (element.classList.contains('visible')) {
                return;
            }

            const elementTop = element.getBoundingClientRect().top;
            const elementVisibleThreshold = 150; // Quão perto da parte inferior da tela o elemento precisa estar para aparecer

            if (elementTop < window.innerHeight - elementVisibleThreshold) {
                element.classList.add('visible');
            }
        });
    }

    // Função para iniciar as animações
    function initAnimations() {
        // Roda a verificação uma vez, assim que a página (incluindo imagens) carregar
        handleScrollAnimations();
        // E continua verificando enquanto o usuário rola a página
        window.addEventListener('scroll', handleScrollAnimations);
    }

    // Inicia tudo no evento 'load', que é mais seguro que 'DOMContentLoaded' para isso
    window.addEventListener('load', initAnimations);


    // --- LÓGICA DO MENU MOBILE ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    // Garante estado inicial correto ao carregar a página (apenas classes)
    if (hamburger && navMenu && closeMenu && menuOverlay) {
        // Estado inicial: tudo fechado
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        closeMenu.classList.remove('active');

        function openMobileMenu() {
            navMenu.classList.add('active');
            menuOverlay.classList.add('active');
            hamburger.classList.add('active'); // Para esconder via CSS
            closeMenu.classList.add('active'); // Para mostrar via CSS
        }

        function closeMobileMenu() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            closeMenu.classList.remove('active');
        }

        hamburger.addEventListener('click', openMobileMenu);
        closeMenu.addEventListener('click', closeMobileMenu);
        menuOverlay.addEventListener('click', closeMobileMenu);

        // Fecha o menu quando um link é clicado
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // --- DESTACAR LINK ATIVO NO MENU ---
    const navLinks = document.querySelectorAll('.nav-menu a');
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === undefined) currentPath = 'index.html';
    navLinks.forEach(link => {
        // Remove './' do início do href, se existir
        let linkPath = link.getAttribute('href').replace(/^\.\//, '');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// --- FORMULÁRIO DE CONTATO VIA WHATSAPP ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Pegue os valores dos campos
      const nome = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const telefone = form.querySelector('[name="phone"]').value.trim();
      const assunto = form.querySelector('[name="subject"]').value.trim();
      const mensagem = form.querySelector('[name="message"]').value.trim();

      // Monte a mensagem
      let texto = `Olá! Gostaria de entrar em contato pelo site Elas Merecem.%0A%0A`;
      texto += `*Nome:* ${nome}%0A`;
      texto += `*E-mail:* ${email}%0A`;
      if (telefone) texto += `*Telefone:* ${telefone}%0A`;
      texto += `*Assunto:* ${assunto}%0A`;
      texto += `*Mensagem:* ${mensagem}`;

      // Número do WhatsApp (com DDI e DDD, só números)
      const numero = '5524981128603';

      // Monta o link
      const url = `https://wa.me/${numero}?text=${texto}`;

      // Abre o WhatsApp
      window.open(url, '_blank');
    });
  }
});