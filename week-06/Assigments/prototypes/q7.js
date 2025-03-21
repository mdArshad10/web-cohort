// Problem statement
// Create an Employee constructor that initializes name, position, and salary. Implement:

// • applyBonus (percent): Increases the salary by the given percentage.
// Challenge

// • Implement Employee constructor with name, position, and salary
// • Attach applyBonus (percent) to the prototype to increase salary.

function Employee(name, position, salary) {
  this.name = name;
  this.position = position;
  this.salary = salary;
}

Employee.prototype.applyBonus = function (percent) {
  this.salary = this.salary + this.salary * (percent / 100);
  return this.salary;
};

const employee = new Employee("abcd", "xyz", 100);
console.log(employee.applyBonus(100));
console.log(employee.salary);
console.log(employee.applyBonus(50));
console.log(employee.salary);
