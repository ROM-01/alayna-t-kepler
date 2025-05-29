


// Mouse Click Sound
const clickSound = new Audio('/audio/select-sound-121244.mp3');
clickSound.preload = 'auto';
clickSound.volume = 0.7;

document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(console.log);
});

// Mouse Trail
const coords = { x: 0, y: 0 };
const squares = document.querySelectorAll(".square");

const colors = [
    "#f794e5",
    "#f794e5",
    "#e48ef4",
    "#d1b3ff",
    "#d37bf7",
    "#b3a1ff",
    "#a398ff",
    "#938eff",
    "#8385ff",
    "#737bff",
    "#6381ff",
    "#5397ff",
    "#43adff",
    "#33c3ff",
    "#23d9ff",
    "#13efff",
    "#0fffff", 
    "#1fffe5",
    "#3fffcc",
    "#5fffb3",
    "#7fff99"
];

squares.forEach(function (square, index) {
    square.x = 0;
    square.y = 0;
    square.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;

});

function animateSquares() {

    let x = coords.x;
    let y = coords.y;

    squares.forEach(function (square, index) {
        square.style.left = x - 12 + "px";
        square.style.top = y - 12 + "px";

        square.style.scale = (squares.length - index) / squares.length;

        square.x = x;
        square.y = y;

        const nextSquare = squares[index + 1] || squares[0];
        x += (nextSquare.x - x) * 0.3;
        y += (nextSquare.y - y) * 0.3;
    });
    requestAnimationFrame(animateSquares);
}
animateSquares();


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

const quotes = ['"The problem with the world is that the smart ones are skeptical, and the idiots have confidence." - Charles Bukowski', '"If you want the rainbow, you gotta put up with the rain.” - Dolly Parton', '"People cannot be knowledgeable about everything but they can be knowledgeable about the extent of their own ignorance" -Thomas Sowell', '"When exposing a crime is treated as committing a crime, you are being ruled by criminals” - Edward Snowden', '"If it\'s your job to eat a frog, it\'s best to do it first thing in the morning. And if it\'s your job to eat two frogs, it\'s best to eat the biggest one first." - Mark Twain', '"If you kill a killer, the number of killers in the world remains the same." - Batman', '"Talent without hard work is nothing." - Cristiano Ronaldo']

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
        threshold: [0.3, 0.6, 0.9, 1],
    });

    observedSections.forEach(section => sectionObserver.observe(section));

    //Each Section Fade
    const sections = document.querySelectorAll(".section");

    const observerSection = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const isVisible = entry.isIntersecting;

            // Convert string to boolean safely
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
        threshold: 0.1
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





