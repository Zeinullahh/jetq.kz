# JetQ Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, Russian-language Next.js 14 website for JetQ with homepage overview, dedicated `/detailing` and `/cars` pages, light/dark mode, and responsive video hero backgrounds.

**Architecture:** Single Next.js App Router project with shared layout, Tailwind CSS theme variables, `next-themes` for light/dark mode, reusable UI components, and three page routes. Work is split between two agents: Agent A handles project foundation and homepage; Agent B handles dedicated pages and shared media components.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, `next-themes`, `lucide-react`, embedded YouTube/Instagram players.

## Global Constraints

- Language: Russian only.
- Framework: Next.js 14 App Router.
- Styling: Tailwind CSS with CSS variables for light/dark themes.
- Theme: `next-themes` with navbar toggle.
- Video backgrounds: embedded YouTube for desktop, Instagram Reel for mobile.
- Contacts: г. Алматы, ЖК Forum Residence, ул. Байтурсынова 179/2, блок 2; +7 (775) 006-14-11; 10:00–19:00 ежедневно.
- Images: use `next/image` where possible; external domains require `remotePatterns` config.
- Build must pass `npm run build` with static export (`output: 'export'`).

---

## File Structure

```
jetq.kz/
├── app/
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, metadata
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind directives + CSS variables
│   ├── detailing/
│   │   └── page.tsx            # Detailing page
│   └── cars/
│       └── page.tsx            # Cars / sales / exchange page
├── components/
│   ├── providers.tsx           # ThemeProvider wrapper (client)
│   ├── navbar.tsx              # Header navigation + theme toggle
│   ├── footer.tsx              # Site footer
│   ├── hero-video.tsx          # Responsive background video embed
│   ├── section-header.tsx      # Reusable section title/subtitle
│   ├── service-card.tsx        # Service highlight card
│   ├── process-step.tsx        # Numbered process step
│   ├── contact-block.tsx       # Contact info block
│   ├── cta-button.tsx          # Primary/secondary buttons
│   ├── theme-toggle.tsx        # Sun/moon toggle button
│   └── mobile-menu.tsx         # Mobile nav drawer
├── lib/
│   └── utils.ts                # cn() helper
├── public/
│   └── images/                 # Static image assets (placeholder or scraped)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `lib/utils.ts`
- Create: `components/providers.tsx`

**Interfaces:**
- Produces: `cn(...)` utility in `lib/utils.ts`.
- Produces: `Providers` component wrapping `ThemeProvider` for the root layout.

- [ ] **Step 1: Create project package files**

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-turbopack
```

If the command prompts for anything, accept defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-themes lucide-react clsx tailwind-merge
```

- [ ] **Step 3: Configure Tailwind theme variables**

Create `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Add global CSS variables**

Create `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 98%;
    --foreground: 220 13% 9%;
    --card: 0 0% 100%;
    --card-foreground: 220 13% 9%;
    --primary: 221 83% 33%;
    --primary-foreground: 0 0% 100%;
    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;
    --border: 220 13% 91%;
  }

  .dark {
    --background: 0 0% 4%;
    --foreground: 0 0% 95%;
    --card: 0 0% 8%;
    --card-foreground: 0 0% 95%;
    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;
    --muted: 0 0% 12%;
    --muted-foreground: 0 0% 60%;
    --border: 0 0% 18%;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

- [ ] **Step 5: Create utility helper**

Create `lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 6: Create theme provider wrapper**

Create `components/providers.tsx`:

```typescript
"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 7: Configure root layout**

Create `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-inter",
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
      <body className={inter.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Configure Next.js for static export**

Create `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

- [ ] **Step 9: Verify build passes**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 10: Commit**

```bash
git add .
git commit -m "chore: initialize Next.js project with Tailwind and next-themes"
```

---

## Task 2: Build Shared UI Components (Agent A foundation)

**Files:**
- Create: `components/theme-toggle.tsx`
- Create: `components/mobile-menu.tsx`
- Create: `components/navbar.tsx`
- Create: `components/footer.tsx`
- Create: `components/section-header.tsx`
- Create: `components/cta-button.tsx`

**Interfaces:**
- Consumes: `cn()` from `lib/utils.ts`.
- Produces: `<Navbar />`, `<Footer />`, `<SectionHeader title subtitle />`, `<CTAButton variant href children />`.

- [ ] **Step 1: Create theme toggle button**

Create `components/theme-toggle.tsx`:

```typescript
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 hover:bg-muted transition-colors"
      aria-label="Переключить тему"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
```

- [ ] **Step 2: Create mobile menu**

Create `components/mobile-menu.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { href: "/", label: "Главная" },
  { href: "/detailing", label: "Детейлинг" },
  { href: "/cars", label: "Авто в наличии" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-muted rounded-full"
        aria-label="Открыть меню"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create navbar**

Create `components/navbar.tsx`:

```typescript
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

const links = [
  { href: "/", label: "Главная" },
  { href: "/detailing", label: "Детейлинг" },
  { href: "/cars", label: "Авто в наличии" },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          JETQ
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Create footer**

Create `components/footer.tsx`:

```typescript
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-2xl font-bold">JETQ</p>
          <p className="mt-2 text-muted-foreground">
            Премиальные автомобильные услуги в Алматы.
          </p>
        </div>
        <div>
          <p className="font-semibold">Быстрые ссылки</p>
          <ul className="mt-2 space-y-2 text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Главная
              </Link>
            </li>
            <li>
              <Link href="/detailing" className="hover:text-foreground">
                Детейлинг
              </Link>
            </li>
            <li>
              <Link href="/cars" className="hover:text-foreground">
                Авто в наличии
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Контакты</p>
          <address className="mt-2 not-italic text-muted-foreground space-y-1">
            <p>г. Алматы, ЖК Forum Residence</p>
            <p>ул. Байтурсынова 179/2, блок 2</p>
            <p>+7 (775) 006-14-11</p>
            <p>10:00 – 19:00, ежедневно</p>
          </address>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ТОО «JETQ GROUP». Все права защищены.
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Create section header**

Create `components/section-header.tsx`:

```typescript
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", centered && "text-center")}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

Add import `cn` at top:

```typescript
import { cn } from "@/lib/utils";
```

- [ ] **Step 6: Create CTA button**

Create `components/cta-button.tsx`:

```typescript
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CTAButton({
  href,
  variant = "primary",
  children,
  className,
  onClick,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    outline:
      "border border-border bg-transparent hover:bg-muted text-foreground",
  };

  const classes = cn(base, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 7: Wire navbar and footer into layout**

Modify `app/layout.tsx` to include `<Navbar />` and `<Footer />`:

```typescript
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
```

Update body content:

```tsx
<body className={inter.variable}>
  <Providers>
    <Navbar />
    <main className="min-h-screen pt-16">{children}</main>
    <Footer />
  </Providers>
</body>
```

- [ ] **Step 8: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: add shared navbar, footer, and ui components"
```

---

## Task 3: Responsive Hero Video Component (Agent B)

**Files:**
- Create: `components/hero-video.tsx`

**Interfaces:**
- Produces: `<HeroVideo children />` component that renders full-screen video background.
- Produces: Uses YouTube embed ID `3Kh2gpornEY` for desktop and Instagram Reel URL for mobile.

- [ ] **Step 1: Create hero video component**

Create `components/hero-video.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  children?: React.ReactNode;
  className?: string;
}

export function HeroVideo({ children, className }: HeroVideoProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      className={cn(
        "relative flex min-h-[80vh] items-center justify-center overflow-hidden md:min-h-screen",
        className
      )}
    >
      <div className="absolute inset-0 -z-20">
        {isMobile ? (
          <iframe
            src="https://www.instagram.com/reel/DWoVn-0DfAz/embed"
            className="h-full w-full object-cover"
            allowFullScreen
            title="JetQ mobile background"
          />
        ) : (
          <iframe
            src="https://www.youtube.com/embed/3Kh2gpornEY?autoplay=1&mute=1&loop=1&playlist=3Kh2gpornEY&controls=0&showinfo=0&rel=0"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="JetQ desktop background"
          />
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify component renders on homepage**

Temporarily add to `app/page.tsx`:

```tsx
import { HeroVideo } from "@/components/hero-video";

export default function HomePage() {
  return (
    <HeroVideo>
      <h1 className="text-4xl font-bold md:text-6xl">JetQ</h1>
    </HeroVideo>
  );
}
```

Run build:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add responsive hero video background"
```

---

## Task 4: Build Homepage (Agent A)

**Files:**
- Create: `components/service-card.tsx`
- Create: `components/process-step.tsx`
- Create: `components/contact-block.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `<HeroVideo />`, `<SectionHeader />`, `<CTAButton />`, `<ServiceCard />`, `<ProcessStep />`, `<ContactBlock />`.
- Produces: Complete homepage content.

- [ ] **Step 1: Create service card component**

Create `components/service-card.tsx`:

```typescript
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  featured?: boolean;
}

export function ServiceCard({
  title,
  description,
  href,
  featured = false,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg",
        featured && "ring-1 ring-primary"
      )}
    >
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
        Подробнее <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create process step component**

Create `components/process-step.tsx`:

```typescript
interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create contact block**

Create `components/contact-block.tsx`:

```typescript
import { MapPin, Phone, Clock } from "lucide-react";

export function ContactBlock() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <MapPin className="mt-1 text-primary" />
        <div>
          <p className="font-semibold">Адрес</p>
          <p className="text-muted-foreground">
            г. Алматы, ЖК Forum Residence
            <br />
            ул. Байтурсынова 179/2, блок 2
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Phone className="mt-1 text-primary" />
        <div>
          <p className="font-semibold">Телефон</p>
          <a
            href="tel:+77750061411"
            className="text-muted-foreground hover:text-foreground"
          >
            +7 (775) 006-14-11
          </a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Clock className="mt-1 text-primary" />
        <div>
          <p className="font-semibold">Режим работы</p>
          <p className="text-muted-foreground">10:00 – 19:00, ежедневно</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Build homepage sections**

Modify `app/page.tsx`:

```tsx
import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { ProcessStep } from "@/components/process-step";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";

const services = [
  {
    title: "Детейлинг",
    description:
      "Премиальный уход за кузовом и салоном. Керамика, полировка, химчистка и защита ЛКП.",
    href: "/detailing",
    featured: true,
  },
  {
    title: "Авто из Китая",
    description:
      "Привезем любой автомобиль из Китая под ключ: подбор, выкуп, доставка и таможня.",
    href: "/cars",
  },
  {
    title: "Trade-In / Обмен",
    description:
      "Обменяйте свой автомобиль на новый с доплатой. Оценим ваш авто и подберем лучшее предложение.",
    href: "/cars",
  },
  {
    title: "Авто в наличии",
    description:
      "Готовые автомобили в Алматы. Просмотр, тест-драйв и оформление в день визита.",
    href: "/cars",
  },
];

const steps = [
  {
    number: "01",
    title: "Заявка",
    description: "Оставляете заявку или звоните нам. Менеджер отвечает на все вопросы.",
  },
  {
    number: "02",
    title: "Подбор",
    description: "Подбираем автомобиль или пакет услуг под ваши задачи и бюджет.",
  },
  {
    number: "03",
    title: "Договор",
    description: "Заключаем договор с прозрачными условиями и фиксированной ценой.",
  },
  {
    number: "04",
    title: "Выполнение",
    description: "Доставляем авто или выполняем детейлинг строго в срок.",
  },
  {
    number: "05",
    title: "Передача",
    description: "Передаем автомобиль с полным пакетом документов и результатами работ.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">
          JetQ Group
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Премиальный автомобильный сервис
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Детейлинг, продажа и обмен автомобилей в Алматы. Качество, которое видно с первого взгляда.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CTAButton href="/detailing" variant="primary">
            JetQ Детейлинг
          </CTAButton>
          <CTAButton href="/cars" variant="outline" className="text-white border-white hover:bg-white/10">
            Авто в наличии
          </CTAButton>
        </div>
      </HeroVideo>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Наши услуги"
          subtitle="Полный спектр премиальных услуг для вашего автомобиля."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Почему JetQ?"
            subtitle="Работаем для тех, кто ценит качество, прозрачность и сервис."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              "Прямые поставки из Китая",
              "Современное детейлинг-оборудование",
              "Прозрачные цены без скрытых доплат",
              "Помощь в кредите, лизинге и trade-in",
              "Гарантия качества на все работы",
              "Удобное расположение в Алматы",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-card p-6"
              >
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Как мы работаем"
          subtitle="Простой и понятный процесс от заявки до результата."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Свяжитесь с нами"
            subtitle="Приезжайте в наш офис или позвоните — мы ответим на все вопросы."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: build homepage with services, advantages, process, contacts"
```

---

## Task 5: Build Detailing Page (Agent B)

**Files:**
- Create: `app/detailing/page.tsx`

**Interfaces:**
- Consumes: `<HeroVideo />`, `<SectionHeader />`, `<ProcessStep />`, `<CTAButton />`, `<ContactBlock />`.

- [ ] **Step 1: Create detailing page**

Create `app/detailing/page.tsx`:

```tsx
import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ProcessStep } from "@/components/process-step";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";
import { Sparkles, Shield, Droplets, Paintbrush } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Полировка кузова",
    description:
      "Устраняем мелкие царапины, голограммы и следы окисления. Возвращаем глубину цвета и блеск.",
  },
  {
    icon: Shield,
    title: "Керамическое покрытие",
    description:
      "Долговременная защита ЛКП от химии, УФ-лучей и мелких повреждений. Гидрофобный эффект до нескольких лет.",
  },
  {
    icon: Droplets,
    title: "Химчистка салона",
    description:
      "Глубокая очистка кожи, алькантары и текстиля. Удаляем запахи, пятна и загрязнения.",
  },
  {
    icon: Paintbrush,
    title: "Защита пленкой",
    description:
      "Антигравийная полиуретановая пленка для защиты передней части кузова и зон риска.",
  },
];

const steps = [
  {
    number: "01",
    title: "Диагностика",
    description: "Оцениваем состояние кузова и салона, обсуждаем желаемый результат.",
  },
  {
    number: "02",
    title: "Мойка и подготовка",
    description: "Тщательная мойка, обезжиривание и подготовка поверхностей.",
  },
  {
    number: "03",
    title: "Детейлинг",
    description: "Выполняем полировку, покрытие, химчистку или защиту пленкой.",
  },
  {
    number: "04",
    title: "Контроль качества",
    description: "Проверяем каждый сантиметр автомобиля перед передачей клиенту.",
  },
];

export default function DetailingPage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">
          JetQ Детейлинг
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
          Идеальный вид вашего автомобиля
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Премиальный уход за кузовом и салоном в Алматы.
        </p>
        <div className="mt-8">
          <CTAButton href="tel:+77750061411" variant="primary">
            Позвонить и записаться
          </CTAButton>
        </div>
      </HeroVideo>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Услуги детейлинга"
          subtitle="Комплексный уход, который сохраняет и подчеркивает достоинства вашего авто."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <Icon className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Процесс работы"
            subtitle="От диагностики до идеального результата — четыре понятных этапа."
          />
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step) => (
              <ProcessStep key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Галерея"
          subtitle="Примеры наших работ — скоро здесь появятся фото до и после."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-video rounded-xl bg-muted flex items-center justify-center text-muted-foreground"
            >
              Фото работы {i}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Запишитесь на детейлинг"
            subtitle="Оставьте заявку или позвоните — мы подберем оптимальное решение."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add dedicated detailing page"
```

---

## Task 6: Build Cars / Sales / Exchange Page (Agent B)

**Files:**
- Create: `app/cars/page.tsx`

**Interfaces:**
- Consumes: `<HeroVideo />`, `<SectionHeader />`, `<ServiceCard />`, `<CTAButton />`, `<ContactBlock />`.

- [ ] **Step 1: Create cars page**

Create `app/cars/page.tsx`:

```tsx
import { HeroVideo } from "@/components/hero-video";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { ContactBlock } from "@/components/contact-block";
import { CTAButton } from "@/components/cta-button";

const cars = [
  {
    title: "Zeekr 8X",
    description: "Первый и единственный Zeekr 8X в Казахстане. Премиальный электрокроссовер.",
    href: "#",
  },
  {
    title: "Популярные китайские авто",
    description: "Широкий выбор бюджетных и премиальных моделей под заказ из Китая.",
    href: "#",
  },
  {
    title: "Авто в наличии",
    description: "Готовые автомобили в Алматы. Быстрое оформление и выдача.",
    href: "#",
  },
];

const purchaseOptions = [
  { title: "Trade-In", description: "Обменяйте свой автомобиль на новый с доплатой." },
  { title: "Кредит", description: "Оформляем кредит через наших банков-партнеров." },
  { title: "Рассрочка", description: "Удобная рассрочка без переплат." },
  { title: "Лизинг", description: "Выгодные условия лизинга для юридических лиц." },
];

export default function CarsPage() {
  return (
    <>
      <HeroVideo>
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">
          JetQ Auto
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
          Автомобили из Китая и в наличии
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
          Подбор, выкуп, доставка, таможня и оформление под ключ.
        </p>
        <div className="mt-8">
          <CTAButton href="tel:+77750061411" variant="primary">
            Получить консультацию
          </CTAButton>
        </div>
      </HeroVideo>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Актуальные предложения"
          subtitle="Популярные автомобили и эксклюзивные позиции JetQ."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <ServiceCard key={car.title} {...car} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Способы приобретения"
            subtitle="Выбирайте удобный вариант покупки и получайте дополнительные преимущества."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {purchaseOptions.map((option) => (
              <div
                key={option.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-xl font-semibold">{option.title}</h3>
                <p className="mt-2 text-muted-foreground">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          title="Trade-In / Обмен авто"
          subtitle="Обменяйте свой автомобиль на новый — быстрая оценка и честные условия."
        />
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold">У нас есть Trade-In</h3>
              <p className="mt-4 text-muted-foreground">
                Оценим ваш автомобиль по рыночной стоимости, поможем подобрать новый
                и оформим все документы. Экономьте время и деньги с JetQ.
              </p>
              <div className="mt-6">
                <CTAButton href="tel:+77750061411" variant="primary">
                  Оценить мой авто
                </CTAButton>
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
              Изображение обмена
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title="Свяжитесь с нами"
            subtitle="Приезжайте на осмотр или позвоните — мы подберем лучший вариант."
          />
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add cars/sales/exchange page"
```

---

## Task 7: Final Polish and Verification

**Files:**
- Modify: `app/globals.css` (if needed)
- Modify: `next.config.js` (if needed)

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: no lint errors.

- [ ] **Step 2: Run final build**

```bash
npm run build
```

Expected: build succeeds and `dist/` folder is generated.

- [ ] **Step 3: Verify routes**

Check that the following files exist in `dist/`:

```bash
ls dist/index.html dist/detailing/index.html dist/cars/index.html
```

Expected: all three files exist.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: final polish and build verification"
```

---

## Self-Review

**Spec coverage:**
- ✅ Multi-page Next.js app: `/`, `/detailing`, `/cars` — Tasks 4, 5, 6.
- ✅ Russian language — all copy is Russian.
- ✅ Light/dark mode — Task 1 (theme setup) + Task 2 (theme toggle).
- ✅ Hero video backgrounds — Task 3 (YouTube desktop + Instagram mobile).
- ✅ JetQ Detailing highlighted — homepage featured card + dedicated page.
- ✅ Car sales and exchange (trade-in) — Task 6.
- ✅ Contact info from current site — used in footer and contact blocks.
- ✅ Premium elegant design — Tailwind variables and component styling.

**Placeholder scan:**
- No TBD/TODO/"implement later" strings.
- Gallery uses numbered placeholders; this is intentional until real photos are provided.
- Car cards use `#` hrefs as placeholders for future detail pages.

**Type consistency:**
- `cn()` is used consistently.
- Component props use consistent naming.
- `HeroVideo` accepts `children` and `className` throughout.
