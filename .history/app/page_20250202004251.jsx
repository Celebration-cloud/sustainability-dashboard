import DateRangePicker from "@/components/DateRangeFilter";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setData } from "../store/configStore";

export default async function Home() {
  const dispatch = useDispatch();
  const response = await fetch("/api/mockData");
  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}
