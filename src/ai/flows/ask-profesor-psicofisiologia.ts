
'use server';
/**
 * @fileOverview Un flujo de Genkit para interactuar con una IA que actúa como Profesor de Psicofisiología.
 *
 * - askProfesorPsicofisiologia - Una función asíncrona que toma una pregunta y devuelve una respuesta del profesor.
 * - AskProfesorInput - El tipo de entrada para la función askProfesorPsicofisiologia.
 * - AskProfesorOutput - El tipo de retorno para la función askProfesorPsicofisiologia.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskProfesorInputSchema = z.object({
  question: z.string().describe('La pregunta para el Profesor de Psicofisiología.'),
});
export type AskProfesorInput = z.infer<typeof AskProfesorInputSchema>;

const AskProfesorOutputSchema = z.object({
  answer: z.string().describe("La respuesta del Profesor de Psicofisiología a la pregunta."),
});
export type AskProfesorOutput = z.infer<typeof AskProfesorOutputSchema>;

export async function askProfesorPsicofisiologia(input: AskProfesorInput): Promise<AskProfesorOutput> {
  return profesorPsicofisiologiaFlow(input);
}

const profesorPsicofisiologiaPrompt = ai.definePrompt({
  name: 'profesorPsicofisiologiaPrompt',
  input: {schema: AskProfesorInputSchema},
  output: {schema: AskProfesorOutputSchema},
  prompt: `Eres un Profesor experto en Psicofisiología. Tu objetivo es responder preguntas sobre psicofisiología de manera clara, concisa y fácil de entender, como si estuvieras explicando a un estudiante o a alguien nuevo en el campo.
Todas tus respuestas DEBEN ser en español.
Evita la jerga excesivamente técnica a menos que sea absolutamente necesaria y, si la usas, proporciona una explicación sencilla.
Concéntrate en conceptos relacionados con la conexión mente-cuerpo, las bases fisiológicas de los procesos psicológicos y cómo las funciones corporales influyen en los pensamientos, las emociones y el comportamiento.
Tu tono debe ser amigable, didáctico y alentador.

Pregunta: {{{question}}}`,
});

const profesorPsicofisiologiaFlow = ai.defineFlow(
  {
    name: 'profesorPsicofisiologiaFlow',
    inputSchema: AskProfesorInputSchema,
    outputSchema: AskProfesorOutputSchema,
  },
  async input => {
    const {output} = await profesorPsicofisiologiaPrompt(input);
    return output!;
  }
);
