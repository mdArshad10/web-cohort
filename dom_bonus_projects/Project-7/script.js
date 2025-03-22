const palindromeInput = document.querySelector("#inputPalindrome");
const palindromeButton = document.querySelector("#checkPalindrome");
const result = document.querySelector("#result");

function checkPalindrome(str) {
  const newStr = str.split("").reverse().join("");
  if (newStr === str) {
    return true;
  }
  return false;
}

palindromeButton.addEventListener("click", () => {
  const str = palindromeInput.value;
  const isPalindrome = checkPalindrome(str);
  if (isPalindrome) {
    result.innerText = `${str} is Palindrome`;
  } else {
    result.innerText = `${str} is not Palindrome`;
  }
});
