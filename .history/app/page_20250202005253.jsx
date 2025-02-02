import Dashboard from "../components/Dashboard";
export default async function Home() {
  const response = await fetch("/api/mockData");
  const data = await response.json();

  return (
    <section className="">
      <Dashboard m />
    </section>
  );
}
