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
const openModalButton = document.querySelector('.openModal');
const closeModalButton = document.querySelector('.closeModal');
const projectDialog = document.getElementById('projectDialog');

openModalButton.addEventListener('click', () => {
    
    projectDialog.showModal();
});

closeModalButton.addEventListener('click', () => {
    projectDialog.close();
});
