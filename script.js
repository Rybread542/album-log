const addButton = document.querySelector('.new-button');

function Album(title, artist, rating) {
    this.title = title;
    this.artist = artist;
    this.rating = rating;
}


/****************Modal form initialization/close***************/

const modal = document.querySelector('.log-album-modal');
const modalBox = document.querySelector('.log-album-modal-container');
const closeModalButton = document.querySelector('.close-modal');
const titleField = document.querySelector('#title');
const artistField = document.querySelector('#artist');
const submitButton = document.querySelector('.log-album-submit-button');

addButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);



function openModal() {
    modal.style.opacity = '1';
    modal.style.zIndex = '99';

    modalBox.style.transform = 'translateY(0)';
    modalBox.style.opacity = '1';
    
    addStarsEvents();
}

function closeModal() {
    clearLogForm();
    modal.style.opacity = '0';
    modal.style.zIndex = '-99';
    modalBox.style.transform = 'translateY(2rem)';
    modalBox.style.opacity = '0';
}

function clearLogForm() {
    resetStars();
    formStars.removeEventListener('mouseout', starHold);
    titleField.value = '';
    artistField.value = '';
}



submitButton.addEventListener('click', async function(e) {
    e.preventDefault();
    const title = titleField.value;
    const artist = artistField.value;
    const album = new Album(title, artist, score);
    addNewAlbum(album);
    closeModal();
});



/*******************Star rating stuff********************/

const formStars = document.querySelector('.log-album-form-rating-stars');
const stars = Array.from(formStars.children);
let score = 0;
let starPosition = 0;

formStars.addEventListener('pointermove', function(e) {
    e.preventDefault();
    const rect = formStars.getBoundingClientRect();
    const mouseXPercentage = (e.clientX - rect.left) / (rect.right - rect.left);
    starPosition = ((mouseXPercentage * 10) / 2).toFixed(1);
    fillStars(starPosition);
});

function addStarsEvents() {
    formStars.addEventListener('mouseout', resetStars);
    formStars.addEventListener('click', () => {
        score = starPosition;
        formStars.removeEventListener('mouseout', resetStars);
        formStars.addEventListener('mouseout', starHold);
    })
}

function starHold() {
    fillStars(score);
}

function resetStars() {
    stars.forEach(function(star) {
        star.classList.remove('fa-solid');
        star.classList.remove('fa-star-half-stroke');
        star.classList.add('fa-star');
        star.classList.add('fa-regular');
    })
}

function makeWholeStar(star) {
    star.classList.remove('fa-star-half-stroke');
    star.classList.remove('fa-regular');
    star.classList.add('fa-star');
    star.classList.add('fa-solid');
}

function makeHalfStar(star) {
    star.classList.remove('fa-regular');
    star.classList.remove('fa-star');
    star.classList.add('fa-solid');
    star.classList.add('fa-star-half-stroke');
}

function fillStars(score){
    resetStars();
    if(score <= 0.5) {
        makeHalfStar(stars[0]);
    }

    else {
        nearestWhole = Math.round(score);
        for(i=0; i <= nearestWhole-1; i++) {
            makeWholeStar(stars[i]);
        }
        if((score - nearestWhole) > 0) {
            makeHalfStar(stars[nearestWhole]);
        }
    }
}

/***************Adding an album to the page*****************/

function createAlbumContainer() {
    const albumContainer = document.createElement('div');
    albumContainer.classList.add('album-container');

    const albumHoverRating = document.createElement('div');
    albumHoverRating.classList.add('album-hover-rating');

    const albumHoverText = document.createElement('div');
    albumHoverText.classList.add('album-hover-text');

    const albumImg = document.createElement('img');
    albumImg.classList.add('album-img')

    const albumHoverArtist = document.createElement('h4');
    albumHoverArtist.classList.add('album-hover-artist');

    const albumHoverTitle = document.createElement('p');
    albumHoverTitle.classList.add('album-hover-title')

    albumHoverText.appendChild(albumHoverArtist);
    albumHoverText.appendChild(albumHoverTitle);

    albumContainer.appendChild(albumHoverRating);
    albumContainer.appendChild(albumHoverText);
    albumContainer.appendChild(albumImg);

    return albumContainer;
}

async function fillAlbumContainer(container, artist, title, rating) {
    const albumRating = container.children[0];
    const albumText = container.children[1];
    const albumImg = container.children[2];

    setAlbumContainerRating(albumRating, rating);
    albumText.children[0].textContent = artist;
    albumText.children[1].textContent = title;

    albumImg.src = 'Jeff_Buckley_grace.jpg';
}

function setAlbumContainerRating(ratingContainer, rating){
    const halfStar = document.createElement('i');
    halfStar.classList.add('fa-solid', 'fa-star-half-stroke');

    nearestWhole = Math.round(rating);
    for (i=0; i<=nearestWhole-1; i++) {
        const star = document.createElement('i');
        star.classList.add('fa-solid', 'fa-star');
        ratingContainer.appendChild(star);
    }

    if((rating - nearestWhole) > 0) {
        ratingContainer.appendChild(halfStar);
    }
}

function addNewAlbum(album){
    let logPage;
    logPageSelected ? 
    logPage = document.querySelector('.log-page') 
    : 
    logPage = document.querySelector('.to-listen-page');

    const albumContainer = createAlbumContainer();
    fillAlbumContainer(albumContainer, album.artist, album.title, album.rating);
    logPage.appendChild(albumContainer);
}

/***************Switching lists*****************/

const albumContainer = document.querySelector('.album-pages-container');
const logPage = document.querySelector('.log-page');
const listenPage = document.querySelector('.to-listen-page');

const logTab = document.querySelector('.log-tab');
const listenTab = document.querySelector('.listen-tab');

let logPageSelected = true;

function displaySwap(originalPage, switchPage) {
    originalPage.style.display = 'none';
    switchPage.style.display = 'grid';
}

function colorSwap() {
    albumContainer.style.backgroundColor = logPageSelected ?
    'var(--to-listen-bg)' :
    'var(--log-container-bg)';
}

function changePages() {
    colorSwap();
    logPageSelected ? 
    displaySwap(logPage, listenPage)
    :
    displaySwap(listenPage, logPage);
}

listenTab.addEventListener('click', () => {
    changePages();
    logPageSelected = false;
});

logTab.addEventListener('click', () => {
    changePages();
    logPageSelected = true;
})


