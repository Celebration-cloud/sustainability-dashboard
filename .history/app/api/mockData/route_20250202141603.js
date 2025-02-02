/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";

import mockData from "@/mockData.json"
export async function GET() {
  console.lg
  return NextResponse.json(mockData);
}