/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";

import mockData from "@/mockData.json"
export async function GET() {
  console.log(mockData)
  const mockD
  return NextResponse.json(mockData);
}