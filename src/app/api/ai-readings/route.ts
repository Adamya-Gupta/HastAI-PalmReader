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

// app/api/ai-readings/route.ts

// import { NextResponse } from 'next/server';
// import { generateReadingFromBase64 } from '@/configs/AiModel';

// export async function POST(req: Request) {
//   try {
//     console.log('POST request received');
    
//     // Check if request has form data
//     const contentType = req.headers.get('content-type');
//     if (!contentType?.includes('multipart/form-data')) {
//       console.error('Invalid content type:', contentType);
//       return NextResponse.json(
//         { error: 'Invalid content type. Expected multipart/form-data' }, 
//         { status: 400 }
//       );
//     }

//     let formData;
//     try {
//       formData = await req.formData();
//     } catch (parseError) {
//       console.error('Error parsing form data:', parseError);
//       return NextResponse.json(
//         { error: 'Failed to parse form data' }, 
//         { status: 400 }
//       );
//     }

//     const file = formData.get('file') as File | null;
    
//     if (!file) {
//       console.error('No file provided in form data');
//       return NextResponse.json(
//         { error: 'No file provided' }, 
//         { status: 400 }
//       );
//     }

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       console.error('Invalid file type:', file.type);
//       return NextResponse.json(
//         { error: 'File must be an image' }, 
//         { status: 400 }
//       );
//     }

//     // Validate file size (5MB limit)
//     if (file.size > 5 * 1024 * 1024) {
//       console.error('File too large:', file.size);
//       return NextResponse.json(
//         { error: 'File size must be less than 5MB' }, 
//         { status: 400 }
//       );
//     }

//     console.log('File received:', {
//       name: file.name,
//       type: file.type,
//       size: file.size
//     });

//     let buffer;
//     try {
//       buffer = Buffer.from(await file.arrayBuffer());
//     } catch (bufferError) {
//       console.error('Error creating buffer from file:', bufferError);
//       return NextResponse.json(
//         { error: 'Failed to process file' }, 
//         { status: 500 }
//       );
//     }

//     const base64 = buffer.toString('base64');
//     console.log('Base64 conversion successful, length:', base64.length);

//     // Check if generateReadingFromBase64 function exists
//     if (typeof generateReadingFromBase64 !== 'function') {
//       console.error('generateReadingFromBase64 is not a function');
//       return NextResponse.json(
//         { error: 'AI model function not available' }, 
//         { status: 500 }
//       );
//     }

//     let jsonResponse;
//     try {
//       jsonResponse = await generateReadingFromBase64(base64);
//       console.log('AI response generated successfully');
//     } catch (aiError: any) {
//       console.error('Error generating AI response:', aiError);
//       return NextResponse.json(
//         { 
//           error: 'Failed to generate palm reading', 
//           details: aiError?.message || 'Unknown AI error'
//         }, 
//         { status: 500 }
//       );
//     }

//     // Validate AI response
//     if (!jsonResponse || typeof jsonResponse !== 'object') {
//       console.error('Invalid AI response:', jsonResponse);
//       return NextResponse.json(
//         { error: 'Invalid response from AI model' }, 
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(jsonResponse);
    
//   } catch (err: any) {
//     console.error('Unexpected error in ai-readings route:', err);
//     return NextResponse.json(
//       { 
//         error: 'Internal server error', 
//         details: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
//       }, 
//       { status: 500 }
//     );
//   }
// }

// // Add OPTIONS handler for CORS if needed
// export async function OPTIONS(req: Request) {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'POST, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     },
//   });
// }