const clickSound = new Audio('/audio/select-sound-121244.mp3')

clickSound.preload = 'auto'
clickSound.volume = 0.7

document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => {

    })
})



const button = document.getElementById("play-audio");
const music = document.getElementById("bg-music");
music.volume = 0.5

document.addEventListener("DOMContentLoaded", () => {
button.addEventListener("click", () => {
    localStorage.setItem("soundEnabled", "true");
    music.play().catch(error => {
        console.error("Playback failed:", error);
    });
})

// Play audio ONLY for Start and Credits
const newScreenAudio = new Audio("/audio/game-start-6104.mp3");
const startLink = document.getElementById("start-link");
const creditsLink = document.getElementById("credits-link");
let isPlaying = false;

[startLink, creditsLink].forEach(link => {
    link.addEventListener("click", () => {
        if (isPlaying) return;

        isPlaying = true;
        newScreenAudio.currentTime = 0;
        newScreenAudio.play().catch(() => { });

        newScreenAudio.onended = () => {
            isPlaying = false;
        };
    });
});


window.addEventListener("load", () => {
    const overlay = document.getElementById("transition-overlay");
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 500);
});

const pageLinks = document.querySelectorAll("a");

pageLinks.forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("#")) {
            e.preventDefault();
            const overlay = document.getElementById("transition-overlay");
            overlay.style.display = "block";
            overlay.style.opacity = "1"; // Fade in
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});

})
