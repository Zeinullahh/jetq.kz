import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  accent?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  accent = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10", centered && "text-center")}>
      <h2
        className={cn(
          "text-3xl font-normal uppercase tracking-tight md:text-4xl lg:text-5xl",
          accent ? "text-gold-text" : "text-foreground",
          className
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg text-muted-foreground max-w-2xl mx-auto", className)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
