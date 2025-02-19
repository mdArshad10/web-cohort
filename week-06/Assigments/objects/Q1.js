// Problem Statement
// Imagine you are building an online school management system. Each student has a profile containing their name, age, and grade. You need to store this information in an object format so that it can be accessed easily when required.

// Challenge
// Write a function that takes name, age, and grade as parameters and returns a student object containing these properties.
// Constraints
// • name should be a string.
// • age should be a positive integer greater than 5.
// • grade should be a string like "10th", "12th", etc.
// • return "Invalid input" for wrong inputs.

function createStudentProfile(name, age, grade) {
    if(typeof name==='string' && typeof age ==='number' && age>5 && typeof grade==="string"){
        return {name, age, grade}
    }else{
        return "Invalid input";
    }
}

const values = createStudentProfile("arshad", 6, 10);
console.log(values);
