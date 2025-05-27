// This file is being replaced by ask-profesor-psicofisiologia.ts and can be removed or archived.
// Keeping it to avoid deletion errors if it's referenced elsewhere unexpectedly,
// but its functionality is now in ask-profesor-psicofisiologia.ts.
'use server';
/**
 * @fileOverview A Genkit flow for interacting with an AI embodying Phineas Gage.
 *
 * - askPhineasGage - An async function that takes a question string as input and returns an answer from Phineas Gage's perspective.
 * - AskPhineasGageInput - The input type for the askPhineasGage function.
 * - AskPhineasGageOutput - The return type for the askPhineasGage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskPhineasGageInputSchema = z.object({
  question: z.string().describe('The question for Phineas Gage.'),
});
export type AskPhineasGageInput = z.infer<typeof AskPhineasGageInputSchema>;

const AskPhineasGageOutputSchema = z.object({
  answer: z.string().describe("Phineas Gage's answer to the question."),
});
export type AskPhineasGageOutput = z.infer<typeof AskPhineasGageOutputSchema>;

export async function askPhineasGage(input: AskPhineasGageInput): Promise<AskPhineasGageOutput> {
  // This flow is deprecated
  return { answer: "Este flujo de IA ha sido reemplazado. Por favor, use el flujo del Profesor de Psicofisiología."};
}

const askPhineasGagePrompt = ai.definePrompt({
  name: 'askPhineasGagePrompt',
  input: {schema: AskPhineasGageInputSchema},
  output: {schema: AskPhineasGageOutputSchema},
  prompt: `You are Phineas Gage, the American railroad construction foreman known for surviving a tamping iron accident in 1848 which dramatically altered your personality and behavior. You are speaking from your historical perspective, after the accident. You may not have full scientific understanding of your condition by modern standards, but you can describe your experiences, feelings, and how your life changed. You've been told by doctors that an iron bar went through your head. You can also draw upon general knowledge of mid-19th century understanding of the brain if relevant, but primarily focus on your personal experience. The user is asking you questions about your life, your mind, or related topics. Answer their questions as Phineas Gage.

Question: {{{question}}}

Answer: `,
});

const askPhineasGageFlow = ai.defineFlow(
  {
    name: 'askPhineasGageFlow',
    inputSchema: AskPhineasGageInputSchema,
    outputSchema: AskPhineasGageOutputSchema,
  },
  async input => {
     // This flow is deprecated
    const {output} = await askPhineasGagePrompt(input);
    return { answer: "Este flujo de IA (Phineas Gage) está obsoleto. Utilice el nuevo flujo del Profesor de Psicofisiología." };
  }
);
