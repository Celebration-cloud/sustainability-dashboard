import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setData } from "../store/configStore";

import DateRangePicker from "@/components/DateRangeFilter";

function Dashboard({ data }) {
  const dispatch = useDispatch();
  const { data, filter } = useSelector((state) => state.sustainability);

  // Simulate API call on component mount
  useEffect(() => {
    dispatch(setData(data));
  }, [dispatch]);

  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}

export default Dashboard;
