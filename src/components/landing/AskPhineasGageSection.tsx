
// src/components/landing/AskPhineasGageSection.tsx
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { askProfesorPsicofisiologia, type AskProfesorOutput } from "@/ai/flows/ask-profesor-psicofisiologia"; // Updated import
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertTriangle, User, Brain, GraduationCap } from "lucide-react"; // Added GraduationCap
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  question: z.string().min(5, "Tu pregunta debe tener al menos 5 caracteres.").max(300, "Tu pregunta no debe exceder los 300 caracteres."),
});

type FormData = z.infer<typeof FormSchema>;

export function AskPhineasGageSection() { // Component name kept for now to avoid breaking imports, but functionality changed
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
      const result: AskProfesorOutput = await askProfesorPsicofisiologia({ question: data.question }); // Updated function call
      setAnswer(result.answer);
      toast({
        title: "El Profesor Ha Respondido",
        description: "Tu consulta sobre psicofisiología ha sido respondida.",
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Error desconocido";
      setError(`Error al consultar al Profesor AI: ${errorMessage}. Inténtalo de nuevo más tarde.`);
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo obtener una respuesta del Profesor.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full">
      <Card className="bg-card border border-[hsl(var(--border))]/60 shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm rounded-xl">
        <CardHeader className="text-center pt-6 sm:pt-8">
          <div className="flex items-center justify-center mb-3">
            <Brain className="h-10 w-10 text-primary animate-pulse-glow-primary" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary font-montserrat">
            Habla con "Phineas Gage" AI
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-2 px-2">
          Una IA entrenada con todo lo que hablé en mi exposición
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
                    <FormLabel className="sr-only">Tu Pregunta al Profesor</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe aquí tu pregunta sobre psicofisiología. Por ejemplo: ¿Cómo se relaciona la mente con el cerebro?"
                        className="min-h-[100px] sm:min-h-[120px] resize-none bg-input text-foreground border-[hsl(var(--border))] focus:border-primary focus:ring-2 focus:ring-primary/50 text-base rounded-lg placeholder:text-muted-foreground"
                        {...field}
                        aria-label="Campo de pregunta para el Profesor de PsicoFisiología AI"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full md:w-auto text-base py-3 px-8 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-primary/50"
                aria-label="Enviar pregunta al Profesor AI"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Consultando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Consultar a Phineas 
                  </>
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <Alert variant="destructive" className="mt-6 rounded-lg bg-destructive/10 border-destructive text-destructive-foreground">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {askedQuestion && !error && (isLoading || answer) && (
            <div className="mt-8 space-y-4 pt-6 border-t border-[hsl(var(--border))]/50">
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50 shadow-sm">
                <User className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-accent">Tu Pregunta:</p>
                  <p className="text-foreground/90">{askedQuestion}</p>
                </div>
              </div>
              
              {isLoading && !answer && (
                <div className="flex items-center justify-center p-4 space-x-3 rounded-lg bg-muted/50 shadow-sm">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  <p className="text-primary">Phineas está preparando su respuesta...</p>
                </div>
              )}

              {answer && (
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted shadow"> 
                  <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" /> {/* Changed icon */}
                  <div>
                    <p className="font-semibold text-primary">Respuesta de Phineas:</p>
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
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 3px hsl(var(--primary)/0.8)) drop-shadow(0 0 8px hsl(var(--primary) / 0.5)); }
          50% { opacity: 0.8; filter: drop-shadow(0 0 8px hsl(var(--primary)/0.6)) drop-shadow(0 0 15px hsl(var(--primary) / 0.3)); }
        }
        .animate-pulse-glow-primary {
          animation: pulse-glow-primary 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
