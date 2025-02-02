import Dashboard from "../components/Dashboard";
export default async function Home() {
  const response = await fetch("http://localhost:3000/api/mockData");
  const data = await response.json();

  return (
    <section className="">
      {/* <Dashboard mockData={data} /> */}
      <SustainableDashboar
    </section>
  );
}
