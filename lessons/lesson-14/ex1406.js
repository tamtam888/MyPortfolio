let numbers = [11, 6, 43, 17, 8, 23, 12];
let container = document.getElementById("lottery-container");

numbers.forEach(function(number) {
    let numberDiv = document.createElement("div");
    numberDiv.textContent = "Number: " + number;
    container.appendChild(numberDiv);
});