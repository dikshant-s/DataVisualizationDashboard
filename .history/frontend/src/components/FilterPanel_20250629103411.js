import React, { useEffect, useState } from "react";
import axios from "axios";

const fields = ["end_year", "topic", "sector", "region", "pestle", "source", "country"];

const FilterPanel = ({ setFilters }) => {
  const [filterOptions, setFilterOptions] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fields.forEach((field) => {
      axios
        .get(`http://localhost:5000/api/data/filters/${field}`)
        .then((res) =>
          setFilterOptions((prev) => ({ ...prev, [field]: res.data }))
        );
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newSelected = { ...selected, [name]: value };
    setSelected(newSelected);
    setFilters(newSelected);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Filters</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {field.replaceAll("_", " ")}
            </label>
            <select
              name={field}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
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
