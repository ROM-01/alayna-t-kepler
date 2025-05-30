
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

    function setupRadioGroup(radios, setSelectedCallback) {
        radios.forEach(radio => {
            radio.addEventListener("click", () => {
                const selected = radio.dataset.selected === "true";
                clearRadio(radios);
                radio.dataset.selected = selected ? "false" : "true";
                radio.checked = !selected;
                setSelectedCallback(selected ? null : radio.value);
                filterGrid();
            });
        });
    }

    setupRadioGroup(levelRadios, val => selectedLevel = val);
    setupRadioGroup(typeRadios, val => selectedType = val);
    

    function filterGrid() {
        const gridItems = document.querySelectorAll("[data-level]"); // moved inside the function
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

    skillsTab.style.display = isCollapsed ? "none" : "block";
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
    const fragment = document.createDocumentFragment();

    skillList.forEach(skillName => {
        const element = document.createElement("div");
        element.className = "skills-content-element";
        element.textContent = skillName;

        const img = document.createElement("img");
        img.className = "skills-icon";
        img.alt = skillName;

        const key = skillName.toLowerCase();
        img.src = `/icons/skills/${iconMap[key] || `${key}.png`}`;

        element.appendChild(img);

        const data = skillData[skillName];
        if (data) {
            element.dataset.level = data.level;
            element.dataset.type = data.type;
        }
        fragment.appendChild(element);
    });

    grid.appendChild(fragment);
} })
