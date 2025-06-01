
'use client';

import Image from "next/image";
import { AskPhineasGageSection } from "@/components/landing/AskPhineasGageSection"; // Name kept for now
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-background to-background/90 via-background/95 overflow-x-hidden">
      {/* Hero Section - Two Columns */}
      <div className="flex flex-col lg:flex-row items-stretch p-8 sm:p-12 md:p-16 lg:p-24 gap-10 md:gap-12 lg:gap-16">
        {/* Left Column: Brain Image */}
        <div className="w-full lg:w-2/5 flex items-center justify-center lg:min-h-full animate-fadeInLeft">
          <div className="transition-shadow duration-300 rounded-xl overflow-hidden aspect-square lg:aspect-auto lg:h-auto max-w-md lg:max-w-none w-full bg-transparent">
            <Image
              src="https://i.ibb.co/3m0Z90J4/cerebro-psico.png"
              alt="Ilustración de un cerebro para PsicoFisiologia con conexiones brillantes"
              width={800}
              height={800}
              className="object-contain w-full h-full" // Changed to object-contain
              data-ai-hint="psychology brain"
              priority
            />
          </div>
        </div>

        {/* Right Column: Text and Chat */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center py-8 lg:py-12 animate-fadeInRight space-y-8 md:space-y-10">
          <section className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-[0_2px_3px_hsla(var(--foreground),0.1)] font-montserrat">
              PsicoFisiologia
            </h1>
            <p className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl text-foreground/80 font-medium">
              Sebastian Zambrana - <span className="text-primary font-semibold">Estudiante de Licenciatura en Psicología</span>
            </p>
          </section>

          <AskPhineasGageSection /> {/* This component name is AskPhineasGageSection but functionality is Profesor AI */}
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
