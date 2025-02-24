/**
 * Write your challenge solution here
 */
console.log("change the heading");

const mainHeading = document.querySelector("#mainHeading");

// const colorBtns = document.querySelectorAll("button");
// colorBtns.forEach((item) => {
//   item.addEventListener("click", () => {
//     const innerText = item.innerText;

//     if (innerText !== "Reset") {
//       mainHeading.style.color = innerText;
//     } else {
//       mainHeading.style.color = "black";
//     }
//   });
// });

const colorBtns = document.querySelector(".color-buttons");
colorBtns.addEventListener("click", (event) => {
  const targetElem = event.target.innerText;
  mainHeading.style.color = targetElem != "Reset" ? targetElem : "black";
});
