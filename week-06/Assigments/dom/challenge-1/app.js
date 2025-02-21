/**
 * Write your challenge solution here
 */

const toggleButton = document.querySelector("#toggleButton");
const paragraphs = document.querySelectorAll("p");
const mainHeading = document.querySelector("h1");

const bulbStatus = document.querySelector("#bulb");
const switchStatus = document.querySelector("#status");
const ToggleBulb = document.querySelector(".off");

let toggleSwitch = true;

function changeBulbStatus(status) {
  toggleButton.innerText = status ? "Turn Off" : "Turn On";
  switchStatus.innerText = status ? "Status: On" : "Status: Off";
  document.body.style = status ? "black" : "white";
  paragraphs.forEach((item) => {
    item.style.color = status ? "black" : "white";
  });
}

toggleButton.addEventListener("click", (event) => {
  if (toggleSwitch) {
    toggleButton.innerText = "Turn Off";
    switchStatus.innerText = "Status: On";
    document.body.style.backgroundColor = "black";
    ToggleBulb.classList.remove(["off"]);
    mainHeading.style.color = "white";
    paragraphs.forEach((item) => {
      item.style.color = "white";
    });
    toggleSwitch = false;
  } else {
    toggleButton.innerText = "Turn On";
    switchStatus.innerText = "Status: Off";
    document.body.style.backgroundColor = "white";
    ToggleBulb.classList.add("off");
    mainHeading.style.color = "black";
    paragraphs.forEach((item) => {
      item.style.color = "black";
    });
    toggleSwitch = true;
  }
});
