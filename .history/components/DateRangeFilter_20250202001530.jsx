import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../store";
import { DateRangePicker } from "@heroui/date-picker";

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.sustainability);

  const handleStartDateChange = (date) => {
    dispatch(setFilter({ startDate: date }));
  };

  const handleEndDateChange = (date) => {
    dispatch(setFilter({ endDate: date }));
  };

  return (
    <form className="flex flex-col md:flex-row gap-4 my-4">
      <div>
        <label className="block">Start Date</label>
        <DateRand
          selected={filter.startDate}
          onChange={handleStartDateChange}
          className="border p-2 rounded"
          placeholderText="Select start date"
        />
      </div>
      <div>
        <label className="block">End Date</label>
        <DatePicker
          selected={filter.endDate}
          onChange={handleEndDateChange}
          className="border p-2 rounded"
          placeholderText="Select end date"
        />
      </div>
    </form>
  );
};

export default DateRangeFilter;
