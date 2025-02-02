import Dashboard from "../components"
export default async function Home() {
  const response = await fetch("/api/mockData");
  const data = await response.json();
  return (
    <section className="">
      <Dashboard />
    </section>
  );
}
