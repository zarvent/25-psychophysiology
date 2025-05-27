// src/components/landing/AskTheBrainSection.tsx
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { askTheBrain, type AskTheBrainOutput } from "@/ai/flows/ask-the-brain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, AlertTriangle, MessageSquare, User, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  question: z.string().min(10, "Tu pregunta debe tener al menos 10 caracteres.").max(300, "Tu pregunta no debe exceder los 300 caracteres."),
});

type FormData = z.infer<typeof FormSchema>;

export function AskTheBrainSection() {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [askedQuestion, setAskedQuestion] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setAnswer(null);
    setAskedQuestion(data.question);

    try {
      const result: AskTheBrainOutput = await askTheBrain({ question: data.question });
      setAnswer(result.answer);
      toast({
        title: "Respuesta Generada",
        description: "La IA ha respondido a tu pregunta.",
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Error desconocido";
      setError(`Error al conectar con la IA: ${errorMessage}. Inténtalo de nuevo más tarde.`);
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo obtener una respuesta.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-12">
      <Card className="bg-card/80 border-accent/30 shadow-2xl shadow-accent/10 backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Wand2 className="h-10 w-10 text-accent animate-pulse-glow" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-semibold">Pregúntale al Cerebro IA</CardTitle>
          <CardDescription className="text-muted-foreground md:text-lg max-w-xl mx-auto">
            ¿Tienes curiosidad sobre la conexión mente-cuerpo? Nuestra IA, entrenada en principios psicofisiológicos, está aquí para responder.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Tu Pregunta</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: ¿Cómo afecta el estrés al sistema inmunológico?"
                        className="min-h-[100px] resize-none bg-input/50 border-border focus:border-primary text-base"
                        {...field}
                        aria-label="Campo de pregunta para la IA"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full md:w-auto text-base py-3 px-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg"
                aria-label="Enviar pregunta a la IA"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Enviar Pregunta
                  </>
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {askedQuestion && !error && (isLoading || answer) && (
            <div className="mt-8 space-y-4 pt-6 border-t border-border/50">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
                <User className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-primary">Tu Pregunta:</p>
                  <p className="text-foreground/90">{askedQuestion}</p>
                </div>
              </div>
              
              {isLoading && !answer && (
                <div className="flex items-center justify-center p-4 space-x-3 rounded-lg bg-muted/30">
                  <Loader2 className="h-6 w-6 text-accent animate-spin" />
                  <p className="text-accent">La IA está pensando...</p>
                </div>
              )}

              {answer && (
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 shadow-inner">
                  <MessageSquare className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-accent">Respuesta de la IA:</p>
                    <p className="text-foreground whitespace-pre-wrap">{answer}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
       <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 3px hsl(var(--accent))); }
          50% { opacity: 0.8; filter: drop-shadow(0 0 10px hsl(var(--accent))); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
