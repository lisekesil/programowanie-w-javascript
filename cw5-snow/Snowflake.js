export default class Snowflake {
    constructor(x) {
        this.x = x;
        this.y = -100;
        this.radius = Math.random() * 10;
        this.speedY = Math.random() * 3;
        this.speedX = Math.random();
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
    }
}
