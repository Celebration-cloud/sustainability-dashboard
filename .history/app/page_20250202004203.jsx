import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../store/configStore";

export default async function Home() {
  const dispatch = useDispatch();
  const respon = await fetch("/api/mockData");
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
