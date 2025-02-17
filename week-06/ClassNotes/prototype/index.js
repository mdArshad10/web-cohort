const obj1 = {
  fname: "Md",
  lname: "Arshad",
  getFullName: function () {
    return `${this.fname} ${this.lname}`;
  },
};

const obj2 = {
  fname: "Anirudh",
  lname: "Jwala",
};

// ====================================

// console.log(obj1);
// console.log(obj2);

// console.log(obj1.getFullName());

//! Error:obj2.getFullName is not a function
//* when: when getFullName is define in obj1 but not in obj2 and try to called it into the obj2
// console.log(obj2.getFullName());

// =============================

obj2.__proto__ = obj1;
console.log(obj2.getFullName());

// obj1.__proto__.__proto__ = null;

// =============================

const obj3 = {
  fname: "Md",
  lname: "Arshad",
  getFullName: function () {
    return `${this.fname} ${this.lname}`;
  },
};

const obj4 = {
  fname: "Anirudh",
  lname: "Jwala",
  getFullName: function () {
    return `${this.fname} ${this.lname}`;
  },
};

//* break the Coding Principle : DRY
