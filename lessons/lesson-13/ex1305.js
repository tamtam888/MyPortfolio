function zoneClicked(zone) {
  
    let newElement = document.createElement("div");
    newElement.textContent = zone.textContent + " WAS CLICKED...";
    newElement.classList.add("message");
    
    
    zone.appendChild(newElement);
    
   
    console.log(newElement);
}

document.getElementById("blue-zone").onclick = function() {
    zoneClicked(this);
};

document.getElementById("yellow-zone").onclick = function() {
    zoneClicked(this);
};

document.getElementById("red-zone").onclick = function() {
    zoneClicked(this);
};
