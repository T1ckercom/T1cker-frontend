import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StickyMenu from "./components/StickyMenu";
import StockChart from "./components/StockChart";
import KeyMetricsTable from "./components/KeyMetricsTable";

function App() {
  const [selectedSection, setSelectedSection] = useState("Summary");

  return (
    <div className="max-w-4xl mx-auto">
      <Header />
      <SearchBar onSearch={(ticker) => console.log("Fetching data for:", ticker)} />
      <StickyMenu onSectionSelect={setSelectedSection} />
      
      {selectedSection === "Summary" && <StockChart />}
      {selectedSection === "Financials" && <KeyMetricsTable />}
    </div>
  );
}

export default App;
