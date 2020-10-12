const images = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const img = document.querySelector('.lightbox-img');

let indexImg;
let currentImg;

function showLightBox(ev) {
    lightbox.classList.add('visible');

    currentImg = ev.target;
    indexImg = parseInt(ev.target.dataset.index);

    setImageSrc(currentImg);
    toggleButtons();
}

function hideLightbox(ev) {
    if (ev.target.classList.contains('lightbox')) {
        lightbox.classList.remove('visible');
    }
}

function setImageSrc(currentImg) {
    let imgUrl = currentImg.src;
    img.src = imgUrl;
}

function changeImage(ev) {
    const btn = ev.target;

    if (btn == nextBtn || btn.parentElement == nextBtn) {
        indexImg++;
    } else if (btn == prevBtn || btn.parentElement == prevBtn) {
        indexImg--;
    }

    const change = document.querySelector(`[data-index="${indexImg}"]`);

    setImageSrc(change);
    toggleButtons();
}

function toggleButtons() {
    prevBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');

    if (indexImg == 1) {
        prevBtn.classList.add('hide');
    } else if (indexImg == images.length) {
        nextBtn.classList.add('hide');
    }
}

//event listeners

for (let idx = 0; idx < images.length; idx++) {
    const img = images[idx];
    img.addEventListener('click', showLightBox);
}

lightbox.addEventListener('click', hideLightbox);
nextBtn.addEventListener('click', changeImage);
prevBtn.addEventListener('click', changeImage);
