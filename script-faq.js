document.addEventListener('DOMContentLoaded', function() {
    
    const faqItems = document.querySelectorAll('.faq-item');

    // Verifica se existem itens de FAQ na página atual antes de rodar o código
    if (faqItems.length > 0) {
        
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');

            questionButton.addEventListener('click', () => {
                // Verifica se o item clicado já está ativo
                const isCurrentlyActive = item.classList.contains('active');

                // Primeiro, fecha todos os outros itens para o efeito "acordeão"
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });
                
                // Se o item clicado não estava ativo, ele se torna ativo
                if (!isCurrentlyActive) {
                    item.classList.add('active');
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }
});