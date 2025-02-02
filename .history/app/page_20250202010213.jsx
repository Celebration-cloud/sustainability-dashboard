import Dashboard from "../components/Dashboard";
export default async function Home() {
  const response = await fetch("const mockData = [
    {
      date: "2024-02-01",
      carbonEmissions: 120,
      energySavings: 50,
      airQuality: 80,
    },
    {
      date: "2024-02-02",
      carbonEmissions: 110,
      energySavings: 60,
      airQuality: 85,
    },
    {
      date: "2024-02-03",
      carbonEmissions: 130,
      energySavings: 55,
      airQuality: 78,
    },
  ];");
  const data = await response.json();

  return (
    <section className="">
      <Dashboard mockData={data} />
    </section>
  );
}
