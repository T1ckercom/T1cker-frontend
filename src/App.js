import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import StockDashboard from './components/StockDashboard';

function App() {
  const [ticker, setTicker] = useState('AAPL'); // Default ticker

  const handleSearch = (newTicker) => {
    setTicker(newTicker);
  };

  return (
    <div className="App">
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <StockDashboard ticker={ticker} />
    </div>
  );
}

export default App;