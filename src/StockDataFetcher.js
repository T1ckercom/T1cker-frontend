import React, { useState } from "react";
import axios from "axios";

const API_KEY = "PV6zVVsJ05kwSUntS591jaobl7SSadUf"; // Using your API key

const StockDataFetcher = () => {
  const [ticker, setTicker] = useState("");
  const [realTimeData, setRealTimeData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [financials, setFinancials] = useState([]);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setError(null);
    setRealTimeData(null);
    setHistoricalData([]);
    setFinancials([]);

    if (!ticker) {
      setError("Please enter a stock ticker.");
      return;
    }

    try {
      // Fetch Real-Time Stock Quote
      const realTimeRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`
      );

      // Fetch Historical Stock Prices (last 30 days)
      const historicalRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?timeseries=30&apikey=${API_KEY}`
      );

      // Fetch Financial Statements (Income Statement - Annual)
      const financialsRes = await axios.get(
        `https://financialmodelingprep.com/api/v3/income-statement/${ticker}?period=annual&apikey=${API_KEY}`
      );

      // Set Data if API Responses are OK
      setRealTimeData(realTimeRes.data[0] || {});
      setHistoricalData(historicalRes.data.historical || []);
      setFinancials(financialsRes.data || []);
    } catch (err) {
      console.error("API Error:", err);
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Stock Dashboard</h1>

      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-1/3"
          placeholder="Enter Ticker (e.g., AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
        />
        <button
          onClick={fetchStockData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Real-time Stock Data */}
      {realTimeData && Object.keys(realTimeData).length > 0 && (
        <div className="overflow-x-auto mb-6">
          <h2 className="text-xl font-bold mb-2">Real-time Stock Data</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(realTimeData).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 font-bold">{key}</td>
                  <td className="border px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Historical Stock Prices */}
      {historicalData.length > 0 && (
        <div className="overflow-x-auto mb-6">
          <h2 className="text-xl font-bold mb-2">Historical Stock Prices (Last 30 Days)</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Open</th>
                <th className="border px-4 py-2">High</th>
                <th className="border px-4 py-2">Low</th>
                <th className="border px-4 py-2">Close</th>
                <th className="border px-4 py-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {historicalData.slice(0, 10).map((day) => (
                <tr key={day.date} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{day.date}</td>
                  <td className="border px-4 py-2">{day.open}</td>
                  <td className="border px-4 py-2">{day.high}</td>
                  <td className="border px-4 py-2">{day.low}</td>
                  <td className="border px-4 py-2">{day.close}</td>
                  <td className="border px-4 py-2">{day.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Financial Statements */}
      {financials.length > 0 && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-bold mb-2">Financial Statements (Annual Income)</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">Revenue</th>
                <th className="border px-4 py-2">Net Income</th>
                <th className="border px-4 py-2">EPS</th>
              </tr>
            </thead>
            <tbody>
              {financials.slice(0, 5).map((year) => (
                <tr key={year.date} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{year.date}</td>
                  <td className="border px-4 py-2">${year.revenue?.toLocaleString() || "N/A"}</td>
                  <td className="border px-4 py-2">${year.netIncome?.toLocaleString() || "N/A"}</td>
                  <td className="border px-4 py-2">{year.eps || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockDataFetcher;
