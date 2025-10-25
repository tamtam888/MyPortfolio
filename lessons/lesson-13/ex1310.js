function onBlueBtnClick(){
  let newBlueElement = document.createElement("div");
  let newText = document.createElement("span");
  let link = document.createElement("a");
  link.setAttribute("href", "https://www.w3schools.com/jsref/met_element_setattribute.asp");
  link.textContent = "learn more about atributes";
  newText.textContent = "The blue zone was clicked ";
  newText.appendChild(link);
  newBlueElement.appendChild(newText);
  newBlueElement.classList.add("new-zone", "blue-zone");
  //console.log(newBlueElement);
  let parent = document.getElementById("parent-zone");
  parent.appendChild(newBlueElement);
}

function onYellowBtnClick(){
  let newYellowElement = document.createElement("div");
  let newText = document.createElement("span");
  let link = document.createElement("a");
  link.setAttribute("href", "https://www.w3schools.com/jsref/met_element_setattribute.asp");
  link.textContent = "learn more about atributes";
  newText.textContent = "The yellow zone was clicked ";
  newText.appendChild(link);
  newYellowElement.appendChild(newText);
  newYellowElement.classList.add("new-zone", "yellow-zone");
  //console.log(newYellowElement);
  let parent = document.getElementById("parent-zone");
  parent.appendChild(newYellowElement);
}

function onRedBtnClick(){
  let newRedElement = document.createElement("div");
  let newText = document.createElement("span");
  let link = document.createElement("a");
  link.setAttribute("href", "https://www.w3schools.com/jsref/met_element_setattribute.asp");
  link.textContent = "learn more about atributes";
  newText.textContent = "The red zone was clicked ";
  newText.appendChild(link);
  newRedElement.appendChild(newText);
  newRedElement.classList.add("new-zone", "red-zone");
  //console.log(newRedElement);
  let parent = document.getElementById("parent-zone");
  parent.appendChild(newRedElement);
} 
  