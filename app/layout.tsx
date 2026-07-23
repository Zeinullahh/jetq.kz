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
import { CookieConsent } from "@/components/cookie-consent";

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K5NFX68B"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K5NFX68B');
          `}
        </Script>
        {/* End Google Tag Manager */}
        <Script
          src="https://app.callgear.com/static/cs.min.js?k=XEmb2MfD94LuDgsci84y4rSTHGXTgFch"
          strategy="afterInteractive"
        />
        <Script
          src="https://custom.callgear.com/static/69996/script.js"
          strategy="afterInteractive"
        />
        {/* Google tag (gtag.js) — GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J05Y4WBEHN"
          strategy="afterInteractive"
        />
        <Script id="ga4-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J05Y4WBEHN');
          `}
        </Script>
        <CookieConsent />
      </body>
    </html>
  );
}
