import Sound from './Sound.js';
import Track from './Track.js';
import UI from './UI.js';

export default class SoundKit extends UI {
    constructor() {
        super();
        this.recordTrackButtons = null;
        this.playTrackButtons = null;
        this.playAllButton = null;

        this.tracks = {
            t0: new Track(),
            t1: new Track(),
            t2: new Track(),
            t3: new Track(),
            t4: new Track(),
        };

        this.recordStartTime = null;
        this.currentTrack = null;
        this.isRecording = false;
    }

    init() {
        this.handleElements();
        this.addBtnsEventListeners();
    }

    handleElements() {
        this.recordTrackButtons = this.getElements(this.UiSelectors.recordBtns);
        this.playTrackButtons = this.getElements(this.UiSelectors.playBtns);
        this.playAllButton = this.getElement(this.UiSelectors.playAllBtn);
    }

    addBtnsEventListeners() {
        document.body.addEventListener('keypress', (ev) => this.onKeyPress(ev));

        this.recordTrackButtons.forEach((btn) => {
            btn.addEventListener('click', (ev) => this.onRecordBtnClick(ev));
        });

        this.playTrackButtons.forEach((btn) => {
            btn.addEventListener('click', (ev) => this.onPlayBtnClick(ev));
        });

        this.playAllButton.addEventListener('click', () => this.playAll());
    }

    onKeyPress(ev) {
        let sound;
        switch (ev.code) {
            case 'KeyA':
                sound = new Sound('boom', this.recordStartTime);
                break;
            case 'KeyS':
                sound = new Sound('clap', this.recordStartTime);
                break;
            case 'KeyD':
                sound = new Sound('hihat', this.recordStartTime);
                break;
            case 'KeyF':
                sound = new Sound('kick', this.recordStartTime);
                break;
            case 'KeyG':
                sound = new Sound('openhat', this.recordStartTime);
                break;
            case 'KeyH':
                sound = new Sound('ride', this.recordStartTime);
                break;
            case 'KeyJ':
                sound = new Sound('snare', this.recordStartTime);
                break;
            case 'KeyK':
                sound = new Sound('tink', this.recordStartTime);
                break;
            case 'KeyL':
                sound = new Sound('tom', this.recordStartTime);
                break;
        }
        if (sound) {
            if (this.isRecording) {
                this.tracks[this.currentTrack].recordTrack(sound);
            }
            sound.playSound();
        }
    }

    onRecordBtnClick(ev) {
        this.isRecording = !this.isRecording;

        if (this.isRecording) {
            this.currentTrack = ev.target.dataset.track;
            this.tracks[this.currentTrack].clearTrack();
            this.recordStartTime = Date.now();
            this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    //UI
    startRecording() {
        this.playTrackButtons.forEach((btn) => (btn.disabled = true));
        this.recordTrackButtons.forEach((btn) => {
            btn.dataset.track == this.currentTrack
                ? (btn.innerHTML = 'Stop')
                : (btn.disabled = true);
        });
        this.playAllButton.disabled = true;
    }

    //UI
    stopRecording() {
        this.playTrackButtons.forEach((btn) => {
            if (this.tracks[btn.dataset.track].soundsArr.length !== 0) btn.disabled = false;
        });
        this.recordTrackButtons.forEach((btn) => {
            btn.disabled = false;
            btn.innerHTML = 'Record';
        });

        Object.entries(this.tracks).forEach((track) => {
            const [key, value] = track;
            if (key === 't0') return;

            if (value.soundsArr.length !== 0) {
                this.playAllButton.disabled = false;
            }
        });
    }

    onPlayBtnClick(ev) {
        const track = ev.target.dataset.track;
        this.tracks[track].playTrack();
    }

    playAll() {
        this.tracks.t1.playTrack();
        this.tracks.t2.playTrack();
        this.tracks.t3.playTrack();
        this.tracks.t4.playTrack();
    }
}
