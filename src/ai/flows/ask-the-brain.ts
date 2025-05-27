// src/ai/flows/ask-the-brain.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for answering questions about the mind-body connection using psychophysiological principles.
 *
 * - askTheBrain - An async function that takes a question string as input and returns an answer string.
 * - AskTheBrainInput - The input type for the askTheBrain function.
 * - AskTheBrainOutput - The return type for the askTheBrain function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskTheBrainInputSchema = z.object({
  question: z.string().describe('The question about the mind-body connection.'),
});
export type AskTheBrainInput = z.infer<typeof AskTheBrainInputSchema>;

const AskTheBrainOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the mind-body connection, based on psychophysiological principles.'),
});
export type AskTheBrainOutput = z.infer<typeof AskTheBrainOutputSchema>;

export async function askTheBrain(input: AskTheBrainInput): Promise<AskTheBrainOutput> {
  return askTheBrainFlow(input);
}

const askTheBrainPrompt = ai.definePrompt({
  name: 'askTheBrainPrompt',
  input: {schema: AskTheBrainInputSchema},
  output: {schema: AskTheBrainOutputSchema},
  prompt: `You are an AI assistant trained on psychophysiological principles. Answer the following question about the mind-body connection:

Question: {{{question}}}

Answer: `,
});

const askTheBrainFlow = ai.defineFlow(
  {
    name: 'askTheBrainFlow',
    inputSchema: AskTheBrainInputSchema,
    outputSchema: AskTheBrainOutputSchema,
  },
  async input => {
    const {output} = await askTheBrainPrompt(input);
    return output!;
  }
);
