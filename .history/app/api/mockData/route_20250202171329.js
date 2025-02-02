import { NextResponse } from "next/server"; // Next.js response helper for API routes

import mockData from "@/mockData.json"; // Importing mock data from a JSON file

/**
 * GET API Route
 * - Handles GET requests and returns mock data in JSON format.
 * - Useful for testing frontend components before integrating with a real backend.
 *
 * @returns {NextResponse} - JSON response containing mock data
 */
export async function GET() {
  return NextResponse.json(mockData); // Sends the mock data as a JSON response
}
