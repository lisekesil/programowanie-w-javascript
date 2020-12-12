class Snow {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.flakes = [];
    }

    init() {
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
        this.ctx.fillStyle = 'rgb(20,20,20)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < 50; i++) {
            this.flakes.push(new Snowflake());
        }
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.flakes.length; i++) {
            const flake = this.flakes[i];
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fillStyle = 'rgb(250,250,250)';
            this.ctx.fill();
        }

        this.update();

        window.requestAnimationFrame(() => this.draw());
    }

    update() {
        for (let i = 0; i < this.flakes.length; i++) {
            const flake = this.flakes[i];

            // flake.x += 1;
            flake.y += 1;
        }
    }
}

class Snowflake {
    constructor() {
        this.x = Math.random() * 1000;
        this.y = 0;
        this.radius = Math.random() * 10;
    }
}

const snow = new Snow();
snow.init();
