import type {Metadata} from 'next';
import { Montserrat } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PSYCHO-NEXUS | Explora la Psique',
  description: 'Explora la psicofisiología y dialoga con la IA de Phineas Gage. Un proyecto de Sebastian Zambrana para Psycho-Nexus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${GeistSans.variable} ${GeistMono.variable}`}> {/* Removed 'dark' class to default to light theme */}
      <body className={`font-sans antialiased`}> {/* font-sans will pick up --font-geist-sans from html tag */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
