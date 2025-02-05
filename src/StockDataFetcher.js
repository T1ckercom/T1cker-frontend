import React, { useState } from "react";
import axios from "axios";

const API_KEY = "YOUR_FMP_API_KEY"; // Replace with your actual API Key

const StockDataFetcher = () => {
  const [ticker, setTicker] = useState("");
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    if (!ticker) {
      setError("Please enter a stock ticker.");
      return;
    }

    setLoading(true);
    setError(null);
    setFinancialData(null);

    try {
      // Fetching financial data
      const response = await axios.get(
        `https://financialmodelingprep.com/api/v3/key-metrics/${ticker}?period=annual&apikey=${API_KEY}`
      );

      if (response.data && response.data.length > 0) {
        setFinancialData(response.data[0]); // Set only latest financial data
      } else {
        setError("No financial data found.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Stock Dashboard</h1>

      {/* Search Field */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-1/3"
          placeholder="Enter Ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === "Enter" && fetchStockData()} // Enter key support
        />
        <button
          onClick={fetchStockData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Financial Data Table */}
      {financialData && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-bold mb-2">TEST TABLE FINANCIALS</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">Market Cap</td>
                <td className="border px-4 py-2">${(financialData.marketCap / 1e9).toFixed(2)}B</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">P/E Ratio</td>
                <td className="border px-4 py-2">{financialData.peRatio}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">EPS (TTM)</td>
                <td className="border px-4 py-2">{financialData.eps}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">ROE (%)</td>
                <td className="border px-4 py-2">{(financialData.returnOnEquity * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Debt-to-Equity</td>
                <td className="border px-4 py-2">{financialData.debtToEquity.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Free Cash Flow Yield</td>
                <td className="border px-4 py-2">{(financialData.freeCashFlowYield * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">PEG Ratio</td>
                <td className="border px-4 py-2">{financialData.pegRatio}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockDataFetcher;
