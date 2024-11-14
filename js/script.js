// Ativar menu
const links = document.querySelectorAll(".header-menu a");

// Função para ativar o link correspondente à página atual
function ativarLink(link) {
    const url = location.href; // URL atual da página
    const href = link.href; // URL do link

    // Verifica se a URL atual inclui a URL do link, ativando-o se for o caso
    if (url.includes(href)) {
        link.classList.add("ativo");
    }
}

// Aplica a função ativarLink a cada link do menu
links.forEach(ativarLink);

// Ativar botão Dark/Light Mode
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button-mode');

    // Verifica se o modo escuro está ativado no localStorage
    const darkMode = localStorage.getItem('dark-mode');

    // Aplica o modo escuro se estiver ativado no localStorage
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        button.classList.add('active');
    }

    // Alterna o modo entre claro e escuro ao clicar no botão
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        document.body.classList.toggle('dark-mode');
        document.body.style.transition = '0.2s';

        // Salva a preferência do usuário no localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});

// Rolagem do slide
const slides = document.querySelectorAll('.img-intro img');
const radioButtons = document.querySelectorAll('.radio-selector input[type="radio"]');
let currentIndex = 0; // Índice atual do slide
let slideInterval; // Intervalo para a rolagem automática do slide
let lastIndex = 0; // Último índice do slide exibido

// Função para mostrar o slide com base no índice
function showSlide(index, direction) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'exit', 'enter');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add(direction === 'next' ? 'exit' : 'enter');
        } else if (i === (index + 1) % slides.length) {
            slide.classList.add(direction === 'next' ? 'enter' : 'exit');
        }
    });
    radioButtons[index].checked = true;
}

// Função para mostrar o próximo slide
function nextSlide() {
    lastIndex = currentIndex;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex, 'next');
}

// Função para mostrar o slide anterior
function previousSlide() {
    lastIndex = currentIndex;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex, 'prev');
}

// Inicia o slideshow automaticamente
function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

startSlideShow();

// Alterna o slide ao alterar o rádio
radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        lastIndex = currentIndex;
        currentIndex = index;
        showSlide(currentIndex, index > lastIndex ? 'next' : 'prev');
        startSlideShow();
    });
});

// Abrir modal
document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelector('.openModal');
    const closeModalButton = document.querySelector('.closeModal');
    const projectDialog = document.getElementById('projectDialog');

    openModalButton.addEventListener('click', () => {
        projectDialog.showModal(); // Abre o modal

        // Impede rolagem do site ao abrir o modal
        document.body.classList.add('no-scroll');
    });

    closeModalButton.addEventListener('click', () => {
        projectDialog.close(); // Fecha o modal

        // Libera a rolagem do site
        document.body.classList.remove('no-scroll');
    });
});

// Rolagem suave ao clicar no botão "Voluntariar"
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.voluntariar .button');

    button.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link

        const targetId = button.getAttribute('href'); // Obtém o valor do href
        const targetElement = document.querySelector(targetId); // Seleciona o elemento alvo

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Rolagem suave
                block: 'start' // Alinha o topo do elemento no topo da janela
            });
        }
    });
});

// Perguntas Frequentes (FAQ)
const faq = document.querySelectorAll('.faq button');

// Função para alternar a visibilidade de uma resposta de FAQ
function ativaFaq(event) {
    const faq = event.currentTarget;
    const controls = faq.getAttribute("aria-controls");
    const resposta = document.getElementById(controls);

    resposta.classList.toggle('ativa');
    const ativa = resposta.classList.contains("ativa");
    faq.setAttribute("aria-expanded", ativa);
}

// Adiciona o evento de clique a cada botão FAQ
function eventFaq(faq) {
    faq.addEventListener('click', ativaFaq);
}

faq.forEach(eventFaq);

// Animação usando SimpleAnime, se estiver disponível
if (window.SimpleAnime) {
    new SimpleAnime();
}

// Modal para doações
document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelector('.openModalDoar');
    const closeModalButton = document.querySelector('.btn-close');
    const projectDialog = document.getElementById('modalDoar');

    // Verifica se os elementos existem antes de adicionar os listeners
    if (openModalButton && projectDialog) {
        openModalButton.addEventListener('click', () => {
            projectDialog.showModal();
            document.body.classList.add('no-scroll'); // Impede rolagem do site
        });
    }

    if (closeModalButton && projectDialog) {
        closeModalButton.addEventListener('click', () => {
            projectDialog.close();
            document.body.classList.remove('no-scroll'); // Libera a rolagem
        });
    }
});

// Funções de compartilhamento em redes sociais
const pageUrl = encodeURIComponent(window.location.href); // URL da página atual
const pageTitle = encodeURIComponent(document.title); // Título da página atual

// Função para compartilhar a página no Facebook
function shareOnFacebook() {
    // Define a URL de compartilhamento do Facebook, incluindo o URL da página atual (pageUrl)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    
    // Abre uma nova janela para o compartilhamento no Facebook com largura e altura definidas
    window.open(facebookUrl, '_blank', 'width=1000,height=1000');
}

// Função para compartilhar a página no Twitter
function shareOnTwitter() {
    // Define a URL de compartilhamento do Twitter, incluindo o URL da página e o título (pageTitle)
    const twitterUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
    
    // Abre uma nova janela para o compartilhamento no Twitter com largura e altura definidas
    window.open(twitterUrl, '_blank', 'width=1000,height=1000');
}

// Função para compartilhar a página no LinkedIn
function shareOnLinkedIn() {
    // Define a URL de compartilhamento do LinkedIn, incluindo o URL da página e o título (pageTitle)
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
    
    // Abre uma nova janela para o compartilhamento no LinkedIn com largura e altura definidas
    window.open(linkedInUrl, '_blank', 'width=1000,height=1000');
}

// Função para compartilhar a página no WhatsApp
function shareOnWhatsApp() {
    // Define a URL de compartilhamento do WhatsApp, incluindo o título e o URL da página
    const whatsappUrl = `https://api.whatsapp.com/send?text=${pageTitle} - ${pageUrl}`;
    
    // Abre uma nova janela para o compartilhamento no WhatsApp (não define largura/altura, pois depende do dispositivo)
    window.open(whatsappUrl, '_blank');
}


// Função para destacar texto ao pressionar Enter na pesquisa
// Executa o código quando todo o conteúdo da página foi carregado
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pesquisaInput'); // Captura o elemento de entrada de pesquisa

    // Adiciona um evento ao campo de entrada para capturar a tecla pressionada
    searchInput.addEventListener('keypress', (event) => {
        // Verifica se a tecla pressionada é Enter
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim(); // Obtém o termo de pesquisa e remove espaços extras

            // Verifica se o termo de pesquisa não está vazio
            if (searchTerm) {
                highlightTerm(searchTerm); // Chama a função para destacar o termo
            }
        }
    });

    // Função para destacar todas as ocorrências do termo pesquisado no texto da página
    function highlightTerm(term) {
        removeHighlights(); // Remove os destaques anteriores

        // Cria um TreeWalker para percorrer todos os nós de texto na página
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;

        // Percorre cada nó de texto
        while ((node = walker.nextNode())) {
            const regex = new RegExp(`(${term})`, 'gi'); // Expressão regular para encontrar o termo (case insensitive)
            const parent = node.parentNode; // Obtém o elemento pai do nó de texto

            // Verifica se o termo aparece no texto do nó
            if (regex.test(node.nodeValue)) {
                // Substitui o termo encontrado por uma tag <span> com a classe "highlight" para destacar o texto
                const newHTML = node.nodeValue.replace(regex, `<span class="highlight">$1</span>`);
                const span = document.createElement('span'); // Cria um novo elemento <span>
                span.innerHTML = newHTML; // Define o HTML do span com o texto destacado
                parent.replaceChild(span, node); // Substitui o nó de texto original pelo novo span com destaque
            }
        }

        // Obtém a primeira ocorrência destacada e faz rolagem suave até ela
        const highlighted = document.querySelector('.highlight');
        if (highlighted) {
            highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Centraliza a primeira ocorrência na tela
        }

        searchInput.value = ''; // Limpa o campo de entrada de pesquisa
    }

    // Função para remover todos os destaques atuais
    function removeHighlights() {
        const highlights = document.querySelectorAll('.highlight'); // Seleciona todos os elementos destacados
        highlights.forEach((el) => {
            el.outerHTML = el.innerText; // Substitui o <span> destacado pelo texto original
        });
    }
});

