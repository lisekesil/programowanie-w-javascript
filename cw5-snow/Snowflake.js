export default class Snowflake {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = -200;
        this.radius = Math.random() * 10;
        this.speedY = (Math.random() + 0.5) * 2;
        this.speedX = Math.random() + 0.5;
        this.opacity = Math.random();
        this.direction = Math.random();
    }

    move() {
        this.y += this.speedY;

        if (this.direction >= 0.5) {
            this.x += this.speedX;
        } else {
            this.x -= this.speedX;
        }

        if (this.y > window.innerHeight || this.x < 0 || this.x > window.innerWidth) {
            this.x = Math.random() * window.innerWidth;
            this.y = -10;
        }
    }
}
