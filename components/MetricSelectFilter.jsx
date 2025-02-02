/* eslint-disable prettier/prettier */
"use client"; // Marks this as a client-side component in Next.js

// Core React/Redux imports
import { useDispatch, useSelector } from "react-redux";
// HeroUI components for styled select dropdown
import { Select, SelectItem } from "@heroui/select";

// Redux action for updating metric selection
import { setSelectedMetric } from "@/store/configStore";

/**
 * MetricSelectFilter Component
 * @description Provides a dropdown selector for choosing different sustainability metrics
 * @returns {JSX.Element} A styled select input component
 */
const MetricSelectFilter = () => {
  // Redux hooks for state management
  const dispatch = useDispatch();
  const { selectedMetric } = useSelector((state) => state.sustainability);

  /**
   * Available metrics configuration
   * @constant {Array<{key: string, label: string}>}
   * @description Defines selectable metrics with technical keys and display labels
   */
  const metrics = [
    { key: "carbonEmissions", label: "Carbon Emissions" },
    { key: "energySavings", label: "Energy Savings" },
    { key: "airQuality", label: "Air Quality Index" },
  ];

  /**
   * Handle metric selection changes
   * @param {React.ChangeEvent<HTMLSelectElement>} value - The select event
   */
  const handleMetricChange = (value) => {
    const metricKey = value.target.value;
    // Find full metric object from predefined list
    const selected = metrics.find((metric) => metric.key === metricKey);

    // Update global state with complete metric object
    dispatch(setSelectedMetric(selected));
  };

  return (
    <div className="my-4">
      {/**
       * HeroUI Select component with accessibility features
       * - Uses label prop for ARIA compliance
       * - Explicit id for DOM referencing
       * - Controlled component using Redux state
       */}
      <Select
        className="max-w-xs"
        id="metricSelect"
        label="Select Metric"
        value={selectedMetric.key} // Use key for value comparison
        onChange={handleMetricChange}
      >
        {/**
         * Dynamically generate select options from metrics config
         * Using index-free array map for clean component creation
         */}
        {metrics.map((metric) => (
          <SelectItem
            key={metric.key} // Unique key for React reconciliation
            value={metric.key} // Store technical key as value
          >
            {metric.label} {/* User-friendly display text */}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default MetricSelectFilter;
