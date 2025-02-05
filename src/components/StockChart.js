import React, { useState } from "react";

const StockChart = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1D");
  const timeFrames = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "All"];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Stock Price Chart</h2>
      <div className="flex space-x-2 mt-2">
        {timeFrames.map((timeFrame) => (
          <button
            key={timeFrame}
            className={`px-3 py-1 rounded ${selectedTimeFrame === timeFrame ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedTimeFrame(timeFrame)}
          >
            {timeFrame}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 h-48 flex items-center justify-center mt-4">
        <p>Chart placeholder for {selectedTimeFrame}</p>
      </div>
    </div>
  );
};

export default StockChart;
