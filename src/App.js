import React, { useState } from "react";

const StockDashboard = () => {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setError(null);
    try {
      const response = await fetch(`https://flask-stock-api-7efd.onrender.com/stock?ticker=${ticker}`);
      const result = await response.json();
      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || "Failed to fetch stock data");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Stock Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Ticker (e.g., AAPL)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
      />
      <button onClick={fetchStockData}>Fetch Data</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h3>{data[0]?.name} ({data[0]?.symbol})</h3>
          <p>Price: ${data[0]?.price}</p>
          <p>Market Cap: ${data[0]?.marketCap}</p>
          <p>Volume: {data[0]?.volume}</p>
        </div>
      )}
    </div>
  );
};

export default StockDashboard;
