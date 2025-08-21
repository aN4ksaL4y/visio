'use server';

import { suggestGlassesStyle } from '@/ai/flows/suggest-glasses-style';
import type { SuggestGlassesStyleOutput } from '@/ai/flows/suggest-glasses-style';

export async function runSuggestGlassesStyle(
  photoDataUri: string
): Promise<{ data: SuggestGlassesStyleOutput | null; error: string | null }> {
  try {
    if (!photoDataUri) {
      throw new Error('Photo data URI is required.');
    }
    const result = await suggestGlassesStyle({ photoDataUri });
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { data: null, error: `AI analysis failed: ${errorMessage}` };
  }
}
