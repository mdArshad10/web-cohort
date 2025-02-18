// Problem statement
// Create a Library constructor that initializes a books array.

// Implement:
// • addBook (book): Adds a book to the books array.
// • findBook(title): Searches for a book by title and returns "Book found" or "Book not found".

// Challenge
// • Implement Library constructor with a books array.
// • Attach addBook (book) and findBook(title) methods to the prototype.

function Library() {
  this.books = [];
}

Library.prototype.addBook = function (book) {
  this.books.push(book);
};
Library.prototype.findBook = function (title) {
  const findBookIndex = this.books.indexOf(title);
  if (findBookIndex !== -1) {
    return "Book found";
  } else {
    return "Book not found";
  }
};

const library = new Library();
library.addBook("abcd");
library.addBook("xyz");
library.addBook("pqr");
console.log(library.findBook("abcd"));
console.log(library.findBook("abcdd"));
