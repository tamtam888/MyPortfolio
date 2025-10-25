/*function onButtonClicked(event) {
    if (event.target.id === "button-1") {
        console.log("The button you clicked is button #1");
    } else {
        console.log("The button you clicked is not button #1");
    }
}
    */
function onButtonClicked(event) {
    let messageContainer = document.getElementById("message-container");
    let newMessage = document.createElement("p");

    if (event.target.id === "button-1") {
        newMessage.innerText = "The button you clicked is button #1";
    } else {
        newMessage.innerText = "The button you clicked is not button #1";
    }

    messageContainer.appendChild(newMessage);
}