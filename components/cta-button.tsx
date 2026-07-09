"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCityHref } from "@/components/site-context";

interface CTAButtonProps {
  href?: string;
  variant?: "primary" | "ghost" | "white" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function isExternal(href: string) {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:")
  );
}

function isUnprefixed(href: string) {
  return href.startsWith("#");
}

export function CTAButton({
  href,
  variant = "primary",
  children,
  className,
  onClick,
  type = "button",
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

  if (href && !isUnprefixed(href)) {
    return (
      <CityCTALink href={href} className={classes}>
        {children}
      </CityCTALink>
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
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

function CityCTALink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const cityHref = useCityHref(href);

  return (
    <Link href={cityHref} className={className}>
      {children}
    </Link>
  );
}
