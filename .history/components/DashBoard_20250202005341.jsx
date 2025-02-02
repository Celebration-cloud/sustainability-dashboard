/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setData } from "../store/configStore";

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

    if (filter.startDate && itemDate < filter.startDate) return false;
    if (filter.endDate && itemDate > filter.endDate) return false;

    return true;
  });

  return (
    <section className="">
      <DateRangePicker />
      
    </section>
  );
}

export default Dashboard;
