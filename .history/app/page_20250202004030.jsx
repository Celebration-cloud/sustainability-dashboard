import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../store/configStore";

const fetchData = async () => {
  try {
    // Replace the URL with your API endpoint or local JSON file path
    const { data } = await axios.get("/api/mockData");
    return data;
  } catch (error) {
    console.error("Axios error:", error);
    return [];
  }
};
export default function Home() {
  const dispatch = useDispatch();

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
