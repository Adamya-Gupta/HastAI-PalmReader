// import { GoogleGenAI } from "@google/genai";

//   const ai = new GoogleGenAI({
//     apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//   });


// function extractJson(text: string) {
//   const jsonRegex = /```json\s*([\s\S]*?)\s*```|({[\s\S]*})/;
//   const match = text.match(jsonRegex);
//   if (match) {
//     return match[1] || match[2];
//   }
//   return null;
// }


// export async function generateReadingFromBase64(base64Image: string) {
//   const config = {
//     thinkingConfig: {
//       thinkingBudget: 0,
//     },
//     responseMimeType: "text/plain",
//   };

//   const model = "gemini-2.5-flash-preview-04-17";

//   const contents = [
//     {
//       role: "user",
//       parts: [
//         {
//           inlineData: {
//             data: base64Image,
//             mimeType: "image/jpeg",
//           },
//         },
//         {
//           text: `Do palm reading as an expert astrologer for the given image of hand.
// Leave scientific temperaments. Give readings about:
// - Fate line
// - Head line
// - Life line
// - Heart line
// - Career
// - Love
// - Future
// - Summary

// Give a brutally honest response.
// Also give readings according to different lines.

// IMPORTANT: Respond strictly in this exact JSON format:

// {
//   "Fate line": "...",
//   "Head line": "...",
//   "Life line": "...",
//   "Heart line":"...",
//   "Career": "...",
//   "Love": "...",
//   "Future": "...",
//   "Summary": "..."
// }

// Do not add any explanation outside the JSON.`,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });

//   let fullResponse = "";

//   for await (const chunk of response) {
//     fullResponse += chunk.text;
//   }

//   const jsonText = extractJson(fullResponse);

//   if (!jsonText) {
//     throw new Error("Could not extract JSON from response");
//   }

//   const jsonResponse = JSON.parse(jsonText);
//   return jsonResponse;
// }

import { GoogleGenAI } from "@google/genai";

// Use server-side environment variable (not NEXT_PUBLIC_)
const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

function extractJson(text: string) {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```|({[\s\S]*})/;
  const match = text.match(jsonRegex);
  if (match) {
    return match[1] || match[2];
  }
  return null;
}

export async function generateReadingFromBase64(base64Image: string, mimeType: string = "image/jpeg") {
  try {
    // Use the correct model name
    const model = "gemini-2.5-flash-preview-04-17";

    // Correct structure according to the documentation
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            {
              text: `Do palm reading as an expert astrologer for the given image of hand.
Leave scientific temperaments. Give readings about:
- Fate line
- Head line
- Life line
- Heart line
- Career
- Love
- Future
- Summary

Give a brutally honest response.
Also give readings according to different lines.

IMPORTANT: Respond strictly in this exact JSON format:

{
  "Fate line": "...",
  "Head line": "...",
  "Life line": "...",
  "Heart line":"...",
  "Career": "...",
  "Love": "...",
  "Future": "...",
  "Summary": "..."
}

Do not add any explanation outside the JSON.`,
            },
          ],
        },
      ],
    });

    // Get the response text directly (not streaming)
    const fullResponse = response.text;

    if (!fullResponse) {
      throw new Error("No response received from AI model");
    }

    // Try to extract JSON from the response
    const jsonText = extractJson(fullResponse);

    if (!jsonText) {
      // If no JSON wrapper, try parsing the response directly
      try {
        const jsonResponse = JSON.parse(fullResponse);
        return jsonResponse;
      } catch {
        throw new Error("Could not extract valid JSON from response");
      }
    }

    const jsonResponse = JSON.parse(jsonText);
    return jsonResponse;

  } catch (error) {
    console.error("Error in generateReadingFromBase64:", error);
    throw new Error(`AI model error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}