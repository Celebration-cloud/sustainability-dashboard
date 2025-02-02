/* eslint-disable prettier/prettier */
"use client";

import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const DashboardCharts = ({ filteredData, selectedMetric, darkMode }) => {
  // Extract labels (dates) and metric values from the filtered data.
  const labels = filteredData.map((item) => item.date);
  const metricData = filteredData.map((item) => item[selectedMetric]);

  // Common chart options for responsive behavior and tooltips.
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: selectedMetric.toUpperCase(),
        },
      },
    },
  };

  // Data for Line Chart
const lineData = {
  labels: data.map((d) => d.date),
  datasets: [
    {
      label: "Carbon Emissions",
      data: data.map((d) => d.carbonEmissions),
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4,
    },
  ],
};

  // Data for Pie Chart
  const pieData = {
    labels,
    datasets: [
      {
        label: selectedMetric,
        data: metricData,
        // You can create an array of colors, or use the same color for simplicity.
        backgroundColor: metricData.map(() =>
          darkMode ? "#82ca9d" : "#8884d8"
        ),
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels,
    datasets: [
      {
        label: selectedMetric,
        data: metricData,
        backgroundColor: darkMode ? "#82ca9d" : "#8884d8",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Line Chart (spanning two columns) */}
      <div className="col-span-2 h-96">
        <Line data={lineData} options={commonOptions} />
      </div>

      {/* Pie Chart */}
      <div className="h-96">
        {/* Pie charts do not use scales, so override options */}
        <Pie
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true },
              tooltip: { enabled: true },
            },
          }}
        />
      </div>

      {/* Bar Chart (spanning two columns) */}
      <div className="col-span-2 h-96">
        <Bar data={barData} options={commonOptions} />
      </div>
    </div>
  );
};

export default DashboardCharts;