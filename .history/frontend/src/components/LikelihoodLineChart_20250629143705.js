import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const LikelihoodLineChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    axios.get("https://datavisualizationdashboardbackend-33am.onrender.com/api/data?" + params)
      .then((res) => {
        const grouped = {};
        res.data.forEach(item => {
          const year = item.start_year || "Unknown";
          grouped[year] = (grouped[year] || 0) + (item.likelihood || 0);
        });

        const labels = Object.keys(grouped).sort();
        const values = labels.map(l => grouped[l]);

        setChartData({
          labels,
          datasets: [{
            label: "Likelihood Over Years",
            data: values,
            borderColor: "#36a2eb",
            fill: false
          }]
        });
      });
  }, [filters]);

  if (!chartData) return <p>Loading Likelihood chart...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h3>Likelihood Over Years</h3>
      <Line data={chartData} />
    </div>
  );
};

export default LikelihoodLineChart;
