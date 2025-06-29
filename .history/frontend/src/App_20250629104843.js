import React, { useState } from "react";
import FilterPanel from "./components/FilterPanel";
import IntensityBarChart from "./components/IntensityBarChart";
import LikelihoodLineChart from "./components/LikelihoodLineChart";
import RelevanceTopicChart from "./components/RelevanceTopicChart";
import Summary from "./components/Summary";

const App = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Data Visualization Dashboard
        </h1>

        <FilterPanel setFilters={setFilters} />

        <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl mb-8">
          <Summary filters={filters} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 overflow-x-auto">
          <IntensityBarChart filters={filters} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 overflow-x-auto">
          <LikelihoodLineChart filters={filters} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8 overflow-x-auto">
          <RelevanceTopicChart filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default App;
