import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { LoadingScreen } from "@/components/loading-screen";

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
        <LoadingScreen />
        <ScrollProgress />
        <CursorSpotlight />
        <Navbar />
        <div className="fixed inset-0 -z-10 bg-black/0 dark:bg-black/60" aria-hidden="true" />
        <main className="relative min-h-screen">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
