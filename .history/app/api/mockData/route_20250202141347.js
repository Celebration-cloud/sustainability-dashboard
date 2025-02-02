/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import mockData
export async function GET() {

  return NextResponse.json(mockData);
}
