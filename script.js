document.addEventListener('DOMContentLoaded', function () {
    // --- LÓGICA DE ANIMAÇÃO ---
    const fadeInElements = document.querySelectorAll('.fade-in');
  
    function handleScrollAnimations() {
      fadeInElements.forEach(element => {
        if (element.classList.contains('visible')) return;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 150) {
          element.classList.add('visible');
        }
      });
    }
  
    function initAnimations() {
      handleScrollAnimations();
      window.addEventListener('scroll', handleScrollAnimations);
    }
  
    window.addEventListener('load', initAnimations);
  
    // --- MENU MOBILE ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.getElementById('close-menu');
    const menuOverlay = document.getElementById('menu-overlay');
  
    function openMobileMenu() {
      navMenu.classList.add('active');
      menuOverlay.classList.add('active');
      hamburger.classList.add('active');
      closeMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  
    function closeMobileMenu() {
      navMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      hamburger.classList.remove('active');
      closeMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  
    if (hamburger && navMenu && closeMenu && menuOverlay) {
      hamburger.addEventListener('click', openMobileMenu);
      closeMenu.addEventListener('click', closeMobileMenu);
      menuOverlay.addEventListener('click', closeMobileMenu);
  
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }
  
    // --- DESTACAR LINK ATIVO NO MENU ---
    const navLinks = document.querySelectorAll('.nav-menu a');
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
      let linkPath = link.getAttribute('href').replace(/^\.\//, '');
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  
    // --- FORMULÁRIO DE CONTATO VIA WHATSAPP ---
    const form = document.querySelector('.contact-form form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const nome = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const telefone = form.querySelector('[name="phone"]').value.trim();
        const assunto = form.querySelector('[name="subject"]').value.trim();
        const mensagem = form.querySelector('[name="message"]').value.trim();
  
        let texto = `Olá! Estou entrando em contato pelo site do Projeto Elas Merecem.%0A%0A`;
        texto += `Nome: ${nome}%0A`;
        texto += `E-mail: ${email}%0A`;
        if (telefone) texto += `Telefone: ${telefone}%0A`;
        texto += `Assunto: ${assunto}%0A`;
        texto += `Mensagem: ${mensagem}`;
  
        const numero = '5524981128603';
        const url = `https://wa.me/${numero}?text=${texto}`;
  
        window.open(url, '_blank');
      });
    }
  });
  