// import { generateReadingFromBase64 } from "@/configs/AiModel";
// import { NextResponse } from "next/server";


// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const file = formData.get("file") as File;

//   if (!file) {
//     return NextResponse.json({ error: "No file provided" }, { status: 400 });
//   }

//   // Convert File to base64
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const base64Image = buffer.toString("base64");

//   try {
//     const jsonResponse = await generateReadingFromBase64(base64Image);
//     return NextResponse.json(jsonResponse);
//   } catch (error) {
//     console.error("Error generating reading:", error);
//     return NextResponse.json({ error: "Failed to generate reading" }, { status: 500 });
//   }
// }

// app/api/ai-readings/route.ts

import { NextResponse } from "next/server";
import { generateReadingFromBase64 } from "@/configs/AiModel";

// Limit payload size (optional for security)
export const config = {
  api: {
    bodyParser: true,
    sizeLimit: "5mb",
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");
    const jsonResponse = await generateReadingFromBase64(base64Image);

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Error in ai-readings route:", error);
    return NextResponse.json(
      { error: "Failed to generate reading", details: error.message },
      { status: 500 }
    );
  }
}
