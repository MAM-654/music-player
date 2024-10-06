//*-------------- initialize's section --------------*//
const mainCard = document.getElementById("player");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("duration");
const music = document.getElementById("music");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const shuffleButton = document.getElementById("shuffle");
const backwardButton = document.getElementById("backward");
const playButton = document.getElementById("play");
const forwardButton = document.getElementById("forward");
const repeatButton = document.getElementById("repeat");
const heartButton = document.getElementById("heart");

let shuffleMusic = [];
let playState = false;
let songIndex = 0;
let repeatState = "OFF";
let shuffleState = false;
let likeState = false;
let likes = [];
const likeChecker = [];

//*-------------- songs data --------------*//
const songs = [
  {
    name: "1",
    title: "Ghazi",
    artist: "Shadmehr Aghili",
  },
  {
    name: "2",
    title: "Rafti",
    artist: " Mohsen Ebrahimzadeh",
  },
  {
    name: "3",
    title: "Khorshid Man",
    artist: "Mahyar",
  },
  {
    name: "4",
    title: "Hamseda",
    artist: "Salar Aghili",
  },
  {
    name: "5",
    title: "Darya",
    artist: "Shahab sagheb",
  },
];

//*-------------- function's section --------------*//

function handleShuffle() {
  shuffleButton.style.color = shuffleState ? "#fbfbfbbb" : "#000000";
  shuffleState = shuffleState ? false : true;
  const generatedIndex = [];
  if (shuffleState) {
    for (let counter = 0; counter < songs.length; ) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      if (!generatedIndex.includes(randomIndex)) {
        generatedIndex.push(randomIndex);
        shuffleMusic.push(songs[randomIndex]);
        counter++;
      }
    }
  } else {
    shuffleMusic = [];
  }
}

function playMusic() {
  playState = true;
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "Pause");
  music.play();
}
function pauseMusic() {
  playState = false;
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
  music.pause();
}

function loadSong(song) {
  currentTime.textContent = "0:00";
  title.textContent = song.title;
  artist.textContent = song.artist;
  music.setAttribute("src", `./music/${song.name}.mp3`);
  cover.setAttribute("src", `./img/${song.name}.jpg`);
  progress.style.width = "0%";
}

function previousMusic() {
  if (likeState === true) {
    let currentIndex = songIndex;
    handleLikesList(currentIndex);
    handleLikes();
  } else {
    let thisIndex = songIndex;
    removeLikes(thisIndex);
  }
  songIndex--;
  if (songIndex === -1) {
    songIndex = songs.length - 1;
  }
  if (likeChecker.includes(songIndex)) {
    heartButton.classList.replace("far", "fas");
    handleLikes();
  }
  if (shuffleState) {
    loadSong(shuffleMusic[songIndex]);
  } else {
    loadSong(songs[songIndex]);
  }
  if (playState === true) {
    music.play();
  }
}

function nextMusic() {
  if (likeState === true) {
    let currentIndex = songIndex;
    handleLikesList(currentIndex);
    handleLikes();
  } else {
    let thisIndex = songIndex;
    removeLikes(thisIndex);
  }
  songIndex++;

  if (songIndex === songs.length) {
    songIndex = 0;
  }
  if (likeChecker.includes(songIndex)) {
    heartButton.classList.replace("far", "fas");
    handleLikes();
  }
  if (shuffleState) {
    loadSong(shuffleMusic[songIndex]);
  } else {
    loadSong(songs[songIndex]);
  }
  if (playState === true) {
    music.play();
  }
}

function shuffleModeOn() {
  shuffleState = true;
  shuffleButton.style.color = "black";
  shuffleButton.title = "Shuffle on";
}
function shuffleModeOff() {
  shuffleState = false;
  shuffleButton.style.color = "#fbfbfbbb";
  shuffleButton.title = "Shuffle off";
}

function handleRepeat() {
  // OFF - ONCE - INFINITY
  if (repeatState === "OFF") {
    repeatState = "ONCE";
    repeatButton.style.color = "#f53900";
    repeatButton.title = "Repeat ONCE";
  } else if (repeatState === "ONCE") {
    repeatState = "INFINITY";
    repeatButton.style.color = "#000000";
    repeatButton.title = "Repeat INFINITY";
  } else if (repeatState === "INFINITY") {
    repeatState = "OFF";
    repeatButton.style.color = "#fbfbfbbb";
    repeatButton.title = "Repeat OFF";
  }
}

function handleMusicEnded() {
  if (repeatState === "OFF") {
    nextMusic();
    pauseMusic();
  } else if (repeatState === "ONCE") {
    music.currentTime = "0";
    music.play();
  } else if (repeatState === "INFINITY") {
    nextMusic();
  }
}

function handleMusicProgress() {
  const currentDuration = Math.floor(music.currentTime);
  const currentMinutes = Math.floor(currentDuration / 60);
  const currentSeconds = (currentDuration % 60).toString().padStart(2, "0");
  currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
  const progressPercent = ((music.currentTime / music.duration) * 100).toFixed(
    2
  );
  progress.style.width = `${progressPercent}%`;
}

function handleProgressbar(event) {
  const width = this.clientWidth;
  const horizontalMousePosition = event.offsetX;
  const durationTimes = music.duration;
  const newTime = (horizontalMousePosition / width) * durationTimes;
  music.currentTime = newTime.toString();
}

function handleLikes() {
  if (likeState === false) {
    likeState = true;
    heartButton.classList.replace("far", "fas");
    heartButton.title = "dislike";
  } else if (likeState === true) {
    likeState = false;
    heartButton.classList.replace("fas", "far");
    heartButton.title = "like";
  }
}
function handleLikesList(index) {
  if (likeState === true) {
    if (!likeChecker.includes(index)) {
      likeChecker.push(index);
      likes.push(songs[index]);
    }
  }
}
function removeLikes(element) {
  if (likeChecker.includes(element)) {
    let remove = likeChecker.indexOf(element);
    if (remove === 0) {
      likeChecker.shift();
    } else if (remove === likeChecker.length - 1) {
      likeChecker.pop();
    } else {
      let firstList = likeChecker.slice(1, remove + 1);
      let secondList = likeChecker.slice(remove + 2);
      likeChecker = firstList.concat(secondList);
    }
  }
}

//*-------------- event's section --------------*//

playButton.addEventListener("click", () => {
  playState ? pauseMusic() : playMusic();
});

music.addEventListener("ended", handleMusicEnded);
music.addEventListener("timeupdate", handleMusicProgress);
music.addEventListener("loadedmetadata", () => {
  const durationTime = Math.floor(music.duration);
  const durationMinutes = Math.floor(durationTime / 60);
  const durationSeconds = durationTime % 60;
  totalTime.textContent = `${durationMinutes}:${durationSeconds}`;
});
progressContainer.addEventListener("click", handleProgressbar);

forwardButton.addEventListener("click", nextMusic);
backwardButton.addEventListener("click", previousMusic);
repeatButton.addEventListener("click", handleRepeat);
heartButton.addEventListener("click", handleLikes);
shuffleButton.addEventListener("click", handleShuffle);

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
});

mainCard.addEventListener("mouseleave", (event) => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
});
