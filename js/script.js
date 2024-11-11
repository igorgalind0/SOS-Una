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

//Ativar botão Dark/Light Mode
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button-mode');
    
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        document.body.classList.toggle('dark-mode');
        document.body.style.transition = '0.2s';

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
    });
    
    closeModalButton.addEventListener('click', () => {
        projectDialog.close();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.button');

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
    
    openModalButton.addEventListener('click', () => {
        
        projectDialog.showModal();
    });
    
    closeModalButton.addEventListener('click', () => {
        projectDialog.close();
    });
});