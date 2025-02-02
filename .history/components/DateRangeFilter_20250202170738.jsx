/* eslint-disable prettier/prettier */
"use client"; // Enables React's Client Components for use with Next.js

import { useDispatch, useSelector } from "react-redux"; // Hooks for Redux state management
import { DateRangePicker } from "@heroui/date-picker"; // Importing the DateRangePicker component from Hero UI library
import { useCallback } from "react"; // React hook for memoizing functions

import { setFilter } from "@/store/configStore"; // Redux action to update filter state

/**
 * DateRangeFilter Component
 *
 * This component provides a date range picker that allows users to select
 * a start and end date for filtering sustainability-related data.
 * The selected date range is stored in the Redux state and updated accordingly.
 */
const DateRangeFilter = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions to Redux store
  const { filter } = useSelector((state) => state.sustainability); // Accessing filter state from Redux

  /**
   * handleDateChange - Callback function triggered when date range changes.
   *
   * @param {Object} dates - Object containing start and end dates.
   * @property {Object} dates.start - The start date object { year, month, day }.
   * @property {Object} dates.end - The end date object { year, month, day }.
   */
  const handleDateChange = useCallback(
    (dates) => {
      const { start, end } = dates;

      // Convert received date objects into standard JavaScript Date instances.
      const startDate = new Date(start.year, start.month - 1, start.day);
      const endDate = new Date(end.year, end.month - 1, end.day);

      // Dispatch the updated date range to Redux store.
      dispatch(setFilter({ startDate, endDate }));
    },
    [dispatch] // Dependencies array ensures this function remains stable across re-renders.
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4">
      {/* Label for the Date Range Picker */}
      <div>
        <label className="block mb-1" htmlFor="dateRange">
          Date Range
        </label>
        {/* Date Range Picker Component */}
        <DateRangePicker
          className="border p-2 rounded" // Styling for the picker
          endDate={filter.endDate} // Fetching end date from Redux store
          id="dateRange"
          placeholderText="Select date range"
          startDate={filter.startDate} // Fetching start date from Redux store
          onChange={handleDateChange} // Function to handle date changes
        />
      </div>
    </div>
  );
};

export default DateRangeFilter; // Exporting component for use in other parts of the app
