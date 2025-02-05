import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [ticker, setTicker] = useState('');

  const handleSearch = () => {
    onSearch(ticker); // Pass the ticker to the parent component
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Enter stock ticker (e.g., AAPL)"
        className="border p-2 rounded"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white p-2 ml-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;