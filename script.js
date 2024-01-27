const addButton = document.querySelector('.new-button');
const modal = document.querySelector('.log-album-modal');
const modalBox = document.querySelector('.log-album-modal-container');
const closeModalButton = document.querySelector('.close-modal');

function Album(title, artist) {
    this.title = title;
    this.artist = artist;
}

function openModal() {
    modal.style.opacity = '1';
    modal.style.zIndex = '99';

    modalBox.style.transform = 'translateY(0)';
    modalBox.style.opacity = '1';
}

function closeModal() {
    modal.style.opacity = '0';
    modal.style.zIndex = '-99';

    modalBox.style.transform = 'translateY(2rem)';
    modalBox.style.opacity = '0';
}

addButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);

