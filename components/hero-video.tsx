import { cn } from "@/lib/utils";

interface HeroVideoProps {
  children?: React.ReactNode;
  className?: string;
}

export function HeroVideo({ children, className }: HeroVideoProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
        {children}
      </div>
    </section>
  );
}
