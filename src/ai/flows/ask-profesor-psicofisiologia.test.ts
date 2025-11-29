
import { describe, it, expect, vi } from 'vitest';
import { z } from 'genkit';

// Define the implementations inside vi.hoisted so they are available immediately
const mocks = vi.hoisted(() => {
  const flowImplementation = (input: any) => Promise.resolve({ answer: 'Mocked answer' });
  const defineFlowMock = vi.fn().mockReturnValue(flowImplementation);

  const definePromptMock = vi.fn().mockReturnValue((input: any) => Promise.resolve({ output: { answer: 'Mocked answer' } }));

  return {
    definePromptMock,
    defineFlowMock,
  };
});

// Mock the @/ai/genkit module
vi.mock('@/ai/genkit', () => {
  return {
    ai: {
      definePrompt: mocks.definePromptMock,
      defineFlow: mocks.defineFlowMock,
    },
  };
});

// Import the file to test.
import { askProfesorPsicofisiologia } from './ask-profesor-psicofisiologia';

describe('askProfesorPsicofisiologia', () => {
  it('should define the prompt without "Respuesta:" suffix', async () => {
    // Check the calls to definePrompt
    const calls = mocks.definePromptMock.mock.calls;
    expect(calls.length).toBeGreaterThan(0);

    const promptConfig = calls[0][0];
    expect(promptConfig).toBeDefined();
    expect(promptConfig.prompt).toBeDefined();

    // This expectation asserts that the bug is NOT present.
    expect(promptConfig.prompt.trim()).not.toMatch(/Respuesta:\s*$/);
  });

  it('should export a working function', async () => {
     const result = await askProfesorPsicofisiologia({ question: 'Test' });
     expect(result).toEqual({ answer: 'Mocked answer' });
  });
});
