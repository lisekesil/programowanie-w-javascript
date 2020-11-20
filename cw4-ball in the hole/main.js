window.addEventListener('deviceorientation', onDeviceMove);

const ballElement = document.querySelector('.ball');
const ball = {
    x: 10,
    y: 10,
};

let speedX = 0,
    speedY = 0;

function porusz() {
    if (ball.x + speedX < window.innerWidth - 60 && ball.x + speedX > 0) {
        ball.x += speedX;
        ballElement.style.left = ball.x + 'px';
    }
    if (ball.y + speedY < window.innerHeight - 60 && ball.y + speedY > 0) {
        ball.y += speedY;
        ballElement.style.top = ball.y + 'px';
    }

    window.requestAnimationFrame(porusz);
}

function onDeviceMove(ev) {
    if (ev.alpha > 0) {
        speedX = ev.gamma / 30;
    } else if (ev.alpha < 0) {
        speedX = ev.gamma / 30;
    }

    if (ev.beta > 0) {
        speedY = ev.beta / 30;
    } else if (ev.beta < 0) {
        speedY = ev.beta / 30;
    }
}
porusz();

// gameInit();
