import Ball from './Ball.js';
import Hole from './Hole.js';

class Game {
    constructor() {
        this.ball = new Ball();
        this.holes = [];
        this.numOfHoles = 3;
        this.gameHeight = window.innerHeight - 100;
        this.gameWidth = window.innerWidth - 100;
        // this.ballElement = document.querySelector('.ball');
        this.startTime = null;
        this.endTime = null;

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDuring = null;

        this.ui = {
            modal: document.querySelector('.modal'),
            result: document.querySelector('.result'),
            time: document.querySelector('.time'),
        };
    }

    init() {
        this.canvas.height = this.gameHeight;
        this.canvas.width = this.gameWidth;
        window.addEventListener('deviceorientation', (ev) => this.ball.ballSpeed(ev));
        const btn = document.querySelector('.btn');
        btn.addEventListener('click', () => this.startGame());
        this.startGame();
    }

    startGame() {
        this.ui.modal.style.display = 'none';
        this.isDuring = true;
        this.holes = [];
        this.createHoles();
        this.drawBoard();
        this.startTime = Date.now();

        this.ball.x = 50;
        this.ball.y = 50;
        this.moveBall();
    }

    createHoles() {
        for (let i = 0; i < this.numOfHoles; i++) {
            const y = Math.random() * this.gameHeight;
            const x = Math.random() * this.gameWidth;
            const hole = new Hole(y, x);
            this.holes.push(hole);
        }
    }

    drawHoles() {
        this.holes.forEach((hole, i) => {
            this.ctx.beginPath();
            this.ctx.arc(hole.x, hole.y, 40, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            if (i == 0) this.ctx.fillStyle = 'green';
            this.ctx.fill();
        });
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, 25, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.drawHoles();

        window.requestAnimationFrame(() => this.drawBoard());
    }

    moveBall() {
        if (this.ball.x + this.ball.speedX < this.gameWidth && this.ball.x + this.ball.speedX > 0) {
            this.ball.x += this.ball.speedX;
        }

        if (
            this.ball.y + this.ball.speedY < this.gameHeight &&
            this.ball.y + this.ball.speedY > 0
        ) {
            this.ball.y += this.ball.speedY;
        }

        this.checkIfWin();

        if (this.isDuring) window.requestAnimationFrame(() => this.moveBall());
    }

    checkIfWin() {
        this.holes.forEach((hole, i) => {
            const a = hole.x - Math.floor(this.ball.x);
            const b = hole.y - Math.floor(this.ball.y);
            const c = Math.sqrt(a * a + b * b);

            if (25 > c && i == 0) {
                this.holes.splice(i, 1);
            } else if (25 > c && i != 0) {
                this.showResult('PRZEGRAŁEŚ');
            }
        });

        if (this.holes.length == 0) {
            this.showResult('GRATULACJE');
        }
    }

    showResult(message) {
        this.endTime = Date.now();
        this.ui.result.innerHTML = message;
        this.ui.modal.style.display = 'flex';
        this.ui.time.innerHTML = `${(this.endTime - this.startTime) / 1000} sekund`;
        this.isDuring = false;
    }
}

const game = new Game();
game.init();
