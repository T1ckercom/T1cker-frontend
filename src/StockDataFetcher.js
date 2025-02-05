import React, { useState } from "react";
import axios from "axios";

const API_KEY = "YOUR_FMP_API_KEY"; // Replace with your actual FMP API Key

const StockDataFetcher = ({ onDataFetched }) => {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    if (!ticker) {
      setError("Please enter a stock ticker.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch real-time stock data
      const realTimeRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`
      );

      // Fetch financial metrics (Annual)
      const financialsRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&apikey=${API_KEY}`
      );

      // Fetch historical price data (30 days)
      const historicalRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?timeseries=30&apikey=${API_KEY}`
      );

      onDataFetched({
        realTimeData: realTimeRes.data[0] || null,
        financials: financialsRes.data || [],
        historicalData: historicalRes.data.historical || [],
      });

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch stock data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-3">
        <input
          type="text"
          className="border p-2 rounded w-1/3"
          placeholder="Enter Ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && fetchStockData()}
        />
        <button
          onClick={fetchStockData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default StockDataFetcher;
