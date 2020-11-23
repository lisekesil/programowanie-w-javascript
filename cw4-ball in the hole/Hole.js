export default class Hole {
    constructor(y, x) {
        this.y = y;
        this.x = x;
        this.holeHtml = null;
    }

    renderHole() {
        this.holeHtml = document.createElement('div');
        this.holeHtml.classList.add('hole');
        this.holeHtml.style.top = this.y + 'px';
        this.holeHtml.style.left = this.x + 'px';

        document.body.appendChild(this.holeHtml);
    }
}
