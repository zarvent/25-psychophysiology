// This file is being replaced by AskPhineasGageSection.tsx and can be removed or archived.
// Keeping it to avoid deletion errors if it's referenced elsewhere unexpectedly,
// but its functionality is now in AskPhineasGageSection.tsx.
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2, AlertTriangle } from "lucide-react";

export function AskTheBrainSection() {
  return (
    <section className="w-full py-12">
      <Card className="bg-card/80 border-accent/30 shadow-2xl shadow-accent/10 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-semibold">Componente Desactualizado</CardTitle>
          <CardDescription className="text-muted-foreground md:text-lg max-w-xl mx-auto">
            Esta sección ha sido reemplazada por "Habla con Phineas Gage AI".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Desactualizado</AlertTitle>
            <AlertDescription>
              Por favor, usa el nuevo componente AskPhineasGageSection.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </section>
  );
}
