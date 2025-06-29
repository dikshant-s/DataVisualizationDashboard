import React, { useEffect, useState } from "react";
import axios from "axios";

const fields = ["end_year", "topic", "sector", "region", "pestle", "source", "swot","country"];

const FilterPanel = ({ setFilters }) => {
  const [filterOptions, setFilterOptions] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fields.forEach((field) => {
      axios
        .get(`https://datavisualizationdashboardbackend-33am.onrender.com${field}`)
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
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Filters
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1 capitalize">
              {field.replaceAll("_", " ")}
            </label>
            <select
              name={field}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-50 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
