//Ativar botão Dark/Light Mode
const button = document.querySelector('.button-mode');

button.addEventListener('click', () => {
    button.classList.toggle('active');
});


//Rolagem do slide
const slides = document.querySelectorAll('.img-intro img');
const radioButtons = document.querySelectorAll('.radio-selector input[type="radio"]');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'exit', 'enter'); 
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add('exit');
        } else if (i === (index + 1) % slides.length) {
            slide.classList.add('enter');
        }
    });
    radioButtons[index].checked = true;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
        currentIndex = index;
        showSlide(currentIndex);
    });
});

setInterval(nextSlide, 5000);

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


