class Circle {
  getArea(r) {
    return 2 * Math.PI * Math.sqrt(r).toFixed(1);
  }
}

class Mathematic {
  constructor() {
    console.log("Welcome to mathematic");
  }
}

const math = new Mathematic();
//! Error: TypeError: math.getArea is not a function
// because it is not inheritance the properties
// console.log(math.getArea());

// Q: inheritance the circle class Method into the mathematic class
math.__proto__ = Circle.prototype;
console.log(math.getArea(2));
