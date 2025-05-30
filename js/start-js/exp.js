// Experience Accordion and Side Content
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
    const existingImage = expContent.querySelector("image")
    if (existingVideo) {
        existingVideo.remove();
    }
    if (existingImage) {
        existingImage.remove()
    }

    expCompany.innerHTML = "&nbspNone"
    expSkills.innerHTML = "&nbspNone"
    expCity.innerHTML = "&nbspNone"
    expDate.innerHTML = "&nbspNone"
    expContent.innerHTML = "Content:&nbspNone"
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

            /*const image = document.createElement("img")
            image.src = "/images/start/work-setup.jpeg"
            image.style.width = "12vw"
            image.style.height = "12vw"
            image.style.borderRadius = "10px"
            expContent.innerHTML = "Content: ";
            expContent.append(image)*/
        } else if (header.id === "exp-item3") {
            const existingVideo = expContent.querySelector("video")
            if (existingVideo) {
                existingVideo.remove();
            }
            expCompany.innerHTML = "&nbspi.c.stars"
            expSkills.innerHTML = "&nbspHTML/CSS/JS, Unity, C#, AR, SQL, MongoDB"
            expCity.innerHTML = "&nbspChicago, IL"
            expDate.innerHTML = "&nbsp01/2023-05/2023"
            const video = document.createElement("video");
            const source = document.createElement("source");
            source.setAttribute("src", "/videos/AR.mp4");
            source.setAttribute("type", "video/mp4");
            video.append(source);
            video.setAttribute("autoplay", "");
            video.setAttribute("controls", "");
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
            video.style.width = "90%";
            video.style.maxHeight = "400px";
            expContent.innerHTML = "Content: ";
            expContent.append(video);
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