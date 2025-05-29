//Connect Form
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