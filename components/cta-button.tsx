import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href?: string;
  variant?: "primary" | "ghost" | "white" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function isExternal(href: string) {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  );
}

export function CTAButton({
  href,
  variant = "primary",
  children,
  className,
  onClick,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-none text-base font-normal uppercase tracking-wide transition-colors";
  const styles = {
    primary: "bg-gold text-black px-6 py-3 hover:bg-dark-gold",
    ghost:
      "border border-white/50 bg-transparent text-white px-4 py-3 hover:bg-teal-action hover:border-teal-action hover:text-white",
    outline:
      "border border-white/50 bg-transparent text-white px-4 py-3 hover:bg-teal-action hover:border-teal-action hover:text-white",
    white: "bg-white text-charcoal px-6 py-3 hover:bg-smoke",
  };

  const classes = cn(base, styles[variant], className);

  if (href && isExternal(href)) {
    return (
      <a
        href={href}
        className={classes}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

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
