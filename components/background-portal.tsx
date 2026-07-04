"use client";

import { createPortal } from "react-dom";

interface BackgroundPortalProps {
  children: React.ReactNode;
}

export function BackgroundPortal({ children }: BackgroundPortalProps) {
  if (typeof document === "undefined") return null;

  const root = document.getElementById("background-root");
  if (!root) return null;

  return createPortal(children, root);
}
