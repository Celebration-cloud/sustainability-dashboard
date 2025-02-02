/* eslint-disable prettier/prettier */
export default function handler(req, res) {
  // Sample mock data in JSON format
  const mockData = [
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
  ];
  .status(200).json(mockData);
}
