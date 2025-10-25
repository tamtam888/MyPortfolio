function onZoneClicked(zoneId) {
    let zoneElement = document.getElementById(zoneId);
    let messageText = zoneElement.textContent + " was clicked";

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.textContent = messageText;

    document.getElementById("main-body").appendChild(messageDiv);
}
