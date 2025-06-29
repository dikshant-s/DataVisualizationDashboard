import React, { useState } from "react";
import IntensityBarChart from "./components/IntensityBarChart";
import FilterPanel from "./components/FilterPanel";

const App = () => {
  const [filters, setFilters] = useState({});

  return (
    <div style={{ padding: 20 }}>
      <h1>Data Visualization Dashboard</h1>
      <FilterPanel setFilters={setFilters} />
      <IntensityBarChart filters={filters} />
    </div>
  );
};

export default App;
