import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import { setData } from "../store/configStore";

function Dashboard() {
const dispatch = useDispatch();
  const response = await fetch("/api/mockData");
  const data = await response.json();
  dispatch(setData(data));
  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}

export default Dashboard;
