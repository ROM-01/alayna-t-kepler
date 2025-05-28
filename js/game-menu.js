// Music Player
document.addEventListener("DOMContentLoaded", () => {
    const sideMenu = document.querySelector(".side-menu");

    window.toggleSideMenu = function () {
        sideMenu.classList.toggle("open");
    };
});

const playlist = [{ name: "Title Theme", src: "/audio/xDeviruchi - Title Theme .wav" }, { name: "Prepare for Battle!", src: "/audio/xDeviruchi - Prepare for Battle! .wav" }, { name: "Decisive Battle", src: "/audio/xDeviruchi - Decisive Battle.wav" },

];

const audio = document.getElementById("audio");
audio.volume = 0;
const nowPlaying = document.getElementById("now-playing");
const nextBtn = document.getElementById("music-next-btn");
const prevBtn = document.getElementById("music-prev-btn");

let currentIndex = 0;

function loadSong(index) {
    audio.src = playlist[index].src;
    nowPlaying.textContent = "Now Playing: " + playlist[index].name;
    audio.play()
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentIndex);
});

// Autoplay next song when current ends
audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadSong(currentIndex);
});

window.addEventListener("DOMContentLoaded", () => {
    audio.src = playlist[0].src;
    audio.load(); // preload metadata/audio
});

loadSong(currentIndex)

document.addEventListener("DOMContentLoaded", () => {
    const sideMenuBtn = document.querySelector(".side-menu-btn");
    const sideMenu = document.querySelector(".side-menu");

    // Initial state
    sideMenuBtn.classList.add("collapsed");
    sideMenu.style.display = "none";

    sideMenuBtn.addEventListener("click", () => {
        const isCollapsed = sideMenuBtn.classList.toggle("collapsed");

        if (isCollapsed) {
            sideMenu.style.display = "none";
        } else {
            sideMenu.style.display = "block";
        }

        sideMenuBtn.classList.toggle("rotated");
    });
})