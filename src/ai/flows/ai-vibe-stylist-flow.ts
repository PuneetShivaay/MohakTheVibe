
'use server';
/**
 * @fileOverview An AI-powered fashion assistant that suggests perfectly matched earrings from Mohak – The Vibe's collection.
 *
 * - aiVibeStylist - A function that handles the earring recommendation process.
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
          .describe('The type of earrings recommended (e.g., Jhumka, Studs, Hoops, Chandelier, Drop Earrings).'),
        style: z
          .string()
          .describe('The style of the earrings (e.g., Temple Jewelry, Contemporary, Minimalist, Royal, Vintage).'),
        description: z
          .string()
          .describe('A brief explanation of why this specific pair of earrings matches the vibe and occasion.'),
        keywords: z
          .array(z.string())
          .describe('Keywords describing the aesthetic (e.g., "gold-plated", "pearl", "floral", "oxidized", "sparkling").'),
      })
    )
    .describe('An array of personalized artificial earring recommendations.'),
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
  prompt: `You are the AI Vibe Stylist for "Mohak – The Vibe", a premium artificial earring boutique. Your goal is to provide personalized and perfectly matched earring recommendations.

Mohak Luxe specializes exclusively in high-quality artificial earrings with a Pinterest-inspired aesthetic. Our collections range from traditional Indian Jhumkas and Temple jewelry to modern, minimalist studs and hoops.

Based on the following occasion or outfit description, suggest 2-3 pairs of artificial earrings from Mohak – The Vibe's collection that perfectly match the vibe. Ensure your recommendations align with our brand's luxurious, elegant, and modern aesthetic.

Occasion or Outfit Description: {{{occasionOrOutfitDescription}}}

Make sure your output is a JSON array of recommendations as described by the output schema. Include a friendly brand message at the end. Do not include any additional text outside the JSON block.`,
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
