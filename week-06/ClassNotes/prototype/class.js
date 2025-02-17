class Person {
  constructor(fname, lname) {
    this.fname = fname;
    this.lname = lname;
  }
  getFullName() {
    return `${this.fname} ${this.lname}`;
  }
}

const p1 = new Person("Md", "Arshad");
const p2 = new Person("Akash", "Kadlage");

console.log(p1.getFullName());
console.log(p2.getFullName());

// ==== Inheritance =======

class A {
  getCalled() {
    return "A";
  }
}

class B extends A {
  constructor() {
    super();
    console.log("This is calling B");
  }
}

const b = new B();
console.log(b.getCalled());
