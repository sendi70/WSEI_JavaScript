const playButtons = document.querySelectorAll(".playButton");
const recordButtons = document.querySelectorAll(".recordButton");
const playAllButton = document.querySelector("#playAllButton");
const stopButton = document.querySelector("#stopButton");
let recordings = {};
let currentChannel = 0;

document.addEventListener('keypress', onKeyPress)
playAllButton.addEventListener('click', playAll)
stopButton.addEventListener('click', stopRecording)
recordButtons.forEach(element => {
    element.addEventListener('click', recordChannel)
});
playButtons.forEach(element => {
    element.addEventListener('click', playChannel)
});

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9'),
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
    if (currentChannel != 0)
        recordSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}

function recordChannel(e) {
    let startTime = Date.now();
    channelId = e.target.parentNode.id;
    currentChannel = channelId
    recordings[channelId] = { start: '', sounds: [] };
    recordings[channelId].start = startTime
}
function recordSound(sound) {
    let temp = recordings[currentChannel].sounds
    let startTime = recordings[currentChannel].start
    temp.push({ time: Date.now() - startTime, sound: sound })
    recordings[currentChannel].sounds = temp
}
function playChannel(e) {
    currentChannel = e.target.parentNode.id;
    sounds = recordings[currentChannel].sounds;
    sounds.forEach((notes) => { setTimeout(() => { playSound(notes.sound) }, notes.time); })
}

function playAll() {
    for (const [key, value] of Object.entries(recordings)) {
        value.sounds.forEach((notes) => { setTimeout(() => { playSound(notes.sound) }, notes.time); })
    }
}

function stopRecording() {
    currentChannel = 0
}