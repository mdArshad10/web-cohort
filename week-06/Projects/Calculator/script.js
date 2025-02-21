console.log("This is the calculator");

const numberBtn = document.querySelectorAll(".number");
console.log(numberBtn);

numberBtn.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.innerText);
  });
});
