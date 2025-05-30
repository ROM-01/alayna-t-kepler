// Elements
const sideMenuBtn = document.querySelector(".side-menu-btn");
const sideMenu = document.querySelector(".side-menu");
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("now-playing");

// Music playlist
const playlist = [
    { name: "Title Theme", src: "/audio/xDeviruchi - Title Theme .wav" },
    { name: "Prepare for Battle!", src: "/audio/xDeviruchi - Prepare for Battle! .wav" },
    { name: "Decisive Battle", src: "/audio/xDeviruchi - Decisive Battle.wav" },
];

let currentIndex = 0;
audio.volume = 0.3;

// Load and optionally play a song
function loadSong(index) {
    audio.src = playlist[index].src;
    nowPlaying.textContent = "Now Playing: " + playlist[index].name;
    if (localStorage.getItem("soundEnabled") === "true") {
        audio.play();
    };
}

// DOMContentLoaded init
window.addEventListener("DOMContentLoaded", () => {
    sideMenuBtn.classList.add("collapsed");
    sideMenu.style.display = "none";
    loadSong(currentIndex); // preload first song
});

// Side menu toggle
sideMenuBtn.addEventListener("click", () => {
    const collapsed = sideMenuBtn.classList.toggle("collapsed");
    sideMenu.style.display = collapsed ? "none" : "block";
    sideMenuBtn.classList.toggle("rotated");
});

// Music control buttons with event delegation
document.addEventListener("click", e => {
    if (e.target.id === "music-next-btn") {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadSong(currentIndex);
    } else if (e.target.id === "music-prev-btn") {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentIndex);
    }
});

// Autoplay next song when current ends
audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});

const startLink = document.querySelectorAll(".start-link");
const newScreenAudio = new Audio("/audio/game-start-6104.mp3");

startLink.forEach(link => {
    link.addEventListener("click", () => {
        newScreenAudio.currentTime = 0;
        newScreenAudio.play().catch(() => { });
    });
});
