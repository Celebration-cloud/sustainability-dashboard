/* eslint-disable prettier/prettier */
"use client";
import axios from "axios";
import { useState, useEffect } from "react";

import DashboardCharts from "./DashboardCharts"
const SustainableDashboard = () => {
  const [data, setData] = useState(data);
  const [darkMode, setDarkMode] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedMetric, setSelectedMetric] = useState("carbon_emissions");

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/mockData");
      const jsonData = await response.json();

      setData(jsonData);
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
              <option value="carbonEmissions">Carbon Emissions</option>
              <option value="energySavings">Energy Savings</option>
              <option value="airQuality">Air Quality Index</option>
            </select>
          </div>
        </div>

        {/* Charts Grid */}
        <DashboardCharts
          darkMode={darkMode}
          filteredData={filteredData}
          selectedMetric={selectedMetric}
        />
      </div>
    </div>
  );
};

export default SustainableDashboard;
