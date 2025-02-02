/* eslint-disable prettier/prettier */
import { NextResponse } from "next/server";
import mockData from "../../../j"
export async function GET() {

  return NextResponse.json(mockData);
}
