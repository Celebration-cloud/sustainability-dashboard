"use client"; // Ensures this component runs on the client side in Next.js

import { Line, Pie, Bar } from "react-chartjs-2"; // Importing chart types from react-chartjs-2
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
} from "chart.js"; // Importing necessary modules from Chart.js
import { useSelector } from "react-redux"; // Redux hook to access global state

// Register the necessary components for Chart.js to function correctly
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

/**
 * ChartComponent
 *
 * This component renders three types of charts (Line, Bar, Pie) based on the selected metric from Redux.
 * It dynamically maps the data and labels for visualization.
 *
 * @param {Object} props - Component props
 * @param {Array} props.data - Array of objects containing sustainability data (each object has date & metric values)
 */
const ChartComponent = ({ data }) => {
  // Accessing the selected metric from Redux store
  const { selectedMetric } = useSelector((state) => state.sustainability);

  /**
   * Line Chart Data Configuration
   * - Displays time-series data where X-axis represents dates and Y-axis represents metric values.
   */
  const lineChartData = {
    labels: data.map((d) => d.date), // Extracting dates for X-axis
    datasets: [
      {
        label: selectedMetric.label, // Displaying selected metric name as label
        data: data.map((d) => d[selectedMetric.key]), // Extracting metric values for Y-axis
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
        tension: 0.4, // Smooth curve effect
        fill: false, // No area fill under the line
      },
    ],
  };

  /**
   * Bar Chart Data Configuration
   * - Displays data using vertical bars.
   */
  const barChartData = {
    labels: data.map((d) => d.date), // Extracting dates for X-axis
    datasets: [
      {
        label: selectedMetric.label, // Metric label
        data: data.map((d) => d[selectedMetric.key]), // Extracting metric values
        backgroundColor: "rgba(153, 102, 255, 0.6)", // Bar color
      },
    ],
  };

  /**
   * Pie Chart Data Configuration
   * - Displays data as proportionate slices.
   */
  const pieChartData = {
    labels: data.map((d) => d.date), // Using dates as labels
    datasets: [
      {
        label: selectedMetric.label, // Metric label
        data: data.map((d) => d[selectedMetric.key]), // Extracting metric values
        backgroundColor: data.map(
          (_, index) => `hsl(${(index * 360) / data.length}, 70%, 70%)` // Generating unique colors for each slice
        ),
      },
    ],
  };

  // Chart.js options to ensure responsiveness
  const options = {
    responsive: true, // Makes the chart responsive
    maintainAspectRatio: false, // Allows flexible height adjustments
  };

  return (
    <div className="flex gap-10 flex-wrap justify-around max-md:block">
      {/* Line Chart Container */}
      <div className="w-1/3 h-96 max-md:w-full">
        <Line data={lineChartData} options={options} />
      </div>

      {/* Bar Chart Container */}
      <div className="w-1/3 h-96 max-md:w-full">
        <Bar data={barChartData} options={options} />
      </div>

      {/* Pie Chart Container */}
      <div className="w-1/3 h-96 max-md:w-full">
        <Pie data={pieChartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent; // Exporting component for use in other parts of the application
