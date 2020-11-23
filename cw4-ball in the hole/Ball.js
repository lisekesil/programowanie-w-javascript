export default class Ball {
    constructor(x = 10, y = 10) {
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
    }

    ballSpeed(ev) {
        if (ev.alpha > 0) {
            this.speedX = ev.gamma / 30;
        } else if (ev.alpha < 0) {
            this.speedX = ev.gamma / 30;
        }

        if (ev.beta > 0) {
            this.speedY = ev.beta / 30;
        } else if (ev.beta < 0) {
            this.speedY = ev.beta / 30;
        }
    }
}
