"use client"; // This directive ensures that the component runs on the client side

import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state management
import { Suspense, useEffect, useMemo } from "react"; // React hooks for side effects, memoization, and lazy loading

import { setData } from "@/store/configStore"; // Redux action to update the store with new data
import ChartComponent from "@/components/ChartComponent"; // Component responsible for rendering the chart
import SpinnerLoading from "@/components/SpinnerLoading"; // Loading spinner for fallback UI
import DateRangePicker from "@/components/DateRangeFilter"; // Date range filter component
import MetricSelectFilter from "@/components/MetricSelectFilter"; // Dropdown to select different metrics

/**
 * Dashboard Component
 *
 * This component displays sustainability data in a chart, allowing users to filter it by date range and metric.
 * It fetches initial data, applies filtering, and handles loading states.
 *
 * @param {Object} props - React component props
 * @param {Array} props.mockData - Mock data to be used as initial dataset (simulating an API response)
 */
function Dashboard({ mockData }) {
  const dispatch = useDispatch(); // Redux dispatch function to trigger actions
  const { data, filter } = useSelector((state) => state.sustainability); // Extract relevant state from Redux store

  /**
   * useEffect Hook:
   * Runs once on component mount and whenever `mockData` changes.
   * If mockData is available, it is dispatched to the Redux store.
   */
  useEffect(() => {
    if (mockData) {
      dispatch(setData(mockData)); // Populate Redux store with mock data
    }
  }, [dispatch, mockData]);

  /**
   * useMemo Hook:
   * Filters the dataset based on the selected date range.
   * This ensures the filtering operation is optimized and only recalculated when dependencies change.
   *
   * @returns {Array} - Filtered dataset based on the selected date range
   */
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return []; // Return an empty array if no data is available

    return data.filter((item) => {
      const itemTime = new Date(item.date).getTime(); // Convert item date to timestamp

      if (isNaN(itemTime)) return false; // Skip invalid dates

      // Convert filter dates to timestamps (or null if not set)
      const startTime = filter.startDate
        ? new Date(filter.startDate).getTime()
        : null;
      const endTime = filter.endDate
        ? new Date(filter.endDate).getTime()
        : null;

      // Apply filtering: Ensure item falls within the selected date range
      if (startTime !== null && itemTime < startTime) return false;
      if (endTime !== null && itemTime > endTime) return false;

      return true; // Include item if it meets the criteria
    });
  }, [data, filter.startDate, filter.endDate]);

  return (
    <section className="w-full">
      {/* Date range filter component */}
      <DateRangePicker />

      {/* Metric selection dropdown */}
      <MetricSelectFilter />

      {/* Data visualization and handling loading states */}
      <div className="mt-6">
        {!data || data.length === 0 ? (
          <p>Loading data...</p> // Show loading message if data is empty
        ) : filteredData.length > 0 ? (
          // Wrap chart in Suspense for fallback loading behavior
          <Suspense fallback={<SpinnerLoading />}>
            <ChartComponent data={filteredData} />
          </Suspense>
        ) : (
          <p>No data available for the selected date range.</p> // Display message if no data matches the filter
        )}
      </div>
    </section>
  );
}

export default Dashboard; // Export the component for use in other parts of the application
