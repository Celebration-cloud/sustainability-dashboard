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
} from "chart.js";
import { useSelector } from "react-redux";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
    const { selectedMetric } = useSelector((state) => state.sustainability);
    
console.log(selectedMetric)
  // Prepare data for the Line Chart
  const lineChartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: selectedMetric.label,
        data: data.map((d) => d[selectedMetric.key]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  // Prepare data for the Bar Chart
  const barChartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: selectedMetric.label,
        data: data.map((d) => d[selectedMetric.key]),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  // Prepare data for the Pie Chart
  // For a pie chart, each slice represents one data point's carbon emission.
  const pieChartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: selectedMetric.label,
        data: data.map((d) => d[selectedMetric.key]),
        backgroundColor: data.map(
          (_, index) => `hsl(${(index * 360) / data.length}, 70%, 70%)`
        ),
      },
    ],
  };

  // Chart options to ensure responsiveness
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex gap-10 flex-wrap max-md:block">
      {/* Line Chart */}
      <div className="w-1/3 h-96 max-md:w-full">
        <Line data={lineChartData} options={options} />
      </div>

      {/* Bar Chart */}
      <div className="w-1/3 h-96 max-md:w-full">
        <Bar data={barChartData} options={options} />
      </div>

      {/* Pie Chart */}
      <div className="w-1/3 h-96 ">
        <Pie data={pieChartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
