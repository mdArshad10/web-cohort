const fs = require("fs");

console.log("Hi");

// ==================== Promise Syntax ====================
async function readFile(path) {
  return new Promise((resolve, rejects) => {
    fs.readFile(path, "utf-8", function (err, content) {
      if (err) {
        rejects(err);
      } else {
        resolve(content);
      }
    });
  });
}

// converting the legacy coder to modern code
// ==================== Async/await Syntax ====================
async function todoTask() {
  const readFileContent = await readFile("./text.txt");
  console.log("The content of file ", readFileContent);
}

todoTask();

// ==================== then Syntax ====================

// const readFileContent = readFile('./text.txt');
// readFileContent.then((content)=> console.log("The content of file ", content))

// ==================== Callback Syntax ====================

// fs.readFile("./text.txt", "utf-8", (err, content) => {
//   if (err) {
//     console.log("There is some thing wrong");
//   } else {
//     console.log("The content of file ", content);
//   }
// });

console.log("Bye");
