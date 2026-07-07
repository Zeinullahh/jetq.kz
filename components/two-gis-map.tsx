"use client";

import { useMemo } from "react";

interface TwoGisMapProps {
  orgIds: string[];
  city: "almaty" | "nur_sultan";
  center: { lat: number; lon: number };
  zoom?: number;
  className?: string;
  title?: string;
}

export function TwoGisMap({
  orgIds,
  city,
  center,
  zoom = 14,
  className = "h-[400px] w-full",
  title = "Карта 2GIS",
}: TwoGisMapProps) {
  const src = useMemo(() => {
    const options = JSON.stringify({
      pos: { lat: center.lat, lon: center.lon, zoom },
      opt: { city },
      org: orgIds.join(","),
    });
    return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(options)}`;
  }, [orgIds, city, center, zoom]);

  return (
    <div className={`overflow-hidden bg-[#202020] ${className}`}>
      <iframe
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        title={title}
        className="h-full w-full border-0"
      />
      <noscript className="block p-4 text-sm text-white/70">
        Виджет карты использует JavaScript. Включите его в настройках вашего браузера.
      </noscript>
    </div>
  );
}
