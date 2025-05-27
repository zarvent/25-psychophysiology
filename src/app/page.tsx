'use client';

import Image from "next/image";
import { AskPhineasGageSection } from "@/components/landing/AskPhineasGageSection";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/30 overflow-x-hidden">
      {/* Hero Section - Two Columns */}
      <div className="flex flex-col lg:flex-row items-stretch p-4 sm:p-6 md:p-8 gap-6 md:gap-8">
        {/* Left Column: Brain Image */}
        <div className="w-full lg:w-2/5 flex items-center justify-center lg:min-h-full animate-fadeInLeft">
          <Card className="shadow-2xl rounded-xl overflow-hidden border-2 border-primary/30 aspect-square lg:aspect-auto lg:h-auto max-w-md lg:max-w-none w-full bg-card/50 backdrop-blur-md">
            <Image
              src="https://placehold.co/800x800.png" 
              alt="Ilustración de un cerebro humano avanzado con conexiones brillantes y estética futurista"
              width={800}
              height={800}
              className="object-cover w-full h-full"
              data-ai-hint="futuristic brain"
              priority
            />
          </Card>
        </div>

        {/* Right Column: Text and Chat */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center py-8 lg:py-12 animate-fadeInRight space-y-6 md:space-y-8">
          <section className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
              PSICOFISIOLOGIA
            </h1>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-foreground/80 font-medium">
              Sebastian Zambrana - <span className="text-accent font-semibold">Estudiante Licenciatura en Psicología</span>
            </p>
          </section>

          <AskPhineasGageSection />
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
          animation-delay: 0.2s; /* slight delay for staggered effect */
        }
      `}</style>
    </main>
  );
}
