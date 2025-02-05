import React from 'react';

const KeyMetricsTable = ({ metrics }) => {
  if (!metrics) return <div>No metrics available.</div>;

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold">Key Financial Metrics</h3>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(metrics).map(([key, value]) => (
            <tr key={key}>
              <td className="border px-4 py-2">{key}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyMetricsTable;