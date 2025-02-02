
"use client";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "@heroui/date-picker";
import { useCallback } from "react";

import { setFilter } from "../store/configStore";

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.sustainability);

  // Assume the onChange callback receives an object with start and end date parts
  const handleDateChange = useCallback(
    (dates) => {
      const { start, end } = dates;
      // Convert the start and end objects to JavaScript Date objects
      const startDate = new Date(start.year, start.month - 1, start.day);
      const endDate = new Date(end.year, end.month - 1, end.day);

      // Dispatch these dates to Redux or use them as needed.
      dispatch(setFilter({ startDate, endDate }));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4">
      <div>
        <label className="block mb-1" htmlFor="dateRange">
          Date Range
        </label>
        <DateRangePicker
          className="border p-2 rounded"
          endDate={filter.endDate}
          id="dateRange"
          placeholderText="Select date range"
          startDate={filter.startDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
