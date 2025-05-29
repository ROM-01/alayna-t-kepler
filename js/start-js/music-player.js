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
async function loadSong(index, shouldPlay = true) {
    const { src, name } = playlist[index];
    if (audio.src !== location.origin + src) {
        audio.src = src;
        nowPlaying.textContent = `Now Playing: ${name}`;
    }

    if (shouldPlay && localStorage.getItem("soundEnabled") === "true") {
        try {
            await audio.play();
        } catch (err) {
            console.warn("Playback interrupted:", err.message);
        }
    }
}

// DOMContentLoaded init
window.addEventListener("DOMContentLoaded", () => {
    sideMenuBtn.classList.add("collapsed");
    sideMenu.style.display = "none";
    loadSong(currentIndex, false); // preload first song
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

// Autoplay next on end
audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});
