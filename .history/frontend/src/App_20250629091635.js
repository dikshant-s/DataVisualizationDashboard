import React, { useState } from "react";
import FilterPanel from "./components/FilterPanel";
import IntensityBarChart from "./components/IntensityBarChart";
import LikelihoodLineChart from "./components/LikelihoodLineChart";
import RelevanceTopicChart from "./components/RelevanceTopicChart";
import Summary from "./components/Summary";

const App = () => {
  const [filters, setFilters] = useState({});

  return (
    <div style={{ padding: 20 }}>
      <h1>Data Visualization Dashboard</h1>
      <FilterPanel setFilters={setFilters} />
      <Summary filters={filters} />
      <IntensityBarChart filters={filters} />
      <LikelihoodLineChart filters={filters} />
      <RelevanceTopicChart filters={filters} />
    </div>
  );
};

export default App;
