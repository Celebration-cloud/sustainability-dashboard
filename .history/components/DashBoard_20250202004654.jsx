import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import { setData } from "../store/configStore";

function Dashboard() {
const dispatch = useDispatch();
  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}

export default Dashboard;
