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
        "group flex flex-col justify-between rounded-none bg-white/50 p-6 backdrop-blur-md transition-colors hover:bg-white/70 dark:bg-charcoal/50 dark:hover:bg-charcoal/70",
        featured && "border-l-4 border-gold"
      )}
    >
      <div>
        <h3 className="text-xl font-normal uppercase tracking-tight text-card-foreground">
          {title}
        </h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-normal uppercase tracking-wide text-card-foreground">
        Подробнее <ArrowRight size={16} />
      </div>
    </Link>
  );
}
