//  how to use the fetch

const url = "https://jsonplaceholder.typicode.com/users";

// fetch(url).then((resp) => {
//   const data = resp.json(); // it is return the promise
//   data.then((value) => console.log(value));
// });

fetch(url)
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err) => console.log("some error ", err));
