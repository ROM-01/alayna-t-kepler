const clickSound = new Audio('/audio/select-sound-121244.mp3')

clickSound.preload = 'auto'
clickSound.volume = 0.3

document.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => {

    })
})


const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".square");

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

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;

});

function animateCircles() {

    let x = coords.x;
    let y = coords.y;

    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
}
animateCircles();

const container = document.querySelector('.pfp-wrapper');

function shootSparkles(side) {
    const sparkleCount = 10; // sparkles count
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        // Spread vertically
        sparkle.style.top = `${70 + Math.random() * 70}px`;

        // Spread more horizontally from center
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



const quoteElement = document.querySelector(".dev-quote")
const usedIndexes = new Set()

const quotes = ['"The problem with the world is that the smart ones are skeptical, and the idiots have confidence." - Charles Bukowski', '"If you want the rainbow, you gotta put up with the rain.” - Dolly Parton', '"People cannot be knowledgeable about everything but they can be knowledgeable about the extent of their own ignorance" -Thomas Sowell', '"When exposing a crime is treated as committing a crime, you are being ruled by criminals” - Edward Snowden', '"If it\'s your job to eat a frog, it\'s best to do it first thing in the morning. And if it\'s your job to eat two frogs, it\'s best to eat the biggest one first." - Mark Twain', '"If you kill a killer, the number of killers in the world remains the same." - Batman', '"Talent without hard work is nothing." - Cristiano Ronaldo']

function generateQuote() {
    if (!quoteElement) return;

    if (usedIndexes.size >= quotes.length) {
        usedIndexes.clear();
    }

    let attempts = 0;
    while (attempts < 100) {
        const randomIdx = Math.floor(Math.random() * quotes.length);
        if (!usedIndexes.has(randomIdx)) {
            quoteElement.textContent = quotes[randomIdx];
            usedIndexes.add(randomIdx);
            break;
        }
        attempts++;
    }
}
setInterval(generateQuote, 8000);


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


// ["scroll", "click", "keydown", "mousemove"].forEach(evt => {
//     window.addEventListener(evt, () => {
//         audio.play();
//     }, { once: true });
// });



const accordionHeaders = document.querySelectorAll(".accordion-header")
const accordionContents = document.querySelectorAll(".accordion-content")

const expCompany = document.querySelector(".exp-company-text")
const expSkills = document.querySelector(".exp-skills-text")
const expContent = document.querySelector(".exp-content")
const expCity = document.querySelector(".exp-city-text")
const expDate = document.querySelector(".exp-date-text")
const resume = document.querySelector(".resume-pdf");

function clearSideContent() {
    const existingVideo = expContent.querySelector("video");
    if (existingVideo) {
        existingVideo.remove();
    }

    expCompany.innerHTML = "&nbspNone"
    expSkills.innerHTML = "&nbspNone"
    expCity.innerHTML = "&nbspNone"
    expDate.innerHTML = "&nbspNone"
}


accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
        const accordionItem = header.parentElement;
        const accordionContent = accordionItem.querySelector(".accordion-content")

        accordionContents.forEach((content) => {
            if (content !== accordionContent) {
                content.classList.remove("active")
                content.style.maxHeight = 0
            }
        })

        accordionContent.classList.toggle("active")

        if (accordionContent.classList.contains("active")) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"
        } else {
            accordionContent.style.maxHeight = "0"
            clearSideContent()
            return
        }
        clearSideContent()

        //Updating company, skills, content
        if (header.id === "exp-item1") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspUnited Airlines"
            expSkills.innerHTML = "&nbspAWS,&nbspJava,&nbspSpringboot, Docker, Datadog"
            expCity.innerHTML = "&nbspChicago, IL"
            expDate.innerHTML = "&nbsp01/2024-06/2024"
        } else if (header.id === "exp-item2") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspUnited Airlines"
            expSkills.innerHTML = "&nbspKotlin, Android Studio,&nbspJira"
            expCity.innerHTML = "&nbspChicago, IL"
            expDate.innerHTML = "&nbsp05/2023-01/2024"
        } else if (header.id === "exp-item3") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspi.c.stars"
            expSkills.innerHTML = "&nbspHTML/CSS/JS, Unity, C#, AR, SQL, MongoDB"
            expCity.innerHTML = "&nbspChicago, IL"
            expDate.innerHTML = "&nbsp01/2023-05/2023"
            const video = document.createElement("video")
            const source = document.createElement("source")
            source.setAttribute("src", "/videos/AR.mp4")
            video.append(source)
            video.setAttribute("autoplay", "")
            video.setAttribute("controls", "")
            video.style.width = "90%"
            video.style.maxHeight = "400px"
            expContent.innerHTML = "Content: "
            expContent.append(video)
        } else if (header.id === "exp-item4") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspWalmart"
            expSkills.innerHTML = "&nbspTeamwork, Detail Attention, Time-Management, Loyalty, Customer Service"
            expCity.innerHTML = "&nbspChicago, IL"
            expDate.innerHTML = "&nbsp06/2021-08/2023"
        }

    })
})

resume.addEventListener("click", () => {
    window.open('/pdf/Alayna Resume.pdf', '_blank')
})

document.addEventListener("DOMContentLoaded", () => {
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
        // Ensure the flag starts off as false
        section.dataset.visible = "false";
        observerSection.observe(section);
    });

    // Initial fade-in for already visible sections
    setTimeout(() => {
        sections.forEach(section => {
            if (section.getBoundingClientRect().top < window.innerHeight) {
                section.classList.add("visible");
                section.dataset.visible = "true";
            }
        });
    }, 100);

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

    const buttons = document.querySelectorAll(".skills-nav-btn");
    const contentContainer = document.querySelector(".skills-content-container");

    // Smooth scroll to grid section
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let targetId = button.id + "-grid";
            buttons.forEach((btn) => btn.classList.remove("active-skill-tab"));
            button.classList.add("active-skill-tab");

            const targetElement = document.getElementById(targetId);
            if (targetElement && contentContainer) {
                const containerRect = contentContainer.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                const scrollTop = contentContainer.scrollTop;
                const offset = targetRect.top - containerRect.top + scrollTop;

                contentContainer.scrollTo({ top: offset, behavior: "smooth" });
            }
        });
    });

    // Radio filter logic
    let selectedLevel = null;
    let selectedType = null;
    const levelRadios = document.querySelectorAll(".skills-radio1");
    const typeRadios = document.querySelectorAll(".skills-radio2");
    const gridItems = document.querySelectorAll("[data-level]");

    function clearRadio(radioGroup) {
        radioGroup.forEach(radio => {
            if (radio.dataset.selected === "true") {
                radio.checked = false;
                radio.dataset.selected = "false";
            }
        });
    }

    levelRadios.forEach(radio => {
        radio.addEventListener("click", () => {
            if (radio.dataset.selected === "true") {
                radio.checked = false;
                radio.dataset.selected = "false";
                selectedLevel = null;
            } else {
                clearRadio(levelRadios);
                radio.dataset.selected = "true";
                selectedLevel = radio.value;
            }
            filterGrid();
        });
    });

    typeRadios.forEach(radio => {
        radio.addEventListener("click", () => {
            if (radio.dataset.selected === "true") {
                radio.checked = false;
                radio.dataset.selected = "false";
                selectedType = null;

            } else {
                clearRadio(typeRadios);
                radio.dataset.selected = "true";
                selectedType = radio.value;
            }
            filterGrid();
        });
    });

    function filterGrid() {
        gridItems.forEach(item => {
            const level = item.dataset.level;
            const type = item.dataset.type;

            const levelMatch = !selectedLevel || selectedLevel === level;
            const typeMatch = !selectedType || selectedType === type;

            item.style.display = levelMatch && typeMatch ? "flex" : "none";
        });
    }

    const toggleBtn = document.querySelector(".tab-btn-wrapper");
    const skillsTab = document.querySelector(".skills-tab");
    const tabBtn = toggleBtn.querySelector(".tab-btn-icon");

    toggleBtn.classList.add("collapsed");
    skillsTab.style.display = "none";

    toggleBtn.addEventListener("click", () => {
        const isCollapsed = toggleBtn.classList.toggle("collapsed");

        if (isCollapsed) {
            skillsTab.style.display = "none";
            
        } else {
            skillsTab.style.display = "block";
            
        }
        tabBtn.classList.toggle("rotated");
    });

    // Highlight nav tab based on scroll position
    const skillSections = document.querySelectorAll(".grid");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id.split("-")[0];
            const navBtn = document.getElementById(id);
            if (entry.isIntersecting) {
                buttons.forEach(btn => btn.classList.remove("active-skill-tab"));
                navBtn.classList.add("active-skill-tab");
            }
        });
    }, { threshold: 0.5 });

    skillSections.forEach(section => observer.observe(section));

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
})

const today = new Date()
const thisYear = today.getFullYear()
const footer = document.createElement("footer")

footer.innerHTML = `Alayna Taylor ${thisYear} &copy`
document.querySelector(".connect-container").appendChild(footer)

//Dynamically add list/skill elements
const sections = {
    "lan-grid": [
        "Javascript", "HTML", "CSS", "Lua", "Python", "Java", "Kotlin", "C#"
    ],
    "frame-grid": [
        "Springboot", "React", "Angular", "Bootstrap", "Flask"
    ],
    "tools-grid": [
        "Git", "GitHub", "Android Studio", "Roblox Studio", "Unity", "Visual Studio Code", "Postman", "Docker"
    ],
    "database-grid": [
        "SQL", "MYSQL", "MongoDB", "AWS"
    ],
    "soft-grid": [
        "Detail-Oriented", "Effective Communication", "Time-Management", "Teamwork"
    ]
};

const iconMap = {
    "kotlin" : "kotlin.svg",
    "lua" : "lua.svg",
    "c#" : "c-sharp.svg",
    "bootstrap" : "bootstrap.svg",
    "react" : "react.svg",
    "springboot": "springboot.svg",
    "flask" : "flask.svg",
    "git" : "git.svg",
    "github" : "github.jpg",
    "android studio" : "android-studio.svg",
    "roblox studio" : "roblox-studio.svg",
    "unity" : "unity.jpg",
    "visual studio code" : "visual-code.svg",
    "docker" : "docker.svg",
    "aws" : "aws.svg",
    "mongodb" : "mongodb.svg",
    "mysql" : "mysql.svg"
}

const skillData = {
    //Lang
    "Javascript": { level: "nov", type: "front" },
    "HTML": { level: "int", type: "front" },
    "CSS": { level: "int", type: "front" },
    "Lua": { level: "int", type: "game" },
    "Python": { level: "nov", type: "back" },
    "Java": { level: "nov", type: "back" },
    "Kotlin": { level: "nov", type: "front" },
    "C#": { level: "nov", type: "game" },
    //Frame
    "Springboot": { level: "nov", type: "back" },
    "React": { level: "nov", type: "front" },
    "Angular": { level: "nov", type: "front" },
    "Bootstrap": { level: "nov", type: "front" },
    "Flask": { level: "nov", type: "back" },
    //Tools
    "Git": { level: "int", type: "" },
    "GitHub": { level: "int", type: "" },
    "Android Studio": { level: "nov", type: "" },
    "Roblox Studio": { level: "int", type: "game" },
    "Unity": { level: "nov", type: "game" },
    "Visual Studio Code": { level: "int", type: "" },
    "Postman": { level: "nov", type: "back" },
    "Docker": { level: "nov", type: "back" },
    //Database
    "SQL": { level: "nov", type: "back" },
    "MYSQL": { level: "nov", type: "back" },
    "MongoDB": { level: "nov", type: "back" },
    "AWS": { level: "nov", type: "back" },
    //Soft
    "Detail-Oriented": { level: "", type: "" },
    "Effective Communication": { level: "", type: "" },
    "Time-Management": { level: "", type: "" },
    "Teamwork": { level: "", type: "" },
}

for (const [gridId, skillList] of Object.entries(sections)) {
    const grid = document.getElementById(gridId);

    skillList.forEach(skillName => {
        const gridElement = document.createElement("div");
        gridElement.classList.add("skills-content-element");
        gridElement.innerHTML = skillName;

        const img = document.createElement("img");
        img.classList.add("skills-icon");
        img.alt = skillName;

        const iconKey = skillName.toLowerCase();
        const fileName = iconMap[iconKey] || `${iconKey}.png`;
        img.src = `/icons/${fileName}`;

        gridElement.appendChild(img);

        const data = skillData[skillName];
        if (data) {
            gridElement.setAttribute("data-level", data.level);
            gridElement.setAttribute("data-type", data.type);
        }

        grid.appendChild(gridElement);
    })
}

//lesson 12
const messageForm = document.querySelector('form[name = "leave_message"]')

messageForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    console.log(userName, userEmail, userMessage)

    const messageSection = document.getElementById("messages")
    const messageList = messageSection.querySelector("ul")

    const newMessage = document.createElement("li")
    newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a> 
    <span>: ${userMessage}</>`

    //Remove message
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "<span>remove</span>"
    removeButton.type = "button"
    //style
    removeButton.style.margin = "2px"
    removeButton.style.fontSize = "1vw"

    removeButton.addEventListener("click", () => {
        const entry = removeButton.parentNode
        entry.remove()
    })

    //Edit message
    const editButton = document.createElement("button");
    editButton.innerHTML = "<span>edit</span>"
    editButton.type = "button"
    //style
    editButton.style.margin = "10px"
    editButton.style.fontSize = "1vw"

    editButton.addEventListener("click", () => {
        const entry = editButton.parentNode
        const messageSpan = entry.querySelector("span");

        const newMessage = prompt("Edit your message:");

        if (newMessage !== null && newMessage.trim() !== "") {
            messageSpan.textContent = ` wrote: ${newMessage}`;
        }
    })

    newMessage.appendChild(editButton)
    newMessage.appendChild(removeButton)
    messageList.appendChild(newMessage)

    //Make messages visible
    messageSection.style.display = "block"

    //Clear form
    messageForm.reset()
})

// lesson 13
const mediaMap = {
    "alayna-t-kepler": {
        type: "image",
        src: "/images/project-1.png",
        alt: "Screenshot of Project One",
        status: "Completed"
    },
    "chicago-art-institute-open-api": {
        type: "image",
        src: "/images/coming-soon.jpg",
        status: "WIP"
    },
    "backend-database-practice-application": {
        type: "image",
        src: "/images/coming-soon.jpg",
        status: "Hiatus"
    },
    "crud_application": {
        type: "image",
        src: "/images/coming-soon.jpg",
        status: "Hiatus"
    },
    "flower-gallery-tabs": {
        type: "iframe",
        src: "https://youtube.com/embed/Q_7mot0U9gI",
        status: "Completed"
    },
    "game-of-life": {
        type: "iframe",
        src: "https://www.youtube.com/embed/jO6rMG_dVIw",
        status: "Completed"
    },
    "My-Projects-Application": {
        type: "image",
        src: "/images/coming-soon.jpg",
        status: "Hiatus"
    }

};

fetch("https://api.github.com/users/ROM-01/repos")
    .then(response => response.json())
    .then(data => {
        const excludedRepos = ["ROM-01"];
        const filtered = data.filter(repo => !excludedRepos.includes(repo.name));
        const track = document.querySelector(".carousel-track");

        filtered.forEach(data => {
            const slide = document.createElement("div");
            slide.classList.add("carousel-slide");

            const media = mediaMap[data.name];
            let mediaElement = "";
            let wipBadge = "";

            if (!media) {
                mediaElement = `<img src="/images/coming-soon.jpg" alt="Coming Soon for ${data.name}">`;
            } else {
                if (media.type === "image") {
                    mediaElement = `<img src="${media.src}" alt="${media.alt || data.name}">`;
                } else if (media.type === "video") {
                    mediaElement = `
                    <video controls muted playsinline style="max-width: 100%; height: auto;">
                        <source src="${media.src}" type="video/mp4">
                        <source src="${media.src}" type="video/quicktime">
                        Your browser does not support the video tag.
                    </video>`;
                } else if (media.type === "iframe") {
                    mediaElement = `
                    <iframe src="${media.src}?controls=0&modestbranding=1&rel=0&showinfo=0"
                            style="width: 50vw; height:30vw;" 
                            frameborder="0" 
                            allowfullscreen></iframe>`;
                } else if (media.type === "none") {
                    mediaElement = `<img src="/images/coming-soon.jpg" alt="${media.alt || data.name}">`;
                }

                if (media.status) {
                    wipBadge = `<div class="wip-badge">${media.status}</div>`;
                }
            }

            slide.innerHTML = `
                <h3>${data.name}</h3>
                ${mediaElement}<br><br>Status: ${wipBadge || "N/A"}
                <p>Description: <br> ${data.description || "No description available."}</p>
                <br>
                <a href="${data.html_url}" target="_blank">View on GitHub</a>
            `;

            track.appendChild(slide);
        });

        // Custom project
        const custom = document.createElement("div");
        custom.classList.add("carousel-slide");
        custom.innerHTML = `
    <h3>Horror Game</h3>
    <iframe src="https://www.youtube.com/embed/uG9qZlexpaY"?controls=0&modestbranding=1&rel=0&showinfo=0 style="width: 50vw; height:30vw;" frameborder="0" allowfullscreen>
    </iframe>
    <p>Status: <br>Hiatus</p>
    <p>Description: <br>Game built in Roblox Studio. Everything seen in this video was built by me except the game menu background image. <br> What's the story about? I'm not telling.</p>
    
    <br>
    <p>Code not available.</p>`;
        track.appendChild(custom);

        setupCarousel();
    }).catch(error => {
        console.error('Error:', error)
    });

function setupCarousel() {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    let index = 0;

    const update = () => {
        const offset = -index * 100;
        track.style.transform = `translateX(${offset}%)`;
    };

    document.querySelector(".next").addEventListener("click", () => {
        index = (index + 1) % slides.length;
        update();
    });

    document.querySelector(".prev").addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
    });

    update();
}

//Dialog
const bell = document.querySelector(".bell-container img");
const dialog = document.getElementById("dialog");
const dialogText = document.querySelector(".dialog-textbox-bottom p");
const dialogExit = document.querySelector(".dialog-textbox-top img");
const bell_audio = new Audio('/audio/notification-sound.mp3')

let typingInterval;
let isDialogReady = false;
let currentDialogText = "";
let dia_audio = new Audio('/audio/medium-text-blip-14855.mp3');

// Dialog text mapping
const dialogData = {
    "#exp-item1": "Gained more backend knowledge with the best support from my manager.  Although... I'm unsure about the cloud development expertise, would use when necessary.",
    "#exp-item2": `My first legit tech job. I overwhelmed and burnt myself out...but despite that, I'll improve and learn from my mistakes.  On the other hand, mobile development seems promising!`,
    "#exp-item3": "Work Shift: 8a-8p, Mon-Fri, 4 months.  Include 1 hour commute to and from the city. Talk about dedication, many sleepless days.  What I appreciate the most from this program was the opening to a new world I never knew existed, the city life.",
    "#exp-item4": "Pain... that gave enough drive for change.",
    ".form-btn": "Careful what you say, who's IP address is at risk here~ 😜 (joking...maybe)"
};

// Set up triggers
Object.keys(dialogData).forEach(selector => {
    const trigger = document.querySelector(selector);
    if (trigger) {
        trigger.addEventListener("click", () => {
            bell_audio.play()
            currentDialogText = dialogData[selector];
            isDialogReady = true;
            bell.src = "/icons/bell-notif.png";
            bell.style.cursor = "url('/icons/heart-click.png') 24 24, pointer";
        });
    }
});

// Back to Default
bell.addEventListener("click", () => {
    if (!isDialogReady) return;

    dialog.style.display = "flex";
    bell.src = "/icons/bell (2).png";
    bell.style.cursor = "url('/icons/heart.png') 24 24, pointer";
    isDialogReady = false;

    startTyping(currentDialogText);
});

// Exit button
dialogExit.addEventListener("click", () => {
    dialog.style.display = "none";
    clearInterval(typingInterval);
    dia_audio.pause();
    dia_audio.currentTime = 0;
    dialogText.textContent = "";
});

// Typewriter effect with sound
function startTyping(text) {
    let index = 0;
    dialogText.textContent = "";
    clearInterval(typingInterval);

    dia_audio.currentTime = 0;
    dia_audio.play();

    typingInterval = setInterval(() => {
        if (index < text.length) {
            dialogText.textContent += text.charAt(index);
            index++;
            
        } else {
            clearInterval(typingInterval);
            dia_audio.pause();
        }
    }, 50);
}


