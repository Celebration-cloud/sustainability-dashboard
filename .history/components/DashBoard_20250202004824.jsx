import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import { setData } from "../store/configStore";

function Dashboard({data}) {
const dispatch = useDispatch();
 const { data, filter } = useSelector((state) => state.sustainability);

 // Simulate API call on component mount
 useEffect(() => {
   fetchMockData().then((data) => {
     dispatch(setData(data));
   });
 }, [dispatch]);
  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}

export default Dashboard;
