"use client";

import { useEffect, useRef, useState } from "react";

interface TwoGisMapProps {
  orgIds: string[];
  city: "almaty" | "nur_sultan";
  center: { lat: number; lon: number };
  zoom?: number;
  className?: string;
}

declare global {
  interface Window {
    DGWidgetLoader?: new (options: Record<string, unknown>) => void;
  }
}

export function TwoGisMap({
  orgIds,
  city,
  center,
  zoom = 14,
  className = "h-[400px] w-full",
}: TwoGisMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const existing = document.querySelector('script[src="https://widgets.2gis.com/js/DGWidgetLoader.js"]');
    if (existing) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://widgets.2gis.com/js/DGWidgetLoader.js";
    script.charset = "utf-8";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Do not remove the shared script; other instances may need it.
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.DGWidgetLoader) return;

    containerRef.current.innerHTML = "";

    new window.DGWidgetLoader({
      width: "100%",
      height: "100%",
      borderColor: "#202020",
      pos: { lat: center.lat, lon: center.lon, zoom },
      opt: { city },
      org: orgIds.map((id) => ({ id })),
    });
  }, [scriptLoaded, orgIds, city, center, zoom]);

  return (
    <div className={`overflow-hidden bg-[#202020] ${className}`}>
      <div ref={containerRef} className="h-full w-full" />
      <noscript className="block p-4 text-sm text-white/70">
        Виджет карты использует JavaScript. Включите его в настройках вашего браузера.
      </noscript>
    </div>
  );
}
