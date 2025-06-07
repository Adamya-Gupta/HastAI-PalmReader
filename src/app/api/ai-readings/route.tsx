import { generateReadingFromBase64 } from "@/configs/AiModel";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Convert File to base64
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Image = buffer.toString("base64");

  try {
    const jsonResponse = await generateReadingFromBase64(base64Image);
    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error("Error generating reading:", error);
    return NextResponse.json({ error: "Failed to generate reading" }, { status: 500 });
  }
}
