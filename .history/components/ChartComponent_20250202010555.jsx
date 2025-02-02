/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  // Process data to get labels and dataset; here we assume each data point has { date, carbonEmissions }
  console.log(data)
  const chartData = {
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

  return <Line data={chartData} />;
};

export default ChartComponent;
