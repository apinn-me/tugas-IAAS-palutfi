const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".curr-time");
const totTime = document.querySelector(".tot-time");
const volumeSlider = document.getElementById("volume-slider");
const volumeIcon = document.getElementById("volume-icon");

const songs = [
   "music/1.mp3",
  "music/Ariana Grande - supernatural (Official Music Video).mp3",
  "music/yung kai - 'Blue' (ft.MINNIE) Extended ver.. Official lyrics video.mp3",
  "music/enak susunya x band 4 band x sprinter [DRILL EDIT BY TAROO].mp3",
  "music/lagu4.mp3"
];

let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function loadSong(index) {
  audio.src = songs[index];
  audio.load();
}

function playPauseSong() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

playBtn.addEventListener("click", playPauseSong);

audio.addEventListener("play", () => {
  isPlaying = true;
  playBtn.classList.remove("fa-circle-play");
  playBtn.classList.add("fa-circle-pause");
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playBtn.classList.remove("fa-circle-pause");
  playBtn.classList.add("fa-circle-play");
});

nextBtn.addEventListener("click", () => {
  songIndex = isShuffle
    ? Math.floor(Math.random() * songs.length)
    : (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
});

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const duration = audio.duration || 0;

  progressBar.value = duration ? (current / duration) * 100 : 0;
  currTime.textContent = formatTime(current);
  totTime.textContent = formatTime(duration);
});

progressBar.addEventListener("input", () => {
  const duration = audio.duration || 0;
  audio.currentTime = (progressBar.value / 100) * duration;
});

audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextBtn.click();
  }
});

// Volume section
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
  updateVolumeIcon(audio.volume);
});

volumeIcon.addEventListener("click", () => {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeSlider.value = 0;
  } else {
    audio.volume = 0.5;
    volumeSlider.value = 50;
  }
  updateVolumeIcon(audio.volume);
});

function updateVolumeIcon(volume) {
  if (volume === 0) {
    volumeIcon.src = "https://img.icons8.com/ios/50/ffffff/mute--v1.png";
  } else if (volume < 0.5) {
    volumeIcon.src = "https://img.icons8.com/ios/50/ffffff/low-volume--v1.png";
  } else {
    volumeIcon.src = "https://img.icons8.com/ios/50/ffffff/high-volume--v1.png";
  }
}


function formatTime(seconds) {
  const mins = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

loadSong(songIndex);
updateVolumeIcon(audio.volume);
