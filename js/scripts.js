const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("duration");
const music = document.getElementById("music");
const shuffleButton = document.getElementById("shuffle");
const backwardButton = document.getElementById("backward");
const playButton = document.getElementById("play");
const forwardButton = document.getElementById("forward");
const repeatButton = document.getElementById("repeat");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");



const songs = [
    {
        name: '1',
        title: 'Ghazi',
        artist: 'Shadmehr Aghili'
    },
    {
        name: '2',
        title: 'Rafti',
        artist: ' Mohsen Ebrahimzadeh'
    },
    {
        name: '3',
        title: 'Khorshid Man',
        artist: 'Mahyar'
    },
    {
        name: '4',
        title: 'Hamseda',
        artist: 'Salar Aghili'
    },
    {
        name: '5',
        title: 'Darya',
        artist: 'Shahab sagheb'
    }
    
];


let playState = false;
let songIndex = 0;
let repeatState = 'OFF';
let shuffleState = false;




function playMusic() {
    playState = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute("title", "Pause");
    music.play();
}
function pauseMusic() {
    playState = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute("title", "Play");
    music.pause();
}

function loadSong(song) {
    currentTime.textContent = '0:00';
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.setAttribute('src', `./music/${song.name}.mp3`);
    cover.setAttribute('src', `./img/${song.name}.jpg`);
    progress.style.width = "0%";
}

function previousMusic(){
    songIndex --;
    if (songIndex === -1) {
        songIndex = songs.length -1;
    }
    // loadSong(songs[songIndex]);
    // if (playState === true) {
    //     music.play();
    // }
    if (shuffleState === true) {
        loadSong(songs[Math.floor(Math.random() * songs.length)]);
        if (playState === true) {
            music.play();
        }
    }
    else {
        loadSong(songs[songIndex]);
    }
    if (playState === true) {
        music.play();
    }
    
}

function nextMusic(){
    songIndex ++;
    // playButton.classList.replace('fa-pause', 'fa-play');
    if (songIndex === songs.length) {
        songIndex = 0;
        
    }
    if (shuffleState === true) {
        loadSong(songs[Math.floor(Math.random() * songs.length)]);
        if (playState === true) {
            music.play();
        }
    }
    else {
        loadSong(songs[songIndex]);
    }
    if (playState === true) {
        music.play();
    }
   
}



playButton.addEventListener("click", () => {
    playState ? pauseMusic() : playMusic();
});

function shuffleModeOn() {
    shuffleState = true;
    shuffleButton.style.color = 'black';
    shuffleButton.title = 'Shuffle on';
}
function shuffleModeOff() {
    shuffleState = false;
    shuffleButton.style.color = '#615f5f';
    shuffleButton.title = 'Shuffle off';

}

function handleRepeat() {
    // OFF - ONCE - INFINITY
    if (repeatState === 'OFF') {
        repeatState = 'ONCE';
        repeatButton.style.color = '#f53900';
        repeatButton.title = 'Repeat ONCE';
    }
    else if (repeatState === 'ONCE') {
        repeatState = 'INFINITY';
        repeatButton.style.color = '#000000';
        repeatButton.title = 'Repeat INFINITY';
    }
    else if (repeatState === 'INFINITY') {
        repeatState = 'OFF';
        repeatButton.style.color = '#615f5f';
        repeatButton.title = 'Repeat OFF';
    }
}

function handleMusicEnded() {
    if (repeatState === 'OFF') {
        nextMusic();
        pauseMusic();
    }
    else if (repeatState === 'ONCE') {
        music.currentTime = '0';
        music.play();
    }
    else if (repeatState === 'INFINITY') {
        nextMusic();
    }
}

function handleMusicProgress() {
    const currentDuration = Math.floor(music.currentTime);
    const currentMinutes = Math.floor(currentDuration / 60); 
    const currentSeconds = (currentDuration % 60).toString().padStart(2, '0');
    currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
    const progressPercent = (music.currentTime / music.duration * 100).toFixed(2);
    progress.style.width = `${progressPercent}%`;

}

function handleProgressbar (event) {
    const width = this.clientWidth;
    const horizontalMousePosition = event.offsetX;
    const durationTimes = music.duration;
    const newTime = (horizontalMousePosition / width) * durationTimes;
    music.currentTime = newTime.toString();
    
}

music.addEventListener("ended", handleMusicEnded);
music.addEventListener("timeupdate", handleMusicProgress);
music.addEventListener("loadedmetadata", () => {
    const durationTime = Math.floor(music.duration);
    const durationMinutes = Math.floor(durationTime / 60); 
    const durationSeconds = durationTime % 60;
    totalTime.textContent = `${durationMinutes}:${durationSeconds}`;
})
progressContainer.addEventListener("click", handleProgressbar)

forwardButton.addEventListener("click", nextMusic);
backwardButton.addEventListener("click", previousMusic);
shuffleButton.addEventListener("click", () => {
    shuffleState ? shuffleModeOff() : shuffleModeOn();
}); 
repeatButton.addEventListener("click", handleRepeat);
