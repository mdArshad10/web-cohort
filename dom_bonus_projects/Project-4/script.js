
const quoteDisplay = document.querySelector(".quoteDisplay");
const generateButton = document.querySelector("#generateButton");

const fetchRandomQuote=async()=>{
    const resp = await fetch("https://dummyjson.com/quotes/random");
    const data = await resp.json();
    return data;
}

generateButton.addEventListener('click', async (event)=>{
    const quoteAuthor = document.querySelector('#author')
    const {quote, author} = await fetchRandomQuote();
    quoteDisplay.innerText = quote;
    quoteAuthor.innerText = author;
})
