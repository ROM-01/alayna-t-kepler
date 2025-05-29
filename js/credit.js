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

const audio = document.getElementById("bg-music")

function loadSong() {
    if (localStorage.getItem("soundEnabled") === "true") {
        audio.play();
    };
    audio.play()
}
loadSong()

const clickSound = new Audio('/audio/select-sound-121244.mp3')

clickSound.preload = 'auto'
clickSound.volume = 0.7

document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => {
        console.log(e)
    })
})

const rose1 = document.getElementById("rose1")
const rose2 = document.getElementById("rose2")
const toggleBtn = document.querySelector(".toggle-btn")
const a = document.getElementsByTagName('a')
const changeSpan = document.getElementById('change')

toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    if (isDark) {
        // DARK MODE SETTINGS
        for (element = 0; element < a.length; element++) {
            a[element].style.color = 'white'
        }
        changeSpan.textContent = "horror 👀"
        changeSpan.style.color = "rgb(0, 224, 236)"
        changeSpan.style.fontSize = "1.5em"
        audio.src = "/audio/df97.mp3";
        rose2.src = "/images/credit/rose-upper-corner-left-dark.png";
        toggleBtn.textContent = "Light Mode";
    } else {
        // LIGHT MODE SETTINGS
        for (element = 0; element < a.length; element++) {
            a[element].style.color = 'black'
        }
        changeSpan.textContent = "flowers🌺"
        changeSpan.style.color = "rgb(236, 0, 110)"
        changeSpan.style.fontSize = "1em"
        audio.src = "/audio/8-bit-menu-slower.mp3";
        rose2.src = "/images/credit/rose-lower-corner-right.png";
        toggleBtn.textContent = "Dark Mode";
    }
    audio.play();
});

const musicData = [
    { name: "Krayzius & Brainstorm", song: "Virtual Boy" },
    { name: " David Renda", song: "8-bit Menu" },
    { name: "CORE", song: "Dead Feelings" },
    { name: "xDeviruchi", song: "Title Theme" },
    { name: "xDeviruchi", song: "Prepare For Battle!" },
    { name: "xDeviruchi", song: "Decisive Battle" },
];

// Populate Music
const musicContainer = document.getElementById("music-credits");
musicData.forEach(({ name, song }) => {
    const div = document.createElement("div");
    div.innerHTML = `
<span class="credit-name">${name}</span>
<span class="credit-song">${song}</span>
`;
    div.classList.add("music-entry");
    musicContainer.appendChild(div);
});