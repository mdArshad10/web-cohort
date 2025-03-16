const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("input", updateFirst, false);
colorPicker.addEventListener("change", watchColorPicker, false);

function updateFirst(event) {
  const span = document.querySelector("span");
  const favoriteColor = document.querySelector(".favoriteColor");
  const value = event.target.value;
  if (span) {
    span.innerText = value;
    complementColor(value, favoriteColor);
  }
}
function watchColorPicker(event) {
  const colorCopied = document.querySelector("#colorCodeCopied");
  colorCopied.addEventListener("click", async (event) => {});
}

function complementColor(colorHex, ele) {
  const color = colorHex.split("#")[1];
  const hexColor = parseInt(color, 16);
  const higherColor = "#ffffff";
  const higherColorHex = higherColor.split("#")[1];
  const valueHex = parseInt(higherColorHex, 16);

  const value = hexColor ^ valueHex;
  const hexValue = value.toString("16");

  ele.style.backgroundColor = `#${hexValue}`;

  console.log(ele.style.backgroundColor);
}
