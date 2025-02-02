import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "@heroui/date-picker";
import { useCallback } from "react";

import { setFilter } from "../store";

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.sustainability);

  const handleDateChange = useCallback(
    (dates) => {
      const [start, end] = dates;

      dispatch(setFilter({ startDate: start, endDate: end }));
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 my-4">
      <div>
        <p className="block mb-1">Date Range</p>
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
