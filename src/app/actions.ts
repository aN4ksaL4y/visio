'use server';

import type { SuggestGlassesStyleOutput } from '@/lib/types';

async function suggestGlassesStyle(
  photoDataUri: string
): Promise<SuggestGlassesStyleOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const [header, data] = photoDataUri.split(',');
  const mimeType = header.match(/:(.*?);/)?.[1];

  if (!mimeType || !data) {
    throw new Error('Invalid data URI.');
  }

  const prompt = `You are an AI assistant specializing in providing eyewear style recommendations based on user facial features. Analyze the uploaded image and suggest frame styles that would best suit the user.

Analyze the user's face in the provided photo and determine the most suitable frame styles. Consider factors such as face shape, brow line, and overall facial features to provide personalized recommendations.

Output a JSON object with the following structure:
{
  "suggestedFrameStyles": ["style1", "style2", "..."],
  "styleMatchScore": 0.0-1.0
}

Example:
{
  "suggestedFrameStyles": ["cat-eye", "aviator", "round"],
  "styleMatchScore": 0.85
}`;

  const body = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType,
              data,
            },
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.statusText} - ${errorText}`);
  }

  const responseJson = await response.json();
  const textContent = responseJson.candidates[0].content.parts[0].text;
  return JSON.parse(textContent);
}


export async function runSuggestGlassesStyle(
  photoDataUri: string
): Promise<{ data: SuggestGlassesStyleOutput | null; error: string | null }> {
  try {
    if (!photoDataUri) {
      throw new Error('Photo data URI is required.');
    }
    const result = await suggestGlassesStyle(photoDataUri);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { data: null, error: `AI analysis failed: ${errorMessage}` };
  }
}
