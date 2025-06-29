import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = ({ filters }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(filters).toString();
    axios.get("https://datavisualizationdashboardbackend-33am.onrender.com/api/data?" + params)
      .then((res) => {
        const data = res.data;
        const total = data.length;
        const avg = (key) => total === 0 ? 0 : (data.reduce((sum, d) => sum + (d[key] || 0), 0) / total).toFixed(2);

        setSummary({
          total,
          avgIntensity: avg("intensity"),
          avgLikelihood: avg("likelihood"),
          avgRelevance: avg("relevance")
        });
      });
  }, [filters]);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div style={{ padding: "10px 20px", border: "1px solid #ccc", margin: "20px auto", maxWidth: 600 }}>
      <h3>Summary</h3>
      <p><strong>Total Records:</strong> {summary.total}</p>
      <p><strong>Average Intensity:</strong> {summary.avgIntensity}</p>
      <p><strong>Average Likelihood:</strong> {summary.avgLikelihood}</p>
      <p><strong>Average Relevance:</strong> {summary.avgRelevance}</p>
    </div>
  );
};

export default Summary;
