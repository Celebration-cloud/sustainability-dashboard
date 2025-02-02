/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";

import mockData from "@/mockData.json"
export async function GET() {
  console.log(mockData)
  const
  return NextResponse.json(mockData);
}