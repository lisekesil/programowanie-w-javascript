import Snowflake from './Snowflake.js';

class Snow {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.flakes = [];
        this.numOfFlakes = 500;
    }

    init() {
        this.ctx.canvas.width = this.width;
        this.ctx.canvas.height = this.height;
        this.ctx.fillStyle = 'rgb(20,20,20)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.makeSnowflakes();
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.flakes.forEach((flake) => {
            this.ctx.beginPath();

            this.ctx.arc(flake.x, flake.y, flake.radius, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fillStyle = `rgba(250,250,250, ${flake.opacity})`;
            this.ctx.fill();
        });
        // this.flakes.forEach((flake) => {
        //     this.ctx.save();
        //     this.ctx.fillStyle = `rgba(250,250,250, ${flake.opacity})`;
        //     this.ctx.beginPath();

        //     this.ctx.translate(flake.x, flake.y);
        //     this.ctx.moveTo(0, 0 - flake.radius);

        //     for (let i = 0; i < 10; i++) {
        //         this.ctx.rotate((Math.PI / 180) * 36);
        //         this.ctx.lineTo(0, 0 - flake.radius * 0.25);
        //         this.ctx.rotate((Math.PI / 180) * 36);
        //         this.ctx.lineTo(0, 0 - flake.radius);
        //     }

        //     this.ctx.fill();
        //     this.ctx.restore();
        // });

        this.updateSnowflakes();

        window.requestAnimationFrame(() => this.draw());
    }

    makeSnowflakes() {
        for (let i = 0; i < this.numOfFlakes; i++) {
            const snowflake = new Snowflake();
            this.flakes.push(snowflake);
        }
    }

    updateSnowflakes() {
        for (let i = 0; i < this.flakes.length; i++) {
            const flake = this.flakes[i];

            flake.move();
        }
    }
}

const snow = new Snow(document.getElementById('canvas'));
snow.init();
