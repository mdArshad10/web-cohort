// Output of given code
Function.prototype.describe = function () {
  console.log(`Just chill ${this.name}`);
};

function greet(name) {
  console.log(`hello ${name}`);
  return `hello ${name}`;
}

// Gusse the output
// greet("arshad"); //? Output: hello arshad
// * we normally calling the function

// greet("arshad").describe; //? Output: hello arshad
// * here, we also calling the function

// console.log(greet("arshad").describe); //? Output: hello arshad
//* because it call the greet() function not access the value

// greet("arshad").describe(); //? output: Error: greet(...).describe is not a function
greet.describe(); //? output: Just chill greet
// * we call the function which is attach to function prototype

// =========================

//  Closure
const createCounter = function () {
  let count = 0;
  return function () {
    count++;
    return count;
  };
};

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());

// ========================

// IFFE
(function (a, b) {})();
