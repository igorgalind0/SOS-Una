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

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pesquisaInput');

    // Recupera o termo de pesquisa do Local Storage, se existir
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
        searchInput.value = savedSearchTerm;
        highlightTerm(savedSearchTerm); // Destaca o termo salvo
    }

    // Adiciona um evento de escuta ao campo de entrada para detectar quando o usuário pressiona a tecla Enter
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                localStorage.setItem('searchTerm', searchTerm); // Salva o termo no Local Storage
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
                const newHTML = node.nodeValue.replace(regex, `<span class="marcador">$1</span>`);
                const span = document.createElement('span');
                span.innerHTML = newHTML;
                parent.replaceChild(span, node);
            }
        }

        // Rola até o primeiro destaque encontrado
        const highlighted = document.querySelector('.marcador');
        if (highlighted) {
            highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Limpa o campo de pesquisa
        searchInput.value = '';
    }

    function removeHighlights() {
        // Remove o destaque ao substituir os elementos de volta ao texto normal
        const highlights = document.querySelectorAll('.marcador');
        highlights.forEach((el) => {
            el.outerHTML = el.innerText; // Substitui o <span> pelo texto
        });
    }

    // Limpa o termo salvo no Local Storage quando o usuário clicar fora do campo de entrada
    document.addEventListener('click', (event) => {
        if (event.target !== searchInput) {
            localStorage.removeItem('searchTerm'); // Limpa o termo ao clicar fora
        }
    });
});
