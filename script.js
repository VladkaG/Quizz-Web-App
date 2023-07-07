let startButton = document.getElementById("start-button");
let startScreen = document.getElementById("start-screen");
let displayContainer = document.getElementById("display-container");

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
});
