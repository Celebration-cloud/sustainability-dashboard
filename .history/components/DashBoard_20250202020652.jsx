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
    const itemDate = new Date(item.date);
    console.log("Item Date:", itemDate);
    console.log("Filter:", filter);

    if (filter.startDate) {
      // Ensure filter.startDate is a Date object
      const startDate =
        filter.startDate instanceof Date
          ? filter.startDate
          : new Date(filter.startDate);
      if (itemDate.getTime() < startDate.getTime()) return false;
    }

    if (filter.endDate) {
      // Ensure filter.endDate is a Date object
      const endDate =
        filter.endDate instanceof Date
          ? filter.endDate
          : new Date(filter.endDate);
      if (itemDate.getTime() > endDate.getTime()) return false;
    }

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
