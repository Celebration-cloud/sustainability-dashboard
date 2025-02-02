/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
"use client";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";

import { setData } from "@/store/configStore";
import ChartComponent from "@/components/ChartComponent"
import SpinnerLoading from "@/components/SpinnerLoading"
import DateRangePicker from "@/components/DateRangeFilter";

function Dashboard({ mockData }) {
  const dispatch = useDispatch();
  const { data, filter } = useSelector((state) => state.sustainability);

  // Simulate API call on component mount
  useEffect(() => {
    dispatch(setData(mockData));
  }, [dispatch]);
  // Filter data based on selected date range
const filteredData = data.filter((item) => {
  // Convert item.date to a numeric timestamp.
  const itemTime = new Date(item.date).getTime();

  if (isNaN(itemTime)) {
    console.error("Invalid item date:", item.date);

    return false;
  }

  // Convert filter.startDate and filter.endDate to timestamps if they exist.
  const startTime = filter.startDate
    ? new Date(filter.startDate).getTime()
    : null;
  const endTime = filter.endDate ? new Date(filter.endDate).getTime() : null;

  // Optional logging for debugging:
  console.log("itemTime:", itemTime);
  console.log("startTime:", startTime);
  console.log("endTime:", endTime);

  // Check if the item date is outside the selected range.
  // Here, we are excluding items with dates equal to the boundaries.
  // (Change <= or >= to < or > if you want to include boundaries.)
  if (startTime !== null && itemTime <= startTime) return false;
  if (endTime !== null && itemTime >= endTime) return false;

  // Return true to include the item in the filtered data.
  return true;
});

console.log("Filtered data:", filteredData);


  return (
    <section className="">
      <DateRangePicker />
      <MetricSelectFilter />
      <div className="mt-6">
        {data.length === 0 ? (
          <p>Loading data...</p>
        ) : filteredData.length > 0 ? (
            <Suspense fallback={<SpinnerLoading />}>
                <div>
                    <ChartComponent data={filteredData} />
                </div>
            </Suspense>
        ) : (
          <p>No data available for the selected date range.</p>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
