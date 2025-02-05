import React from "react";

const StickyMenu = ({ onSectionSelect }) => {
  const sections = ["Summary", "Historical Data", "Financials", "Trading Comps", "Analysis"];

  return (
    <nav className="sticky top-0 bg-white shadow-md overflow-x-auto whitespace-nowrap p-2">
      <ul className="flex space-x-4 px-4">
        {sections.map((section) => (
          <li
            key={section}
            className="cursor-pointer p-2 hover:underline text-gray-700"
            onClick={() => onSectionSelect(section)}
          >
            {section}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StickyMenu;
