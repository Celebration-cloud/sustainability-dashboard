/* eslint-disable prettier/prettier */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "@heroui/date-picker";
import { useCallback } from "react";

import { setFilter } from "../store/configStore";

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.sustainability);

  // Assume the onChange callback receives two arguments: startDate and endDate
  const handleDateChange = useCallback(
    (dates) => {
        const {}
      console.log("Selected dates:", dates);
    //   dispatch(setFilter({ startDate, endDate }));
    },
    []
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4">
      <div>
        <label className="block mb-1">Date Range</label>
        <DateRangePicker
          className="border p-2 rounded"
          placeholderText="Select date range"
          startDate={filter.startDate}
          endDate={filter.endDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
