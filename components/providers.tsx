"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { SiteProvider } from "@/components/site-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SiteProvider>{children}</SiteProvider>
    </ThemeProvider>
  );
}
