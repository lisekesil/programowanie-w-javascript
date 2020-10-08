const images = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.btn prev');

for (let idx = 0; idx < images.length; idx++) {
    const img = images[idx];
    img.addEventListener('click', showLightBox);
}

function showLightBox(ev) {
    // const lightbox = document.querySelector('.lightbox');
    console.log(ev.target.nextElementSibling);
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;
    img.src = imgUrl;
    lightbox.classList.add('visible');
}

lightbox.addEventListener('click', hideLightbox);

function hideLightbox() {
    lightbox.classList.remove('visible');
}

// nextBtn.addEventListener('click', nextImg);
