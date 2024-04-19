const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes=[];

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function removeLoadingSpinner(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

//Show New Quote
function newQuote(){
    showLoadingSpinner()
    // Pick a random quote from apiQuotes array
    const newQuote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
    // Check if Author field is blank and replace if with 'Unknown'
    authorText.textContent = newQuote.author || 'Unknown';
    // Check Quote length to determine styling
    if(newQuote.text.length>120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = newQuote.text;
    removeLoadingSpinner()
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click',tweetQuote)

// Get Quotes From API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error){
        console.log(error)
    }
}

//On Load
getQuotes();