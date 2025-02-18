// Problem statement
// You need to create a Counter constructor function that initializes a count property to e. The counter should have two prototype methods:
// • increment () increases the count by 1.
// • decrement() decreases the count by 1.

// Challenge
// • Implement a constructor function Counter that initializes count to
// • Attach increment() and decrement() methods to the prototype.

function Counter() {
  this.count = 0;
}

Counter.prototype.increment = function () {
  return this.count++;
};
Counter.prototype.decrement = function () {
  return this.count--;
};

const counter = new Counter();
console.log(counter.count);
counter.increment();
counter.increment();
counter.increment();
console.log(counter.count);
counter.decrement();
counter.decrement();
console.log(counter.count);
