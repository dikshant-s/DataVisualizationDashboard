import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const IntensityBarChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    axios.get("http://localhost:5000/api/data?" + params)
      .then((res) => {
        const grouped = {};
        res.data.forEach(item => {
          const country = item.country || "Unknown";
          grouped[country] = (grouped[country] || 0) + (item.intensity || 0);
        });

        const labels = Object.keys(grouped);
        const values = Object.values(grouped);

        setChartData({
          labels: labels,
          datasets: [{
            label: "Total Intensity",
            data: values,
            backgroundColor: "rgba(75,192,192,0.6)",
            borderRadius: 5,
          }]
        });
      }).catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [filters]);

  if (!chartData || chartData.labels.length === 0) {
    return <p>Loading chart or no data to display...</p>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h3>Intensity by Country</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default IntensityBarChart;
