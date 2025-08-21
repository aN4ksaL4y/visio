'use server';

/**
 * @fileOverview Provides AI-powered suggestions for frame styles based on a user's facial features.
 *
 * - suggestGlassesStyle - A function that handles the glasses style suggestion process.
 * - SuggestGlassesStyleInput - The input type for the suggestGlassesStyle function.
 * - SuggestGlassesStyleOutput - The return type for the suggestGlassesStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestGlassesStyleInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestGlassesStyleInput = z.infer<typeof SuggestGlassesStyleInputSchema>;

const SuggestGlassesStyleOutputSchema = z.object({
  suggestedFrameStyles: z
    .array(z.string())
    .describe('An array of suggested frame styles (e.g., cat-eye, aviator, round).'),
  styleMatchScore: z.number().describe('A score (0-1) indicating how well the suggested styles match the user.'),
});
export type SuggestGlassesStyleOutput = z.infer<typeof SuggestGlassesStyleOutputSchema>;

export async function suggestGlassesStyle(input: SuggestGlassesStyleInput): Promise<SuggestGlassesStyleOutput> {
  return suggestGlassesStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestGlassesStylePrompt',
  input: {schema: SuggestGlassesStyleInputSchema},
  output: {schema: SuggestGlassesStyleOutputSchema},
  prompt: `You are an AI assistant specializing in providing eyewear style recommendations based on user facial features. Analyze the uploaded image and suggest frame styles that would best suit the user.

Analyze the user's face in the provided photo and determine the most suitable frame styles. Consider factors such as face shape, brow line, and overall facial features to provide personalized recommendations.

Output the suggested frame styles as an array of strings, such as ["cat-eye", "aviator", "round"]. Also, provide a style match score (a number between 0 and 1, with 1 being a perfect match) indicating how well the suggested styles complement the user's features. 

Photo: {{media url=photoDataUri}}`,
});

const suggestGlassesStyleFlow = ai.defineFlow(
  {
    name: 'suggestGlassesStyleFlow',
    inputSchema: SuggestGlassesStyleInputSchema,
    outputSchema: SuggestGlassesStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
