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


document.addEventListener("DOMContentLoaded", () => {
button.addEventListener("click", () => {
    localStorage.setItem("soundEnabled", "true");
    music.volume = 0.9
    music.play().catch(error => {
        console.error("Playback failed:", error);
    });
})


window.addEventListener("load", () => {
    const overlay = document.getElementById("transition-overlay");
    overlay.style.opacity = "0";
    setTimeout(() => {
        overlay.style.display = "none";
    }, 1000);
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
            }, 1000);
        }
    });
});

})
