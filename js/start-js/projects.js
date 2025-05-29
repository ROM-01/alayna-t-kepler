// Projects
const mediaMap = {
    "alayna-t-kepler": {
        type: "image",
        src: "/images/start/start-projects/project-1.png",
        alt: "Screenshot of Project One",
        status: "Completed"
    },
    "chicago-art-institute-open-api": {
        type: "image",
        src: "/images/start/start-projects/coming-soon.jpg",
        status: "WIP"
    },
    "backend-database-practice-application": {
        type: "image",
        src: "/images/start/start-projects/coming-soon.jpg",
        status: "Hiatus"
    },
    "crud_application": {
        type: "image",
        src: "/images/start/start-projects/coming-soon.jpg",
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
        src: "/images/start/start-projects/coming-soon.jpg",
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
                mediaElement = `<img src="/images/start/start-projects/coming-soon.jpg" alt="Coming Soon for ${data.name}">`;
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
                    mediaElement = `<img src="/images/start/start-projects/coming-soon.jpg" alt="${media.alt || data.name}">`;
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