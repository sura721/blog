import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "GET request successful. The route exists." });
}

export async function POST(req: Request) {
  console.log("POST request to webhook was successful!");
  return NextResponse.json({ message: "Webhook received by server!" }, { status: 200 });
}