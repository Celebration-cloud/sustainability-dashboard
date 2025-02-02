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
    // Convert item.date to a Date object.
    const itemDate = new Date(item.date);

    if (isNaN(itemDate.getTime())) {
      console.error("Invalid item date:", item.date);

      return false;
    }

    // Convert filter.startDate and filter.endDate to Date objects if they exist.
    const startDate = filter.startDate ? new Date(filter.startDate) : null;
    const endDate = filter.endDate ? new Date(filter.endDate) : null;

    console.log("itemDate:", itemDate);
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    // Check if the item date is within the selected date range

    // Check if the item's date falls outside the range.
    if (startDate && itemDate.getTime() =< startDate.getTime()) return false;
    if (endDate && itemDate.getTime() => endDate.getTime()) return false;

    return true;
  });



  return (
    <section className="">
      <DateRangePicker />
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
