import React, { useState } from "react";
import StockDataFetcher from "./StockDataFetcher";

const StockDashboard = () => {
  const [stockData, setStockData] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Stock Dashboard</h1>
      <StockDataFetcher onDataFetched={setStockData} />

      {stockData && (
        <div className="mt-6">
          {/* Section: Stock Overview */}
          {stockData.realTimeData && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold">{stockData.realTimeData.name} ({stockData.realTimeData.symbol})</h2>
              <p className="text-lg">
                Price: <span className="font-semibold">${stockData.realTimeData.price}</span>
              </p>
              <p className={`text-lg ${stockData.realTimeData.change < 0 ? "text-red-500" : "text-green-500"}`}>
                {stockData.realTimeData.change} ({stockData.realTimeData.changesPercentage}%)
              </p>
            </div>
          )}

          {/* Section: Key Metrics Table */}
          {stockData.financials.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <h2 className="text-xl font-bold">Financial Metrics</h2>
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
                  {stockData.financials.slice(0, 5).map((year) => (
                    <tr key={year.date} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{year.date}</td>
                      <td className="border px-4 py-2">${year.revenue.toLocaleString()}</td>
                      <td className="border px-4 py-2">${year.netIncome.toLocaleString()}</td>
                      <td className="border px-4 py-2">{year.eps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Section: Historical Data */}
          {stockData.historicalData.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <h2 className="text-xl font-bold">Historical Prices (Last 30 Days)</h2>
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
                  {stockData.historicalData.slice(0, 10).map((day) => (
                    <tr key={day.date} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{day.date}</td>
                      <td className="border px-4 py-2">${day.open}</td>
                      <td className="border px-4 py-2">${day.high}</td>
                      <td className="border px-4 py-2">${day.low}</td>
                      <td className="border px-4 py-2">${day.close}</td>
                      <td className="border px-4 py-2">{day.volume.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockDashboard;
