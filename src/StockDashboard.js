import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const StockDashboard = () => {
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchStockData = async () => {
    setError(null);
    setData(null);
    try {
      const response = await fetch(
        `https://flask-stock-api-7efd.onrender.com/stock?ticker=${ticker}`
      );
      const result = await response.json();
      console.log("API Response Data:", result);
      if (response.ok) {
        setData(result[0]); // Extract the first object from the array
      } else {
        setError(result.error || "Failed to fetch stock data");
      }
    } catch (err) {
      setError("Network error. Please try again.");
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
          onClick={() => fetchStockData()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {data && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([metric, value]) => (
                <tr key={metric} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 font-bold">{metric}</td>
                  <td
                    className={`border px-4 py-2 ${
                      value > 0 ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockDashboard;