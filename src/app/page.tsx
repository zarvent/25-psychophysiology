
'use client';

import Image from "next/image";
import { AskPhineasGageSection } from "@/components/landing/AskPhineasGageSection";
import { Card } from "@/components/ui/card";
import { InteractiveBrainSection } from "@/components/landing/InteractiveBrainSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-background to-background/90 via-background/95 overflow-x-hidden">
      {/* Hero Section - Two Columns */}
      <div className="flex flex-col lg:flex-row items-stretch p-6 sm:p-8 md:p-10 gap-8 md:gap-10">
        {/* Left Column: Brain Image */}
        <div className="w-full lg:w-2/5 flex items-center justify-center lg:min-h-full animate-fadeInLeft">
          <Card className="transition-shadow duration-300 rounded-xl overflow-hidden aspect-square lg:aspect-auto lg:h-auto max-w-md lg:max-w-none w-full bg-transparent transform hover:scale-[1.02] transition-transform">
            <Image
              src="https://i.ibb.co/3m0Z90J4/cerebro-psico.png" 
              alt="Ilustración de un cerebro humano avanzado con conexiones brillantes y estética futurista"
              width={800}
              height={800}
              className="object-cover w-full h-full"
              data-ai-hint="psychology brain" 
              priority
            />
          </Card>
        </div>

        {/* Right Column: Text and Chat */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center py-8 lg:py-12 animate-fadeInRight space-y-8 md:space-y-10">
          <section className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary drop-shadow-[0_2px_5px_hsl(var(--primary)/0.4)] font-montserrat">
              PSYCHO-NEXUS
            </h1>
            <p className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl text-foreground/80 font-medium">
              Sebastian Zambrana - <span className="text-accent font-semibold">Estudiante Licenciatura en Psicología</span>
            </p>
          </section>

          <AskPhineasGageSection />
        </div>
      </div>
      
      <div className="p-6 sm:p-8 md:p-10">
        <InteractiveBrainSection />
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
