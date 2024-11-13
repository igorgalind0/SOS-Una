//Ativar menu
const links = document.querySelectorAll(".header-menu a");

function ativarLink(link) {
    const url = location.href;
    const href = link.href;
    
    if (url.includes(href)) {
        link.classList.add("ativo");
    }
}

links.forEach(ativarLink);

// Ativar botão Dark/Light Mode
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button-mode');
    
    // Verificar se o modo escuro está ativado na localStorage
    const darkMode = localStorage.getItem('dark-mode');
    
    // Se estiver ativado, aplicar o modo escuro
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        button.classList.add('active');
    }

    button.addEventListener('click', () => {
        // Alternar a classe active no botão e dark-mode no body
        button.classList.toggle('active');
        document.body.classList.toggle('dark-mode');
        document.body.style.transition = '0.2s';

        // Salvar a preferência no localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});


//Rolagem do slide
const slides = document.querySelectorAll('.img-intro img');
const radioButtons = document.querySelectorAll('.radio-selector input[type="radio"]');
let currentIndex = 0;
let slideInterval;
let lastIndex = 0;

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

function nextSlide() {
    lastIndex = currentIndex;
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex, 'next');
}

function previousSlide() {
    lastIndex = currentIndex;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex, 'prev');
}

function startSlideShow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

startSlideShow();

radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        lastIndex = currentIndex;
        currentIndex = index;
        showSlide(currentIndex, index > lastIndex ? 'next' : 'prev');
        startSlideShow();
    });
});

//Abrir modal
document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelector('.openModal');
    const closeModalButton = document.querySelector('.closeModal');
    const projectDialog = document.getElementById('projectDialog');
    
    openModalButton.addEventListener('click', () => {
        projectDialog.showModal();
        
        // Bloqueia o scroll do site
        document.body.classList.add('no-scroll');
    });
    
    closeModalButton.addEventListener('click', () => {
        projectDialog.close();
        
        // Libera o scroll do site
        document.body.classList.remove('no-scroll');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.voluntariar .button');

    button.addEventListener('click', function (event) {
        event.preventDefault(); // Previne o comportamento padrão do link

        const targetId = button.getAttribute('href'); // Pega o valor do href
        const targetElement = document.querySelector(targetId); // Seleciona o elemento alvo

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Efeito de rolagem suave
                block: 'start' // Alinha o topo do elemento no topo da janela
            });
        }
    });
});

// Perguntas Frequentes (FAQ)

const faq = document.querySelectorAll('.faq button');

function ativaFaq(event) {
    const faq = event.currentTarget;
    const controls = faq.getAttribute("aria-controls");
    const resposta = document.getElementById(controls);

    resposta.classList.toggle('ativa');
    const ativa = resposta.classList.contains("ativa");
    faq.setAttribute("aria-expanded", ativa);
}

function eventFaq(faq) {
    faq.addEventListener('click', ativaFaq);
}

faq.forEach(eventFaq);

// Animação
if (window.SimpleAnime) {
    new SimpleAnime();
}

document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.querySelector('.openModalDoar');
    const closeModalButton = document.querySelector('.btn-close');
    const projectDialog = document.getElementById('modalDoar');
    
    // Verificar se os elementos existem antes de adicionar os event listeners
    if (openModalButton && projectDialog) {
        openModalButton.addEventListener('click', () => {
            projectDialog.showModal();
            
            // Bloqueia o scroll do site
            document.body.classList.add('no-scroll');
        });
    }
    
    if (closeModalButton && projectDialog) {
        closeModalButton.addEventListener('click', () => {
            projectDialog.close();
            
            // Libera o scroll do site
            document.body.classList.remove('no-scroll');
        });
    }
});


// Função para pegar a URL atual
const pageUrl = encodeURIComponent(window.location.href);
const pageTitle = encodeURIComponent(document.title);

// Funções de compartilhamento
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

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pesquisaInput');

    // Adiciona um evento de escuta ao campo de entrada para detectar quando o usuário pressiona a tecla Enter
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                highlightTerm(searchTerm);
            }
        }
    });

    function highlightTerm(term) {
        // Remove o destaque existente
        removeHighlights();

        // Encontra todos os nós de texto e aplica o destaque
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

        // Rola até o primeiro destaque encontrado
        const highlighted = document.querySelector('.highlight');
        if (highlighted) {
            highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Limpa o campo de pesquisa
        searchInput.value = '';
    }

    function removeHighlights() {
        // Remove o destaque ao substituir os elementos de volta ao texto normal
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach((el) => {
            el.outerHTML = el.innerText; // Substitui o <span> pelo texto
        });
    }
});

