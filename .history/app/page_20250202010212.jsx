import Dashboard from "../components/Dashboard";
export default async function Home() {
  const response = await fetch("");
  const data = await response.json();

  return (
    <section className="">
      <Dashboard mockData={data} />
    </section>
  );
}
