import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { PageTransition } from "@/components/page-transition";
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
        <Providers>
          <LoadingScreen />
          <ScrollProgress />
          <CursorSpotlight />
          <Navbar />
          <div id="background-root" className="fixed inset-0 -z-20" aria-hidden="true" />
          <div className="fixed inset-0 -z-10 bg-black/0 dark:bg-black/60" aria-hidden="true" />
          <main className="relative min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
        <Script
          src="https://app.callgear.com/static/cs.min.js?k=XEmb2MfD94LuDgsci84y4rSTHGXTgFch"
          strategy="afterInteractive"
        />
        <Script
          src="https://custom.callgear.com/static/69996/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
