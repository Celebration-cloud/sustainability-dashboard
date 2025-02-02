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

   return (
     (!dateRange.start || itemDate >= new Date(dateRange.start)) &&
     (!dateRange.end || itemDate <= new Date(dateRange.end))
   );
 });

console.log("Filtered data:", filteredData);


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
