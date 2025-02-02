import Dashboard from "@/components/Dashboard";
app/api/mockData/route.js
// Static fallback data for build-time rendering
const staticMockData = 

/**
 * Home Component
 *
 * Fetches mock data from API with proper error handling and fallback.
 * Implements static data fallback for build-time rendering.
 *
 * @returns {JSX.Element} - Rendered dashboard with data
 */
export default async function Home() {
  let data = staticMockData;

  try {
    // Use environment variable for API endpoint
    const apiUrl = process.env.API_URL || "http://localhost:3000/api/mockData";
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Incremental Static Regeneration
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    data = await response.json();
  } catch (error) {
    console.error("Data fetch failed, using static fallback:", error);
  }

  return (
    <section className="p-4">
      <Dashboard mockData={data} />
    </section>
  );
}
