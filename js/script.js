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

function shareOnFacebook() {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    window.open(facebookUrl, '_blank', 'width=1000,height=1000');
}

function shareOnTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
    window.open(twitterUrl, '_blank', 'width=1000,height=1000');
}

function shareOnLinkedIn() {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
    window.open(linkedInUrl, '_blank', 'width=1000,height=1000');
}

function shareOnWhatsApp() {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${pageTitle} - ${pageUrl}`;
    window.open(whatsappUrl, '_blank');
}

// Função para destacar texto ao pressionar Enter na pesquisa
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pesquisaInput');

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                highlightTerm(searchTerm);
            }
        }
    });

    // Destaca o termo de pesquisa no texto da página
    function highlightTerm(term) {
        removeHighlights();

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;

        while (node = walker.nextNode()) {
            const regex = new RegExp(`(${term})`, 'gi');
            const parent = node.parentNode;

            if (regex.test(node.nodeValue)) {
                const newHTML = node.nodeValue.replace(regex, `<span class="highlight">$1</span>`);
                const span = document.createElement('span');
                span.innerHTML = newHTML;
                parent.replaceChild(span, node);
            }
        }

        const highlighted = document.querySelector('.highlight');
        if (highlighted) {
            highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        searchInput.value = '';
    }

    // Remove o destaque
    function removeHighlights() {
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach((el) => {
            el.outerHTML = el.innerText;
        });
    }
});
