// create an object
const person = {
  firstName: "Md",
  lastName: "Arshad",
  x: 10,
  hobbies: ["coding", "reading"],
  hasSingle: true,
  getFullName: function () {
    return "Md. Arshad";
  },
  address: {
    hno: 1,
    street: 1,
    countryCode: "IN",
    state: "WB",
  },
};

console.log(person.firstName);
console.log(person.getFullName());
console.log(person.address.state);

// How to copy the a object


// How to copy the nested object
