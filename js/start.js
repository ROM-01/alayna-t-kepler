window.addEventListener("load", () => {
    const overlay = document.getElementById("transition-overlay");

    // Only fade out if coming from a link click
    if (sessionStorage.getItem("linkClicked") === "true") {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
        }, 500);

        sessionStorage.removeItem("linkClicked");
    } else {
        overlay.style.display = "none";
    }
});

const pageLinks = document.querySelectorAll("a");

pageLinks.forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("#")) {
            e.preventDefault();

            sessionStorage.setItem("linkClicked", "true");

            const overlay = document.getElementById("transition-overlay");
            overlay.style.display = "block";
            overlay.style.opacity = "1";

            setTimeout(() => {
                window.location.href = href;
            }, 500);
        }
    });
});


// Mouse Click Sound
const clickSound = new Audio('/audio/select-sound-121244.mp3');
clickSound.preload = 'auto';
clickSound.volume = 0.7;

document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(console.log);
});

// Elements
const sideMenuBtn = document.querySelector(".side-menu-btn");
const sideMenu = document.querySelector(".side-menu");
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("now-playing");

// Music playlist
const playlist = [
    { name: "Title Theme", src: "/audio/xDeviruchi - Title Theme .mp3" },
    { name: "Prepare for Battle!", src: "/audio/xDeviruchi - Prepare for Battle! .mp3" },
    { name: "Decisive Battle", src: "/audio/xDeviruchi - Decisive Battle.mp3" },
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

//PFP Stars Animation
const container = document.querySelector('.pfp-wrapper');

function shootSparkles(side) {
    const sparkleCount = 10;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        // Spread vertically
        sparkle.style.top = `${70 + Math.random() * 70}px`;
        const baseLeft = side === 'left' ? 20 : 70;
        const offset = (Math.random() - 0.5) * 20;
        sparkle.style.left = `${baseLeft + offset}%`;

        // Randomize slight angle
        sparkle.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg)`;

        sparkle.style.animationName = side === 'left' ? 'shoot-left' : 'shoot-right';
        sparkle.style.animationDuration = `${1 + Math.random()}s`;
        sparkle.style.animationTimingFunction = 'ease-out';

        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }
}
setInterval(() => {
    shootSparkles('left');
    shootSparkles('right');
}, 3000);


// Random Dev Quote
const quoteElement = document.querySelector(".dev-quote")
const usedIndexes = new Set()

const quotes = ['"The problem with the world is that the smart ones are skeptical, and the idiots have confidence." - Charles Bukowski', '"If you want the rainbow, you gotta put up with the rain.” - Dolly Parton', '"People cannot be knowledgeable about everything but they can be knowledgeable about the extent of their own ignorance" -Thomas Sowell', '"When exposing a crime is treated as committing a crime, you are being ruled by criminals” - Edward Snowden', '"If it\'s your job to eat a frog, it\'s best to do it first thing in the morning. And if it\'s your job to eat two frogs, it\'s best to eat the biggest one first." - Mark Twain', '"If you kill a killer, the number of killers in the world remains the same." - Batman', '"Talent without hard work is nothing." - Cristiano Ronaldo', '"We can\'t create something from nothingness." - David Hume'
]

function generateQuote() {
    if (!quoteElement) return;
    if (usedIndexes.size === quotes.length) {
        usedIndexes.clear();
    }
    let randomIdx;
    do {
        randomIdx = Math.floor(Math.random() * quotes.length);
    } while (usedIndexes.has(randomIdx));
    quoteElement.textContent = quotes[randomIdx];
    usedIndexes.add(randomIdx);
}
setInterval(generateQuote, 8000);

document.addEventListener("DOMContentLoaded", () => {

    // Highlight nav tab based on scroll position
    const navElements = document.querySelectorAll("#page-nav .nav-element");
    const sectionIds = Array.from(navElements).map(el =>
        el.querySelector("a").getAttribute("href").substring(1)
    );
    const observedSections = sectionIds
        .map(id => document.getElementById(id))
        .filter(Boolean);


    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navElements.forEach(el => {
                    const link = el.querySelector("a");
                    const hrefId = link.getAttribute("href").substring(1);

                    // Reset all nav elements
                    if (hrefId === id) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
    });

    observedSections.forEach(section => sectionObserver.observe(section));

    //Each Section Fade
    const sections = document.querySelectorAll(".section");

    const observerSection = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const isVisible = entry.isIntersecting;

            const alreadyVisible = section.dataset.visible === "true";

            if (isVisible && !alreadyVisible) {
                section.dataset.visible = "true";
                section.classList.add("visible");
            } else if (!isVisible && alreadyVisible) {
                section.dataset.visible = "false";
                section.classList.remove("visible");
            }
        });
    }, {
        threshold: 0
    });
    sections.forEach(section => {
        section.dataset.visible = "false";
        observerSection.observe(section);
    });
    setTimeout(() => {
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.classList.add("visible");
                section.dataset.visible = "true";
            }
        });
    }, 100);


    //Footer
    const today = new Date()
    const thisYear = today.getFullYear()
    const footer = document.createElement("footer")

    footer.innerHTML = `Alayna Taylor ${thisYear} &copy`
    document.querySelector(".connect-container").appendChild(footer)
})





