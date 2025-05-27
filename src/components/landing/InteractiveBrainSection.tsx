// src/components/landing/InteractiveBrainSection.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { InfoTooltip } from "./InfoTooltip";
import { PulsingDot } from "../icons/PulsingDot";

const brainTooltips = [
  { id: "amygdala", title: "Amígdala", description: "Clave para procesar emociones como el miedo y el placer, y en la formación de recuerdos emocionales.", position: { top: "45%", left: "52%" }, side: "right" as const },
  { id: "pfc", title: "Corteza Prefrontal", description: "Involucrada en la toma de decisiones, planificación, personalidad y moderación del comportamiento social.", position: { top: "20%", left: "40%" }, side: "top" as const },
  { id: "hippocampus", title: "Hipocampo", description: "Crucial para la formación de nuevos recuerdos (memoria a corto y largo plazo) y la navegación espacial.", position: { top: "55%", left: "35%" }, side: "left" as const },
  { id: "hypothalamus", title: "Hipotálamo", description: "Regula funciones corporales esenciales como la temperatura, el hambre, la sed y los ciclos de sueño. Conecta el sistema nervioso con el endocrino.", position: { top: "60%", left: "48%" }, side: "bottom" as const },
  { id: "cerebellum", title: "Cerebelo", description: "Coordina los movimientos voluntarios, el equilibrio, la postura y también participa en algunas funciones cognitivas como el lenguaje.", position: { top: "75%", left: "60%" }, side: "right" as const },
];

export function InteractiveBrainSection() {
  return (
    <section className="w-full py-12">
      <Card className="bg-card/80 border-primary/30 shadow-2xl shadow-primary/10 backdrop-blur-md overflow-hidden">
        <CardContent className="p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-center">
            El Cerebro Interactivo: Un Universo Interior
          </h2>
          <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
            Pasa el cursor sobre los puntos destacados para descubrir cómo diferentes áreas del cerebro influyen en nuestras emociones y cognición.
          </p>
          
          <div className="relative w-full max-w-2xl mx-auto aspect-[4/3]">
            <div className="animate-fadeIn" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              <Image
                src="https://placehold.co/800x600.png"
                alt="Modelo del Cerebro Humano"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                data-ai-hint="human brain anatomy connections"
                priority
              />
            </div>
            
            {/* Decorative SVG lines can be added here if desired, without complex animation for now */}

            {brainTooltips.map((tooltip, index) => (
              <div
                key={tooltip.id}
                className="absolute animate-fadeIn"
                style={{ 
                  top: tooltip.position.top, 
                  left: tooltip.position.left, 
                  transform: "translate(-50%, -50%)",
                  animationDelay: `${0.8 + index * 0.15}s`,
                  animationFillMode: 'both'
                }}
              >
                <InfoTooltip title={tooltip.title} description={tooltip.description} side={tooltip.side}>
                  <PulsingDot colorClassName={index % 2 === 0 ? "bg-primary" : "bg-accent"} />
                </InfoTooltip>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
         @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
