import React, { useState } from "react";
import FilterPanel from "./components/FilterPanel";
import IntensityBarChart from "./components/IntensityBarChart";
import LikelihoodLineChart from "./components/LikelihoodLineChart";
import RelevanceTopicChart from "./components/RelevanceTopicChart";
import Summary from "./components/Summary";

const App = () => {
  const [filters, setFilters] = useState({});

  return (
  <div className="container">
    <h1>📊 Data Visualization Dashboard</h1>
    <FilterPanel setFilters={setFilters} />
    <Summary filters={filters} />
    <div className="chart-box">
      <IntensityBarChart filters={filters} />
    </div>
    <div className="chart-box">
      <LikelihoodLineChart filters={filters} />
    </div>
    <div className="chart-box">
      <RelevanceTopicChart filters={filters} />
    </div>
  </div>
);
};

export default App;
