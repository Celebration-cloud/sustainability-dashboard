import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../store/configStore";

export default function Home() {
  const dispatch = useDispatch();
  const data = fe
  useEffect(() => {
    fetchData().then((data) => {
      dispatch(setData(data));
    });
  }, [dispatch]);
  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}
