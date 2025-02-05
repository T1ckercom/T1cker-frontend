import React, { useState } from "react";
import axios from "axios";

const API_KEY = "PV6zVVsJ05kwSUntS591jaobl7SSadUf"; // Your FMP API Key

const StockDataFetcher = ({ onDataFetched }) => {
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    if (!ticker) {
      setError("Please enter a stock ticker.");
      return;
    }

    console.log(`Fetching data for: ${ticker}`);
    setLoading(true);
    setError(null);

    try {
      onDataFetched({ realTimeData: null, financials: [], historicalData: [] });

      // Fetch real-time stock data
      const realTimeRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`
      );
      console.log("Real-Time Data:", realTimeRes.data);

      // Fetch financial statements (Income Statement - Annual)
      const financialsRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&apikey=${API_KEY}`
      );
      console.log("Financials Data:", financialsRes.data);

      // Ensure correct data format before updating state
      onDataFetched({
        realTimeData: realTimeRes.data.length > 0 ? realTimeRes.data[0] : null,
        financials: financialsRes.data.length > 0 ? financialsRes.data : [],
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching stock data:", err);
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
