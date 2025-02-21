/**
 * Write your challenge solution here
 */
console.log("change the heading");

const mainHeading = document.querySelector("#mainHeading");
const colorBtns = document.querySelectorAll("button");

colorBtns.forEach((item) => {
  item.addEventListener("click", () => {
    const innerText = item.innerText;

    if (innerText !== "Reset") {
      mainHeading.style.color = innerText;
    } else {
      mainHeading.style.color = "black";
    }
  });
});
