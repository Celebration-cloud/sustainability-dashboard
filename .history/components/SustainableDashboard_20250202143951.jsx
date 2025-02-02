/* eslint-disable prettier/prettier */
"use client";
import axios from "axios";
import { useState, useEffect } from "react";
// import axios from "axios";
import {
  LineChart,
  BarChart,
  PieChart,
  ResponsiveContainer,
  Line,
  Bar,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const SustainableDashboard = () => {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedMetric, setSelectedMetric] = useState("carbon_emissions");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");

        setData(response.data.metrics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);

    return (
      (!dateRange.start || itemDate >= new Date(dateRange.start)) &&
      (!dateRange.end || itemDate <= new Date(dateRange.end))
    );
  });

  return (
    <div
      className={`min-h-screen p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center gap-2">
            {/* <CalendarIcon className="h-5 w-5" /> */}
            <input
              className="rounded-lg p-2 bg-opacity-20"
              type="date"
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
            <span>to</span>
            <input
              className="rounded-lg p-2 bg-opacity-20"
              type="date"
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            {/* <FilterIcon className="h-5 w-5" /> */}
            <select
              className="rounded-lg p-2 bg-opacity-20"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
            >
              <option value="carbon_emissions">Carbon Emissions</option>
              <option value="energy_savings">Energy Savings</option>
              <option value="air_quality">Air Quality Index</option>
            </select>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-2 h-96">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  dataKey={selectedMetric}
                  stroke={darkMode ? "#82ca9d" : "#8884d8"}
                  strokeWidth={2}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-96">
            <ResponsiveContainer height="100%" width="100%">
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={filteredData}
                  dataKey={selectedMetric}
                  fill={darkMode ? "#82ca9d" : "#8884d8"}
                  nameKey="date"
                  outerRadius={80}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-2 h-96">
            <ResponsiveContainer height="100%" width="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={selectedMetric}
                  fill={darkMode ? "#82ca9d" : "#8884d8"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainableDashboard;
