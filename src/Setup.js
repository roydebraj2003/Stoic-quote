import React, { useState, useEffect } from "react";
import "./Setup.css";

function Setup() {
  const [processedData, setProcessedData] = useState({
    quote: null,
    author: null,
    loading: true,
    error: false,
  });

  const fetchData = async () => {
    try {
      const response = await fetch("https://stoic.tekloon.net/stoic-quote");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      setProcessedData({
        quote: jsonData.quote,
        author: jsonData.author,
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error("Error with fetching data", error);
      setProcessedData({
        quote: null,
        author: null,
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    fetchData();
  };

  const { quote, author, loading, error } = processedData;

  return (
    <div className="quote-container">
      {loading && <p className="loading-text">Loading...</p>}
      {!loading && !error && (
        <div className="quote">
          <blockquote className="quote-content">{quote}</blockquote>
          <figcaption>&mdash; {author}</figcaption>
          <button className="next-button" onClick={handleClick}>
            Next quote
          </button>
        </div>
      )}
      {error && <p className="error-text">Error fetching data</p>}
    </div>
  );
}

export default Setup;
