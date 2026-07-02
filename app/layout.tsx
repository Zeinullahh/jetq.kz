import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
