import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const RelevanceTopicChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    axios.get("https://datavisualizationdashboardbackend-33am.onrender.com/api/data?" + params)
      .then((res) => {
        const grouped = {};
        res.data.forEach(item => {
          const topic = item.topic || "Unknown";
          grouped[topic] = (grouped[topic] || 0) + (item.relevance || 0);
        });

        const labels = Object.keys(grouped);
        const values = labels.map(l => grouped[l]);

        setChartData({
          labels,
          datasets: [{
            label: "Relevance by Topic",
            data: values,
            backgroundColor: "rgba(153, 102, 255, 0.6)"
          }]
        });
      });
  }, [filters]);

  if (!chartData) return <p>Loading Relevance chart...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h3>Relevance by Topic</h3>
      <Bar data={chartData} options={{ indexAxis: "y" }} />
    </div>
  );
};

export default RelevanceTopicChart;
