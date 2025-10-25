function createMessageElement(text) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.innerHTML = text + " WAS CLICKED... <a href='https://www.w3schools.com/jsref/met_element_setattribute.asp' target='_blank'>learn more about attributes</a>";
    return newMessage;
  }
  
  function addMessageToContainer(messageElement) {
    const messagesContainer = document.getElementById("message");
    messagesContainer.appendChild(messageElement);
  }
  
  function zone1Clicked() {
    const messageElement = createMessageElement("Blue Zone");
    addMessageToContainer(messageElement);
  }
  
  function zone2Clicked() {
    const messageElement = createMessageElement("Yellow Zone");
    addMessageToContainer(messageElement);
  }
  
  function zone3Clicked() {
    const messageElement = createMessageElement("Red Zone");
    addMessageToContainer(messageElement);
  }
  