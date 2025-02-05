import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [ticker, setTicker] = useState("");

  const handleSearch = () => {
    if (ticker) {
      onSearch(ticker.toUpperCase());
    }
  };

  return (
    <div className="flex items-center border rounded-lg overflow-hidden w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for news, symbols or companies"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="p-2 w-full border-none outline-none"
      />
      <button onClick={handleSearch} className="bg-green-600 p-2 text-white">
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
