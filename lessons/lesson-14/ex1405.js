/*function onButtonClicked(event) {
    if (event.target.id === "button-1") {
        console.log("The button you clicked is the first button");
    } else if (event.target.id === "button-2") {
        console.log("The button you clicked is the second button");
    } else if (event.target.id === "button-3") {
        console.log("The button you clicked is the third button");
    } else if (event.target.id === "button-4") {
        console.log("The button you clicked is the fourth button");
    } else {
        console.log("Unknown button clicked");
    }
}*/

function onButtonClicked(event) {
    let messageContainer = document.getElementById("message-container");
    let newMessage = document.createElement("p");

    if (event.target.id === "button-1") {
        newMessage.innerText = "The button you clicked is the first button";
    } else if (event.target.id === "button-2") {
        newMessage.innerText = "The button you clicked is the second button";
    } else if (event.target.id === "button-3") {
        newMessage.innerText = "The button you clicked is the third button";
    } else if (event.target.id === "button-4") {
        newMessage.innerText = "The button you clicked is the fourth button";
    } else {
        newMessage.innerText = "Unknown button clicked";
    }

    messageContainer.appendChild(newMessage);
}