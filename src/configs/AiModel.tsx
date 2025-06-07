import { GoogleGenAI } from "@google/genai";

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });


function extractJson(text: string) {
  const jsonRegex = /```json\s*([\s\S]*?)\s*```|({[\s\S]*})/;
  const match = text.match(jsonRegex);
  if (match) {
    return match[1] || match[2];
  }
  return null;
}


export async function generateReadingFromBase64(base64Image: string) {
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.5-flash-preview-04-17";

  const contents = [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: "image/jpeg",
          },
        },
        {
          text: `Do palm reading as an expert astrologer for the given image of hand.
Leave scientific temperaments. Give readings about:
- Fate line
- Head line
- Life line
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
  "Career": "...",
  "Love": "...",
  "Future": "...",
  "Summary": "..."
}

Do not add any explanation outside the JSON.`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = "";

  for await (const chunk of response) {
    fullResponse += chunk.text;
  }

  const jsonText = extractJson(fullResponse);

  if (!jsonText) {
    throw new Error("Could not extract JSON from response");
  }

  const jsonResponse = JSON.parse(jsonText);
  return jsonResponse;
}