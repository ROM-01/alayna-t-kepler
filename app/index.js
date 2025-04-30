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

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let targetId = button.id + "-grid";

            buttons.forEach((btn) => {
                btn.style.backgroundColor = "white";
                btn.style.color = "black";
                
            });

            // Highlight the clicked button
            button.style.backgroundColor = "#43018a";
            button.style.color = "white";

            const targetElement = document.getElementById(targetId);
            if (targetElement && contentContainer) {

                const containerRect = contentContainer.getBoundingClientRect();
                const targetRect = targetElement.getBoundingClientRect();
                const scrollTop = contentContainer.scrollTop;

                const offset = targetRect.top - containerRect.top + scrollTop;

                contentContainer.scrollTo({
                    top: offset,
                    behavior: "smooth"
                });
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let selectedLevel = null;
    let selectedType = null;

    const levelRadios = document.querySelectorAll(".skills-radio");
    const typeRadios = document.querySelectorAll(".skills-radio1");
    const gridItems = document.querySelectorAll("[data-level]"); 

    levelRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.id.includes("nov")) selectedLevel = "nov";
            else if (radio.id.includes("int")) selectedLevel = "int";
            else if (radio.id.includes("adv")) selectedLevel = "adv";
            else selectedLevel = null;
            filterGrid();
        });
    });

    typeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.id.includes("front")) selectedType = "front";
            else if (radio.id.includes("back")) selectedType = "back";
            else if (radio.id.includes("game")) selectedType = "game";
            else selectedType = null;
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
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navElements = document.querySelectorAll("#page-nav .nav-element");

    const observer = new IntersectionObserver(entries => {
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
    }, {
        threshold: 0.6
    });

    sections.forEach(section => observer.observe(section));
});


