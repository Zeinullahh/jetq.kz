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
