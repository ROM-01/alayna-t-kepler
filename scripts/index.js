const accordionHeaders = document.querySelectorAll(".accordion-header")
const accordionContents = document.querySelectorAll(".accordion-content")

const expCompany = document.querySelector(".exp-company-text")
const expSkills = document.querySelector(".exp-skills-text")
const expContent = document.querySelector(".exp-content")
const expCity = document.querySelector(".exp-city-text")
const expDate = document.querySelector(".exp-date-text")
const resume = document.querySelector(".resume-pdf");


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
        }

        //updating company, skills, content

        if (header.id === "exp-item1") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspUnited Airlines"
            expSkills.innerHTML = "&nbspAWS,&nbspJava,&nbspSpringboot, Docker, Datadog"
            expCity.innerHTML = "&nbspChicago"
            expDate.innerHTML = "&nbsp01/2024-06/2024"
        } else if (header.id === "exp-item2") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspUnited Airlines"
            expSkills.innerHTML = "&nbspKotlin, Android Studio,&nbspJira"
            expCity.innerHTML = "&nbspChicago"
            expDate.innerHTML = "&nbsp05/2023-01/2024"
        } else if (header.id === "exp-item3") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspi.c.stars"
            expSkills.innerHTML = "&nbspHTML/CSS/JS, Unity, C#, AR, SQL, MongoDB"
            expCity.innerHTML = "&nbspChicago"
            expDate.innerHTML = "&nbsp01/2023-05/2023"
            const video = document.createElement("video")
            const source = document.createElement("source")
            source.setAttribute("src", "/videos/AR.mp4")
            video.append(source)
            video.setAttribute("autoplay", "")
            video.setAttribute("controls", "")
            video.setAttribute("height", "400vw")
            video.setAttribute("width", "300vw")
            expContent.append(video)
        } else if (header.id === "exp-item4") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }

            expCompany.innerHTML = "&nbspWalmart"
            expSkills.innerHTML = "&nbspTeamwork, Time-Management, Efficiency, Loyalty, Customer Service, Friendliness, Attention To Details"
            expCity.innerHTML = "&nbspChicago"
            expDate.innerHTML = "&nbsp06/2021-08/2023"
        }

    })
})

resume.addEventListener("click", () => {
    window.open('/pdf/Alayna Resume.pdf', '_blank')
})

document.addEventListener("DOMContentLoaded", () => {
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

    // Fix: Toggle radio visibility and restore layout on re-expand
    const toggleBtn = document.querySelector(".tab-btn-wrapper");
    const skillsTab = document.querySelector(".skills-tab");

    // 🔽 Start collapsed
    toggleBtn.classList.add("collapsed");
    skillsTab.style.display = "none";

    toggleBtn.addEventListener("click", () => {
        const isCollapsed = toggleBtn.classList.toggle("collapsed");

        if (isCollapsed) {
            skillsTab.style.display = "none";
        } else {
            skillsTab.style.display = "block";
        }

        // Rotate arrow
        toggleBtn.classList.toggle("rotated");
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

    // Page nav section tracking
    const sections = document.querySelectorAll("section");
    const navElements = document.querySelectorAll("#page-nav .nav-element");

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navElements.forEach(el => {
                    const link = el.querySelector("a");
                    const hrefId = link.getAttribute("href").substring(1);
                    el.classList.toggle("active", hrefId === id);
                });
            }
        });
    }, { threshold: 0.6 });

    sections.forEach(section => sectionObserver.observe(section));
});

//Lesson 11
const today = new Date()
const thisYear = today.getFullYear()
const footer = document.querySelector("footer")
const copyright = document.createElement("p")

copyright.innerHTML = `Alayna Taylor ${thisYear}©`

footer.appendChild(copyright)

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
    });
}