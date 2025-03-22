const number1 = document.querySelector("#number1");
const number2 = document.querySelector("#number2");
const result = document.querySelector("#result");

function calculator(operator) {
    
  const num1 = Number(number1.value);
  const num2 = Number(number2.value);
  
  if (isNaN(num1) || isNaN(num2)) {
    result.innerText = "Plz enter the valid number";
  }

  switch (operator) {
    case "+":
      result.innerText = `Sum : ${num1 + num2}`;
      return;
    case "-":
      result.innerText = `Subtract : ${num1 - num2}`;
      return;
    case "*":
      result.innerText = `Multiple : ${num1 * num2}`;
      return;
    case "/":
        if(num1==0){
            result.innerText="number is not divisible";
        }else{
            result.innerText = `Sum : ${(num1 / num2).toFixed(2)}`;
        }
      return;

    default:
      return;
  }
}
