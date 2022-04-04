import React, { useState, useEffect } from "react";
import "./App.scss";
import colorArray from "./colorsArray";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const quoteDBUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "Life isn’t about getting and having, it’s about giving and being."
  );
  const [author, setAuthor] = useState("Kevin Kruse");

  const [, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(0);
  const [accentColor, setAccentColor] = useState("#3366E6");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parse = await response.json();
    setQuotesArray(parse.quotes);
    console.log(parse);
  };
  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, []);

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger);
    setAccentColor(colorArray[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ backgroundColor: accentColor, color: accentColor }}
      >
        <div style={{ backgroundColor: accentColor, color: accentColor }}>
          <h1 style={{ color: "white" }}>Random Quote Machine</h1>
        </div>
        <div id="quote-box" style={{ color: accentColor }}>
          <h2 id="text">"{quote}"</h2>
          <p id="author">-- {author}</p>
          <div className="button">
            <a
              id="tweet-quote"
              style={{ color: accentColor }}
              href={encodeURI(
                `https://twitter.com/intent/tweet?text=${quote} -${author}`
              )}
            >
              <FontAwesomeIcon icon={faTwitter} />
              Tweet Quote
            </a>
          </div>
          <button
            id="new-quote"
            style={{ color: accentColor }}
            onClick={() => getRandomQuote()}
          >
            New Quote
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
