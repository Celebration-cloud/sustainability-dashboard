import Dashboard from "@/components/Dashboard"; // Import the Dashboard component
import mockData from "@/mockData.json"; // Importing mock data from a JSON file
/**
 * Home Component
 *
 * This is the main page component that fetches mock data from an API and passes it to the Dashboard component.
 * The API call is performed using `fetch` inside an async function since Next.js supports server-side rendering.
 *
 * @returns {JSX.Element} - The rendered Home component
 */
export default async function Home() {
  // Fetch mock data from the local API endpoint
  let data = mo
  const response = await fetch("http://localhost:3000/api/mockData");
  const data = await response.json(); // Convert response to JSON format

  return (
    <section className="">
      {/* Pass the fetched data as a prop to the Dashboard component */}
      <Dashboard mockData={data} />
    </section>
  );
}
