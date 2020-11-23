import Ball from './Ball.js';
import Hole from './Hole.js';

class Game {
    constructor() {
        this.ball = new Ball();
        this.holes = [];
        this.gameWidth = null;
        this.gameHeight = null;
        this.ballElement = document.querySelector('.ball');
        this.startTime = null;
        this.endTime = null;
    }

    init() {
        window.addEventListener('deviceorientation', (ev) => this.ball.ballSpeed(ev));

        this.startTime = Date.now();
        this.gameHeight = window.innerHeight - 60;
        this.gameWidth = window.innerWidth - 60;
        const hole = new Hole(200, 300);

        this.holes.push(hole);

        this.holes.forEach((hole) => hole.renderHole());
    }

    moveBall() {
        if (this.ball.x + this.ball.speedX < this.gameWidth && this.ball.x + this.ball.speedX > 0) {
            this.ball.x += this.ball.speedX;
            this.ballElement.style.left = this.ball.x + 'px';
        }
        if (
            this.ball.y + this.ball.speedY < this.gameHeight &&
            this.ball.y + this.ball.speedY > 0
        ) {
            this.ball.y += this.ball.speedY;
            this.ballElement.style.top = this.ball.y + 'px';
        }
        this.holes.forEach((hole) => {
            const a = hole.x + 40 - Math.floor(this.ball.x + 25);
            const b = hole.y + 40 - Math.floor(this.ball.y + 25);
            const c = Math.sqrt(a * a + b * b);

            if (25 > c) {
                this.endTime = Date.now();
                alert(`${(this.endTime - this.startTime) / 1000} sekund`);
            }
        });

        window.requestAnimationFrame(() => this.moveBall());
    }
}

const game = new Game();
game.init();
game.moveBall();
