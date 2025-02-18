console.log("welcome to the toggle button");

function changeBackgroundColor(colorName) {
  document.body.style.backgroundColor = colorName;
}

function changeHeadingColor(colorName, element) {
  element.style.color = colorName;
}

const heading = document.querySelector("h1");

const themeButton = document.querySelector("button");
themeButton.addEventListener("click", () => {
  const backgroundColor = document.body.style.backgroundColor;
  if (!backgroundColor || backgroundColor == "white") {
    changeBackgroundColor("black");
    changeHeadingColor("white", heading);
  } else {
    changeBackgroundColor("white");
    changeHeadingColor("black", heading);
  }
});
