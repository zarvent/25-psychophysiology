// src/components/landing/AskPhineasGageSection.tsx
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { askPhineasGage, type AskPhineasGageOutput } from "@/ai/flows/ask-phineas-gage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, AlertTriangle, MessageSquare, User, Sparkles, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  question: z.string().min(5, "Tu pregunta debe tener al menos 5 caracteres.").max(300, "Tu pregunta no debe exceder los 300 caracteres."),
});

type FormData = z.infer<typeof FormSchema>;

export function AskPhineasGageSection() {
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
      const result: AskPhineasGageOutput = await askPhineasGage({ question: data.question });
      setAnswer(result.answer);
      toast({
        title: "Phineas Gage Ha Respondido",
        description: "La IA ha canalizado a Phineas Gage para tu pregunta.",
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Error desconocido";
      setError(`Error al conectar con Phineas Gage AI: ${errorMessage}. Inténtalo de nuevo más tarde.`);
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo obtener una respuesta de Phineas Gage.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full py-8 md:py-12">
      <Card className="bg-card/90 border-primary/50 shadow-xl shadow-primary/20 backdrop-blur-lg rounded-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-3">
            <Brain className="h-10 w-10 text-primary animate-pulse-glow-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">Habla con "Phineas Gage" AI</CardTitle>
          <CardDescription className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-2">
            Una IA entrenada con todo lo que hablo en mi exposicion , pregunta lo que quieras sobre psicofisiologia
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Tu Pregunta a Phineas Gage</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ej: Phineas, ¿cómo cambió tu vida después del accidente?"
                        className="min-h-[100px] sm:min-h-[120px] resize-none bg-input/70 border-border focus:border-primary text-base rounded-lg shadow-inner"
                        {...field}
                        aria-label="Campo de pregunta para Phineas Gage AI"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full md:w-auto text-base py-3 px-8 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                aria-label="Enviar pregunta a Phineas Gage AI"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Pensando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Preguntar a Phineas
                  </>
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <Alert variant="destructive" className="mt-6 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {askedQuestion && !error && (isLoading || answer) && (
            <div className="mt-8 space-y-4 pt-6 border-t border-border/50">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 shadow">
                <User className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-accent">Tu Pregunta:</p>
                  <p className="text-foreground/90">{askedQuestion}</p>
                </div>
              </div>
              
              {isLoading && !answer && (
                <div className="flex items-center justify-center p-4 space-x-3 rounded-lg bg-muted/50 shadow">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  <p className="text-primary">Phineas Gage está reflexionando...</p>
                </div>
              )}

              {answer && (
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/70 shadow-inner">
                  <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-primary">Respuesta de Phineas Gage:</p>
                    <p className="text-foreground whitespace-pre-wrap">{answer}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
       <style jsx global>{`
        @keyframes pulse-glow-primary {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 4px hsl(var(--primary))); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 12px hsl(var(--primary))); }
        }
        .animate-pulse-glow-primary {
          animation: pulse-glow-primary 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
