import React, { useEffect, useState } from "react";
import axios from "axios";
import
const fields = ["end_year", "topic", "sector", "region", "pestle", "source", "country"];

const FilterPanel = ({ setFilters }) => {
  const [filterOptions, setFilterOptions] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fields.forEach(field => {
      axios.get(`http://localhost:5000/api/data/filters/${field}`)
        .then(res => setFilterOptions(prev => ({ ...prev, [field]: res.data })));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSelected = { ...selected, [name]: value };
    setSelected(newSelected);
    setFilters(newSelected);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Filters</h3>
      {fields.map(field => (
        <div key={field} style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>{field}</label>
          <select name={field} onChange={handleChange}>
            <option value="">All</option>
            {(filterOptions[field] || []).map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
