"use client";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useMemo } from "react";

import { setData } from "@/store/configStore";
import ChartComponent from "@/components/ChartComponent";
import SpinnerLoading from "@/components/SpinnerLoading";
import DateRangePicker from "@/components/DateRangeFilter";
import MetricSelectFilter from "@/components/MetricSelectFilter";

function Dashboard({ mockData }) {
  const dispatch = useDispatch();
  const { data, filter } = useSelector((state) => state.sustainability);

  // Simulate API call on component mount
  useEffect(() => {
    if (mockData) {
      dispatch(setData(mockData));
    }
  }, [dispatch, mockData]);

  // Filter data based on selected date range, using useMemo for performance
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.filter((item) => {
      const itemTime = new Date(item.date).getTime();
      
      if (isNaN(itemTime)) return false;

      const startTime = filter.startDate
        ? new Date(filter.startDate).getTime()
        : null;
      const endTime = filter.endDate
        ? new Date(filter.endDate).getTime()
        : null;

      // Include boundaries in the filtering logic
      if (startTime !== null && itemTime < startTime) return false;
      if (endTime !== null && itemTime > endTime) return false;

      return true;
    });
  }, [data, filter.startDate, filter.endDate]);

  return (
    <section className="w-full">
      <DateRangePicker />
      <MetricSelectFilter />
      <div className="mt-6">
        {!data || data.length === 0 ? (
          <p>Loading data...</p>
        ) : filteredData.length > 0 ? (
          <Suspense fallback={<SpinnerLoading />}>
            <ChartComponent data={filteredData} />
          </Suspense>
        ) : (
          <p>No data available for the selected date range.</p>
        )}
      </div>
    </section>
  );
}

export default Dashboard;