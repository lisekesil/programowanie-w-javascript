import Snowflake from './Snowflake.js';

class Snow {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.flakes = [];
        this.numOfFlakes = 400;
        this.waves = 5;
        this.interval = null;
    }

    init() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.fillStyle = 'rgb(20,20,20)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.makeSnowflakes();
        this.interval = setInterval(() => {
            this.makeSnowflakes();
        }, 5000);
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.flakes.length; i++) {
            const flake = this.flakes[i];

            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fillStyle = `rgba(250,250,250, ${flake.opacity})`;
            this.ctx.fill();
        }

        this.update();

        window.requestAnimationFrame(() => this.draw());
    }

    makeSnowflakes() {
        if (this.flakes.length >= this.numOfFlakes * this.waves) {
            clearInterval(this.interval);
            return;
        }
        for (let i = 0; i < this.numOfFlakes; i++) {
            const snowflake = new Snowflake(Math.random() * window.innerWidth);
            this.flakes.push(snowflake);
        }
    }

    update() {
        for (let i = 0; i < this.flakes.length; i++) {
            const flake = this.flakes[i];

            flake.move();
        }
    }
}

const snow = new Snow();
snow.init();
