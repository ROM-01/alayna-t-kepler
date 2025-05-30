// Projects
const mediaMap = {
    "alayna-t-kepler": {
        type: "image",
        src: "/images/start/start-projects/project-1.png",
        alt: "Screenshot of Project One",
        status: "Completed"
    },
    "art-institute-of-chicago-gallery": {
        type: "image",
        src: "/images/start/start-projects/art-gallery.png",
        status: "Completed"
    },
    "backend-database-practice-application": {
        type: "image",
        src: "/images/start/start-projects/coming-soon.jpg",
        status: "Hiatus"
    },
    "guess-number-debugging-practice": {
        type: "image",
        src: "/images/start/start-projects/coming-soon.jpg",
        status: "Completed"
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

document.addEventListener("DOMContentLoaded", () => {
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
                    mediaElement = `<img src="${media.src}" alt="${media.alt || data.name}" loading="lazy">`;
                } else if (media.type === "video") {
                    mediaElement = `
                    <video controls muted playsinline style="max-width: 100%; height: auto;">
                        <source src="${media.src}" type="video/mp4">
                        <source src="${media.src}" type="video/quicktime">
                        Your browser does not support the video tag.
                    </video>`;
                } else if (media.type === "iframe") {
                    const videoId = new URL(media.src).pathname.split("/").pop();
                    const previewImg = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                    mediaElement = `
                    <div class="youtube-facade" data-video-id="${videoId}" style="position: relative; cursor: pointer;">
                        <img src="${previewImg}" alt="Video preview for ${data.name}" style="width: 100%; aspect-ratio: 16/9;">
                        <div class="play-button" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 60px;
                            height: 60px;
                            background: rgba(0, 0, 0, 0.7) url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMuMC9zdmciPjxwYXRoIGQ9Ik0yNC4xMzQ5IDExLjg2NTNDMjQuMTM0OSAxMC44Mjk0IDIyLjk3MTYgMTAuMTc4NiAyMi4xMDUzIDEwLjg4ODdMMTUuOTk0OSAxNS43ODg3QzE1LjE3MzYgMTYuNDY3NSAxNS4xNzM2IDE3LjUzMjUgMTUuOTk0OSAxOC4yMTEzTDIyLjEwNTMgMjMuMTEzMkMyMi45NzE2IDIzLjgyMzMgMjQuMTM0OSAyMy4xNzI1IDI0LjEzNDkgMjIuMTM2N1YxMS44NjUzWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=') no-repeat center;
                            background-size: 60%;
                            border-radius: 50%;
                        "></div>
                    </div>`;                
                } else {
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

        const horrorVideoSrc = "https://www.youtube.com/embed/uG9qZlexpaY";
        const videoId = new URL(horrorVideoSrc).pathname.split("/").pop();
        const previewImg = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        const mediaElement = `
    <div class="youtube-facade" data-video-id="${videoId}" style="position: relative; cursor: pointer;">
        <img src="${previewImg}" alt="Video preview for Horror Game" style="width: 100%; aspect-ratio: 16/9;">
        <div class="play-button" style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            background: rgba(0, 0, 0, 0.7) url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMuMC9zdmciPjxwYXRoIGQ9Ik0yNC4xMzQ5IDExLjg2NTNDMjQuMTM0OSAxMC44Mjk0IDIyLjk3MTYgMTAuMTc4NiAyMi4xMDUzIDEwLjg4ODdMMTUuOTk0OSAxNS43ODg3QzE1LjE3MzYgMTYuNDY3NSAxNS4xNzM2IDE3LjUzMjUgMTUuOTk0OSAxOC4yMTEzTDIyLjEwNTMgMjMuMTEzMkMyMi45NzE2IDIzLjgyMzMgMjQuMTM0OSAyMy4xNzI1IDI0LjEzNDkgMjIuMTM2N1YxMS44NjUzWiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=') no-repeat center;
            background-size: 60%;
            border-radius: 50%;
        "></div>
    </div>`;

        custom.innerHTML = `
    <h3>Horror Game</h3>
    ${mediaElement}
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

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            update();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            update();
        });
    }    

    update();
}

    document.addEventListener("click", (e) => {
        const target = e.target.closest(".youtube-facade");
        if (!target) return;

        const videoId = target.getAttribute("data-video-id");
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`;
        iframe.style = "width: 100%; aspect-ratio: 16 / 9;";
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");

        target.replaceWith(iframe);
    });
})