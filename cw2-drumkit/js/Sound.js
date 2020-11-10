// const sounds = document.querySelectorAll('.sound');
export default class Sound {
    constructor(soundName, recordStartTime) {
        this.soundName = soundName;
        this.time = Date.now() - recordStartTime;
        this.sounds = document.querySelectorAll('.sound');
    }

    playSound() {
        const audio = document.querySelector('#' + this.soundName);
        audio.currentTime = 0;
        audio.play();

        this.playSoundEffect();
    }

    playSoundEffect() {
        this.sounds.forEach((sound) => {
            if (this.soundName == sound.textContent) {
                sound.parentElement.classList.add('soundActive');
                setTimeout(() => {
                    sound.parentElement.classList.remove('soundActive');
                }, 150);
            }
        });
    }
}
