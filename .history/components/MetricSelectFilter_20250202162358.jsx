/* eslint-disable prettier/prettier */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { Select, SelectItem } from "@heroui/select";

import { setSelectedMetric } from "../store/configStore";

const MetricSelectFilter = () => {
  const dispatch = useDispatch();
  const { selectedMetric } = useSelector((state) => state.sustainability);

  // Define available metrics as an array of objects.
  const metrics = [
    { key: "carbonEmissions", label: "Carbon Emissions" },
    { key: "energySavings", label: "Energy Savings" },
    { key: "airQuality", label: "Air Quality Index" },
  ];

  // Handle select changes by dispatching the new metric value.
  const handleMetricChange = (value) => {
    const matric = value.target.value;
    const data = 
    console.log(value.target.value)
    dispatch(setSelectedMetric(value));
  };

  return (
    <div className="my-4">
      {/* The label prop ensures the control is properly labeled.
          An id is also provided for additional accessibility if needed. */}
      <Select
        className="max-w-xs"
        id="metricSelect"
        label="Select Metric"
        value={selectedMetric}
        onChange={handleMetricChange}
      >
        {metrics.map((metric) => (
          <SelectItem key={metric.key} value={metric.key}>
            {metric.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default MetricSelectFilter;
