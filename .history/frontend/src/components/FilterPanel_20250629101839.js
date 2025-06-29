import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FilterPanel.css"; 
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
    <div className="filter-card">
      <h3>Filters</h3>
      <div className="filter-grid">
        {fields.map((field) => (
          <div className="filter-group" key={field}>
            <label>{field.replaceAll("_", " ")}</label>
            <select name={field} onChange={handleChange}>
              <option value="All">All</option>
              {(filterOptions[field] || []).map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
