/*document.getElementById("zones-container").addEventListener("click", (event) => {
    console.log(event.target.textContent + " was clicked");
});
*/
function onButtonClicked(event) {
    let zoneName = event.target.textContent;
    let message = zoneName + " was clicked";
    console.log(message);
}


  /*
function onZoneClicked(zoneId) {
    let zoneName = document.getElementById(zoneId).textContent;
    let message = zoneName + " was clicked";
    console.log(message);
  }
  */