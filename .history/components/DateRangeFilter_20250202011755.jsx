/* eslint-disable prettier/prettier */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "@heroui/date-picker";
import { useCallback } from "react";

import { setFilter } from "../store/configStore";

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.sustainability);

  const handleDateChange = useCallbac(
    (dates) => {
      // Assuming dates is an object like { startDate, endDate }
      if (dates && typeof dates === "object") {
        const { startDate, endDate } = dates;
        dispatch(setFilter({ startDate, endDate }));
      }
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4">
      <div>
        <label className="block mb-1">Date Range</label>
        <DateRangePicker
          className="border p-2 rounded"
          placeholderText="Select date range"
          selected={[filter.startDate, filter.endDate]}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
