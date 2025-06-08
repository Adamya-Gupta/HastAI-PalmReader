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

import { generateReadingFromBase64 } from "@/configs/AiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" }, 
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPEG, PNG, or WebP image." },
        { status: 400 }
      );
    }

    // Validate file size (e.g., 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Please upload an image smaller than 5MB." },
        { status: 400 }
      );
    }

    // Convert File to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");

    // Add timeout to prevent hanging requests
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 30000) // 30 seconds
    );

    const readingPromise = generateReadingFromBase64(base64Image);
    
    const jsonResponse = await Promise.race([readingPromise, timeoutPromise]);
    
    return NextResponse.json(jsonResponse);
    
  } catch (error) {
    console.error("Error generating reading:", error);
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message === 'Request timeout') {
        return NextResponse.json(
          { error: "Request timed out. Please try again." },
          { status: 408 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to generate reading. Please try again." },
      { status: 500 }
    );
  }
}