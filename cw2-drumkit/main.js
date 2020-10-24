const recordButton = document.querySelector('#recordBtn');
const playButton = document.querySelector('#playBtn');
const recordTrackButtons = document.querySelectorAll('.recordTrack');
const playTrackButtons = document.querySelectorAll('.playTrack');

let recordStartTime;

const tracks = {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
    t4: [],
};

let currentTrack;
let isRecording = false;

const onKeyPress = (ev) => {
    let soundName;
    switch (ev.code) {
        case 'KeyA':
            soundName = 'boom';
            break;
        case 'KeyS':
            soundName = 'clap';
            break;
        case 'KeyD':
            soundName = 'hihat';
            break;
        case 'KeyF':
            soundName = 'kick';
            break;
        case 'KeyG':
            soundName = 'openhat';
            break;
        case 'KeyH':
            soundName = 'ride';
            break;
        case 'KeyJ':
            soundName = 'snare';
            break;
        case 'KeyK':
            soundName = 'tink';
            break;
        case 'KeyL':
            soundName = 'tom';
            break;
    }
    if (soundName) {
        const soundTime = Date.now() - recordStartTime;
        const soundObj = {
            id: soundName,
            time: soundTime,
        };
        if (isRecording) {
            recordSound(currentTrack, soundObj);
        }
        playSound(soundName);
    }
};

const playSound = (id) => {
    const sound = document.querySelector('#' + id);
    sound.currentTime = 0;
    sound.play();
};

const recordSound = (track, soundObj) => {
    switch (track) {
        case 't0':
            tracks.t0.push(soundObj);
            break;
        case 't1':
            tracks.t1.push(soundObj);
            break;
        case 't2':
            tracks.t2.push(soundObj);
            break;
        case 't3':
            tracks.t3.push(soundObj);
            break;
        case 't4':
            tracks.t4.push(soundObj);
            break;
    }
};

const playTrack = (currentPlayTrack) => {
    for (let index = 0; index < tracks[currentPlayTrack].length; index++) {
        const soundObj = tracks[currentPlayTrack][index];
        setTimeout(() => {
            playSound(soundObj.id);
        }, soundObj.time);
    }
};

const onRecordBtnClick = (ev) => {
    isRecording = !isRecording;

    if (isRecording) {
        currentTrack = ev.target.dataset.track;
        tracks[currentTrack] = [];
        recordStartTime = Date.now();

        playTrackButtons.forEach((btn) => (btn.disabled = true));
        recordTrackButtons.forEach((btn) => {
            btn.dataset.track == currentTrack ? (btn.innerHTML = 'Stop') : (btn.disabled = true);
        });

        return;
    }

    playTrackButtons.forEach((btn) => (btn.disabled = false));
    recordTrackButtons.forEach((btn) => {
        btn.disabled = false;
        btn.innerHTML = 'Record';
    });
};

const onPlayBtnClick = (ev) => {
    const track = ev.target.dataset.track;

    playTrack(track);
};

document.body.addEventListener('keypress', onKeyPress);
recordTrackButtons.forEach((btn) => {
    btn.addEventListener('click', (ev) => onRecordBtnClick(ev));
});
playTrackButtons.forEach((btn) => {
    btn.addEventListener('click', (ev) => onPlayBtnClick(ev));
});
