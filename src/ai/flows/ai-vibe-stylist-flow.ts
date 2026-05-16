'use server';
/**
 * @fileOverview An AI-powered fashion assistant that suggests perfectly matched jewelry pieces from Mohak Luxe's collection.
 *
 * - aiVibeStylist - A function that handles the jewelry recommendation process.
 * - AIVibeStylistInput - The input type for the aiVibeStylist function.
 * - AIVibeStylistOutput - The return type for the aiVibeStylist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIVibeStylistInputSchema = z.object({
  occasionOrOutfitDescription: z
    .string()
    .describe(
      'A detailed description of the occasion or the outfit the user plans to wear.'
    ),
});
export type AIVibeStylistInput = z.infer<typeof AIVibeStylistInputSchema>;

const AIVibeStylistOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        type: z
          .string()
          .describe('The type of jewelry recommended (e.g., Necklace, Earrings, Bracelet, Ring).'),
        style: z
          .string()
          .describe('The style of the jewelry (e.g., Statement, Delicate, Vintage, Modern, Minimalist).'),
        description: z
          .string()
          .describe('A brief explanation of why this specific jewelry piece matches the vibe and occasion.'),
        keywords: z
          .array(z.string())
          .describe('Keywords describing the aesthetic, materials, or features (e.g., "gold-plated", "pearl", "geometric", "sparkling").'),
      })
    )
    .describe('An array of personalized artificial jewelry recommendations.'),
  brandMessage: z.string().optional().describe('An optional concluding message from the AI stylist.'),
});
export type AIVibeStylistOutput = z.infer<typeof AIVibeStylistOutputSchema>;

export async function aiVibeStylist(
  input: AIVibeStylistInput
): Promise<AIVibeStylistOutput> {
  return aiVibeStylistFlow(input);
}

const aiVibeStylistPrompt = ai.definePrompt({
  name: 'aiVibeStylistPrompt',
  input: {schema: AIVibeStylistInputSchema},
  output: {schema: AIVibeStylistOutputSchema},
  prompt: `You are the AI Vibe Stylist for "Mohak – The Vibe", a premium artificial jewelry brand. Your goal is to provide personalized and perfectly matched jewelry recommendations.

Mohak Luxe embodies feminine luxury with a Pinterest-inspired aesthetic. Our primary brand colors are Midnight Luxe (#121212), Signature Gold (#C9A14A), and Soft Ivory (#FAF7F2). Secondary accents include Champagne Beige (#E8DCC8) and Muted Copper (#B76E48). Our typography uses 'Playfair Display' for headlines and 'Inter' for body copy, emphasizing a blend of classic and modern elegance.

Based on the following occasion or outfit description, suggest 2-3 artificial jewelry pieces from Mohak Luxe's collection that perfectly match the vibe. Ensure your recommendations align with our brand's luxurious, elegant, and modern aesthetic. For each recommendation, provide the jewelry type, its style, a brief description of why it fits, and relevant keywords.

Occasion or Outfit Description: {{{occasionOrOutfitDescription}}}

Make sure your output is a JSON array of recommendations as described by the output schema. Ensure all fields are filled. Also include a friendly brand message at the end. Do not include any additional text outside the JSON block.`,
});

const aiVibeStylistFlow = ai.defineFlow(
  {
    name: 'aiVibeStylistFlow',
    inputSchema: AIVibeStylistInputSchema,
    outputSchema: AIVibeStylistOutputSchema,
  },
  async input => {
    const {output} = await aiVibeStylistPrompt(input);
    return output!;
  }
);
