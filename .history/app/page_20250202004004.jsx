import DateRangePicker from "@/components/DateRangeFilter";
import { useEffect } from "react";
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
  
  return (
    <section className="">
      <DateRangePicker />
    </section>
  );
}
