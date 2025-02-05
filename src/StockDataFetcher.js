import React, { useState } from "react";
import axios from "axios";

const API_KEY = "UwbsK5XWR0U2yaV0732fg2MSGz8b2HBR"; // Replace with your real API key

const StockDataFetcher = () => {
  const [ticker, setTicker] = useState(""); // User input
  const [stockData, setStockData] = useState(null); // Real-time stock data
  const [financialData, setFinancialData] = useState(null); // Key financial metrics
  const [error, setError] = useState(null);

  // Function to fetch stock data
  const fetchStockData = async () => {
    if (!ticker) {
      setError("Please enter a stock ticker.");
      return;
    }

    try {
      setError(null); // Reset error state

      console.log(`Fetching data for: ${ticker}`);

      // **Real-time stock data**
      const stockRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`
      );

      // **Financial Key Metrics**
      const financialsRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/key-metrics/${ticker}?apikey=${API_KEY}`
      );

      if (stockRes.data.length === 0 || financialsRes.data.length === 0) {
        setError("No data found. Check the ticker symbol.");
        return;
      }

      // Save the fetched data into state
      setStockData(stockRes.data[0]); // First object in response array
      setFinancialData(financialsRes.data[0]); // First object in response array

      console.log("Stock Data:", stockRes.data[0]);
      console.log("Financial Data:", financialsRes.data[0]);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Stock Dashboard</h1>

      {/* Search Bar */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-1/3"
          placeholder="Enter Ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && fetchStockData()} // Fetch data when pressing Enter
        />
        <button
          onClick={fetchStockData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Real-time Stock Data Table */}
      {stockData && (
        <div className="overflow-x-auto mb-6">
          <h2 className="text-xl font-bold mb-2">Stock Overview</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-4 py-2 font-bold">Symbol</td><td className="border px-4 py-2">{stockData.symbol}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">Price</td><td className="border px-4 py-2">${stockData.price}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">Change</td><td className="border px-4 py-2">{stockData.change} ({stockData.changesPercentage}%)</td></tr>
              <tr><td className="border px-4 py-2 font-bold">Market Cap</td><td className="border px-4 py-2">${stockData.marketCap.toLocaleString()}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">PE Ratio</td><td className="border px-4 py-2">{stockData.pe}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">EPS</td><td className="border px-4 py-2">{stockData.eps}</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Key Financial Metrics Table */}
      {financialData && (
        <div className="overflow-x-auto mb-6">
          <h2 className="text-xl font-bold mb-2">Financial Metrics</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-4 py-2 font-bold">Return on Equity (ROE)</td><td className="border px-4 py-2">{financialData.returnOnEquity}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">Debt to Equity</td><td className="border px-4 py-2">{financialData.debtToEquity}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">EV/EBITDA</td><td className="border px-4 py-2">{financialData.enterpriseValueOverEBITDA}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">Free Cash Flow Yield</td><td className="border px-4 py-2">{financialData.freeCashFlowYield}</td></tr>
              <tr><td className="border px-4 py-2 font-bold">PEG Ratio</td><td className="border px-4 py-2">{financialData.pegRatio}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockDataFetcher;
