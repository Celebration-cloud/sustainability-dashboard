import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import { setData } from "../store/configStore";

export default async function Home() {
  const response = await fetch("/api/mockData");
  const data = await response.json();
  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}
