// Espera o documento HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona todos os elementos importantes do quiz
    const quiz = document.getElementById('quiz');
    const questions = document.querySelectorAll('.quiz-question');
    const answerCards = document.querySelectorAll('.answer-card');
    const resultsContainer = document.getElementById('results');
    const resultCards = document.querySelectorAll('.result-card');
    const progressBar = document.getElementById('progress-bar');
    const progressBarContainer = document.getElementById('progress-bar-container');

    // Inicializa o estado do quiz
    let currentQuestionIndex = 0;
    const scores = {
        tcc: 0,
        psicanalise: 0,
        humanista: 0
    };
    const totalQuestions = questions.length;

    // Função para mostrar a barra de progresso quando o quiz começa
    const startQuiz = () => {
        progressBarContainer.style.display = 'block';
        updateProgressBar();
    };
    
    // Adiciona um "ouvinte de clique" para cada cartão de resposta
    answerCards.forEach(card => {
        card.addEventListener('click', () => {
            // Inicia o quiz na primeira resposta
            if (currentQuestionIndex === 0 && scores.tcc === 0 && scores.psicanalise === 0 && scores.humanista === 0) {
                startQuiz();
            }

            // Pega o valor da resposta (ex: "tcc", "psicanalise")
            const value = card.getAttribute('data-value');
            // Adiciona um ponto à pontuação correspondente
            scores[value]++;

            // Move para a próxima pergunta ou mostra os resultados
            goToNextQuestion();
        });
    });

    // Função para avançar no quiz
    const goToNextQuestion = () => {
        // Esconde a pergunta atual
        questions[currentQuestionIndex].classList.remove('active');
        // Incrementa o índice da pergunta
        currentQuestionIndex++;
        // Atualiza a barra de progresso
        updateProgressBar();

        // Se ainda houver perguntas, mostra a próxima
        if (currentQuestionIndex < totalQuestions) {
            questions[currentQuestionIndex].classList.add('active');
        } else {
            // Se não, mostra os resultados
            showResults();
        }
    };

    // Função para atualizar a barra de progresso
    const updateProgressBar = () => {
        const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    };

    // Função para calcular e mostrar o resultado final
    const showResults = () => {
        // Esconde a barra de progresso
        progressBarContainer.style.display = 'none';
        
        // Encontra a categoria com a maior pontuação
        let maxScore = -1;
        let resultId = '';

        for (const [category, score] of Object.entries(scores)) {
            if (score > maxScore) {
                maxScore = score;
                resultId = category;
            }
        }
        
        // Se houver empate, você pode definir uma regra (ex: priorizar a primeira)
        // Este código simples pega a última categoria com a pontuação máxima em caso de empate.

        // Mostra o card de resultado correspondente
        const resultToShow = document.getElementById(resultId);
        if(resultToShow) {
            resultToShow.classList.add('active');
        }
    };

    // Função para resetar o quiz
    const resetQuiz = () => {
        // Resetar estado
        currentQuestionIndex = 0;
        scores.tcc = 0;
        scores.psicanalise = 0;
        scores.humanista = 0;
        // Esconder todos os cards de resultado
        resultCards.forEach(card => card.classList.remove('active'));
        // Esconder resultados
        // Mostrar primeira pergunta
        questions.forEach((q, i) => q.classList.toggle('active', i === 0));
        // Resetar barra de progresso
        progressBar.style.width = '0%';
        progressBarContainer.style.display = 'none';
        window.scrollTo({ top: document.getElementById('quiz-container').offsetTop - 40, behavior: 'smooth' });
    };

    // Adicionar botão de refazer teste nos cards de resultado
    resultCards.forEach(card => {
        // Evitar duplicar botão
        if (!card.querySelector('.btn-retake')) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary btn-retake';
            btn.textContent = 'Refazer teste';
            btn.style.marginTop = '18px';
            btn.addEventListener('click', resetQuiz);
            card.appendChild(btn);
        }
    });

});