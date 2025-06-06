//Dialog
const bell = document.querySelector(".bell-container img");
const dialog = document.getElementById("dialog");
const dialogText = document.querySelector(".dialog-textbox-bottom p");
const dialogExit = document.querySelector(".dialog-textbox-top img");
const bell_audio = new Audio('/audio/notification-sound.mp3')
const image = document.querySelector('.dialog-img')

let typingInterval;
let isDialogReady = false;
let currentDialogText = "";
let dia_audio = new Audio('/audio/medium-text-blip-14855.mp3');

// Dialog text mapping
const dialogData = {
    "#exp-item1": { 
        message: "I gained a deeper understanding of backend work with the best support from my manager. I'm still developing a desire and confidence in cloud development but will apply it when needed.",
        image: "/images/8-bit-me/8-bit-me-smile.png"
    },
    "#exp-item2": {
        message: `My first legit tech job. I overwhelmed and burnt myself out...but despite that, I'm improving and learning from my mistakes.  On the other hand, mobile development seems promising!`,
        image: "/images/8-bit-me/8-bit-me-smile.png"
    },
    "#exp-item3": {
        message: "Work Shift: 8a-8p, Mon-Fri, 4 months.  Include 1 hour commute to and from the city. Talk about dedication, many sleepless days. What I appreciate the most was getting to see the city.",
        image: "/images/8-bit-me/8-bit-me-smile.png"
    },
    "#exp-item4": {
        message: "Pain... that gave enough drive for change.",
        image: "/images/8-bit-me/8-bit-me-frown.png"
    },
    ".form-btn": {
            message: "Careful what you say, who's IP address is at risk here~ 😜 (joking...maybe)",
        image: "/images/8-bit-me/8-bit-me-smile.png"
        },
};

// Set up triggers
Object.keys(dialogData).forEach(selector => {
    const trigger = document.querySelector(selector);
    if (trigger) {
        trigger.addEventListener("click", () => {
            bell_audio.play();

            const dialogObj = dialogData[selector];
            currentDialogText = dialogObj.message;
            image.src = dialogObj.image; 
            isDialogReady = true;
            bell.src = "/icons/bell-color-notif.png";
            bell.style.cursor = "url('/icons/heart-click.png') 24 24, pointer";
        });
    }
});

// Back to Default
bell.addEventListener("click", () => {
    if (!isDialogReady) return;

    dialog.style.display = "flex";
    bell.src = "/icons/bell.png";
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
    dia_audio.loop = true
    dia_audio.play();

    typingInterval = setInterval(() => {
        if (index < text.length) {
            dialogText.textContent += text.charAt(index);
            index++;

        } else {
            clearInterval(typingInterval);
            dia_audio.pause();
        }
    }, 30);
}