const quoteElement = document.querySelector(".dev-quote")
const usedIndexes = new Set()

const quotes = ['"The problem with the world is that the smart ones are skeptical, and the idiots have confidence." - Charles Bukowski', '"If you want the rainbow, you gotta put up with the rain.” - Dolly Parton', '"People cannot be knowledgeable about everything but they can be knowledgeable about the extent of their own ignorance" -Thomas Sowell', '"When exposing a crime is treated as committing a crime, you are being ruled by criminals” - Edward Snowden', '"If it\'s your job to eat a frog, it\'s best to do it first thing in the morning. And if it\'s your job to eat two frogs, it\'s best to eat the biggest one first." - Mark Twain']

function generateQuote() {
    if (usedIndexes.size >= quotes.length) {
        usedIndexes.clear()
    }

    while (true) {
        const randomIdx = Math.floor(Math.random() * quotes.length)

        if (usedIndexes.has(randomIdx)) continue

        const quote = quotes[randomIdx]
        quoteElement.innerHTML = quote;
        usedIndexes.add(randomIdx)
        break
    }
}
generateQuote()


// Music Player
document.addEventListener("DOMContentLoaded", () => {
    const sideMenu = document.querySelector(".side-menu");

    window.toggleSideMenu = function () {
        sideMenu.classList.toggle("open");
    };
});

const playlist = [
    { name: "Title Theme", src: "/audio/xDeviruchi - Title Theme .wav" }, { name: "Prepare for Battle!", src: "/audio/xDeviruchi - Prepare for Battle! .wav" }, { name: "Decisive Battle", src: "/audio/xDeviruchi - Decisive Battle.wav" },
];

const audio = document.getElementById("audio");
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




//Accordion
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
            clearSideContent();
            return;
        }

        clearSideContent();

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
            video.style.width = "90%";
            video.style.maxHeight = "400px";
            expContent.append(video)
        } else if (header.id === "exp-item4") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspWalmart"
            expSkills.innerHTML = "&nbspTeamwork, Time-Management, Efficiency, Loyalty, Customer Service, Friendliness, Attention To Details"
            expCity.innerHTML = "&nbspChicago, IL"
            expDate.innerHTML = "&nbsp06/2021-08/2023"
        }

    })
})

resume.addEventListener("click", () => {
    window.open('/pdf/Alayna Resume.pdf', '_blank')
})

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

    toggleBtn.classList.add("collapsed");
    skillsTab.style.display = "none";

    toggleBtn.addEventListener("click", () => {
        const isCollapsed = toggleBtn.classList.toggle("collapsed");

        if (isCollapsed) {
            skillsTab.style.display = "none";
        } else {
            skillsTab.style.display = "block";
        }
        toggleBtn.classList.toggle("rotated");
    });

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
        "kotlin": "kotlin.svg",
        "lua": "lua.svg",
        "c#": "c-sharp.svg",
        "bootstrap": "bootstrap.svg",
        "react": "react.svg",
        "springboot": "springboot.svg",
        "flask": "flask.svg",
        "git": "git.svg",
        "github": "github.jpg",
        "android studio": "android-studio.svg",
        "roblox studio": "roblox-studio.svg",
        "unity": "unity.jpg",
        "visual studio code": "visual-code.svg",
        "docker": "docker.svg",
        "aws": "aws.svg",
        "mongodb": "mongodb.svg",
        "mysql": "mysql.svg"
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
        });
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
        removeButton.innerText = "remove"
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
        editButton.innerText = "edit"
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
})

// lesson 13
const mediaMap = {
    "alayna-t-kepler": {
        type: "image",
        src: "/images/project-1.png",
        alt: "Screenshot of Project One"
    },
    "course-application": {
        type: "image",
        src: "/images/coming-soon.jpg"
    },
    "crud_application": {
        type: "image",
        src: "/images/coming-soon.jpg"
    },
    "flower-gallery-tabs": {
        type: "video",
        src: "/videos/gallery-project-24.mov"
    },
    "game-of-life": {
        type: "video",
        src: "/videos/game-of-life.mov"
    },

};

const wip = {
    "alayna-t-kepler": {
        status: ""
    },
    "course-application": {
        type: "image",
        src: "/images/coming-soon.jpg"
    },
    "crud_application": {
        type: "image",
        src: "/images/coming-soon.jpg"
    },
    "flower-gallery-tabs": {
        type: "video",
        src: "/videos/gallery-project-24.mov"
    },
    "game-of-life": {
        type: "video",
        src: "/videos/game-of-life.mov"
    },
}

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

            if (media) {
                if (media.type === "image") {
                    mediaElement = `<img src="${media.src}" alt="${media.alt || data.name}">`;
                } else if (media.type === "video") {
                    mediaElement = `
        <video controls muted playsinline style="max-width: 100%; height: auto;">
            <source src="${media.src}" type="video/mp4">
            <source src="${media.src}" type="video/quicktime">
            Your browser does not support the video tag.
        </video>`;
                }
            }
            slide.innerHTML = `
    <h3>${data.name}</h3>
    ${mediaElement}
    <p>${data.description || "No description available."}</p>
    <a href="${data.html_url}" target="_blank">View on GitHub</a>`; track.appendChild(slide);
        });

        // Custom project
        const custom = document.createElement("div");
        custom.classList.add("carousel-slide");
        custom.innerHTML = `
    <h3>Horror Game</h3>
    <video controls muted playsinline style="max-width: 100%; height: auto;">
    <source src="/videos/horror-game.mov">
    Your browser does not support the video tag.
    </video>
    <p>Game built in Roblox Studio.</p>
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