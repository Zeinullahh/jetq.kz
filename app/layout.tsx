import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";

const oswald = Oswald({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JetQ — Автомобили из Китая | Детейлинг | Trade-In",
  description:
    "JetQ Group — привезем любой автомобиль из Китая, премиальный детейлинг, продажа и обмен авто в Алматы.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={cn(oswald.variable, "font-sans")}>
        <Providers>
          <Navbar />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/videos/hero-desktop-poster.jpg"
            className="fixed inset-0 -z-20 h-screen w-full object-cover"
            aria-hidden="true"
          >
            <source src="/videos/hero-desktop.mp4" type="video/mp4" />
          </video>
          <div className="fixed inset-0 -z-10 bg-black/60" aria-hidden="true" />
          <main className="relative min-h-screen dark">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
