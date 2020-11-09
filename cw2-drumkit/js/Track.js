export default class Track {
    constructor() {
        this.soundsArr = [];
    }

    recordTrack(soundObj) {
        this.soundsArr.push(soundObj);
    }

    clearTrack() {
        this.soundsArr = [];
    }

    playTrack() {
        this.soundsArr.forEach((sound) => {
            setTimeout(() => {
                sound.playSound();
            }, sound.time);
        });
    }
}
