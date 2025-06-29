import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const IntensityBarChart = ({ filters }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    axios.get("http://localhost:5000/api/data?" + params)
      .then((res) => {
        const grouped = {};
        res.data.forEach(item => {
          const country = item.country || "Unknown";
          grouped[country] = (grouped[country] || 0) + (item.intensity || 0);
        });

        setChartData({
          labels: Object.keys(grouped),
          datasets: [{
            label: "Total Intensity",
            data: Object.values(grouped),
            backgroundColor: "rgba(75,192,192,0.6)"
          }]
        });
      });
  }, [filters]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h3>Intensity by Country</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default IntensityBarChart;
