import { Button } from "@/components/ui/button";
import { InteractiveBrainSection } from "@/components/landing/InteractiveBrainSection";
import { AskTheBrainSection } from "@/components/landing/AskTheBrainSection";
import { BrainCircuit, Lightbulb } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-12 sm:p-8 md:pt-16 lg:pt-24 bg-background text-foreground overflow-x-hidden">
      <div className="w-full max-w-5xl space-y-16 md:space-y-24 text-center">
        {/* Title Section */}
        <section className="animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span 
              className="text-primary"
              style={{ textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary))' }}
            >
              Psicofisiología:
            </span>
            <br className="sm:hidden" />
            <span className="block sm:inline mt-2 sm:mt-0"> El puente entre </span> 
            <span 
              className="text-accent"
              style={{ textShadow: '0 0 10px hsl(var(--accent)), 0 0 20px hsl(var(--accent))' }}
            >
              biología
            </span> y <span 
              className="text-accent"
              style={{ textShadow: '0 0 10px hsl(var(--accent)), 0 0 20px hsl(var(--accent))' }}
            >
              mente
            </span> humana
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Sumérgete en una experiencia científica e inmersiva para desvelar la intrincada conexión que define nuestra percepción, emociones y cognición.
          </p>
        </section>

        {/* Interactive Brain Section Placeholder */}
        <InteractiveBrainSection />

        {/* AI Question Answering Section */}
        <AskTheBrainSection />

        {/* Explore Button Section */}
        <section className="mt-12 pb-16 animate-fadeInUp">
          <Button 
            size="lg" 
            className="px-10 py-6 text-lg bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:scale-105"
            aria-label="Explorar la Mente"
          >
            <BrainCircuit size={28} className="mr-3" />
            Explorar la Mente
          </Button>
        </section>
      </div>
    </main>
  );
}
