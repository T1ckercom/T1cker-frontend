import React from "react";

const KeyMetricsTable = () => {
  const data = [
    { metric: "Market Cap", value: "$2.5T" },
    { metric: "P/E Ratio", value: "30.5" },
    { metric: "EPS (TTM)", value: "6.32" },
    { metric: "52 Week High", value: "$180" },
    { metric: "52 Week Low", value: "$120" },
    { metric: "Dividend Yield", value: "0.85%" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Key Metrics</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Metric</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ metric, value }) => (
            <tr key={metric} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{metric}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyMetricsTable;
