
let winningNumbers = [11, 6, 43, 17, 8, 23, 12];
let container = document.getElementById("lottery-container");

for (let number of winningNumbers) {
  let div = document.createElement("div");
  div.textContent = "Number: " + number;
  container.appendChild(div);
}
