"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  className?: string;
}

export function VideoBackground({ className }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        if ("webkitSetPresentationMode" in video) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (video as any).webkitSetPresentationMode("inline");
        }
        await video.play();
      } catch (err) {
        // Autoplay was prevented; poster will remain visible as fallback.
        // eslint-disable-next-line no-console
        console.warn("Background video autoplay prevented:", err);
      }
    };

    if (canPlay) {
      attemptPlay();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (canPlay) {
        attemptPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [canPlay]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      webkit-playsinline="true"
      preload="auto"
      poster="/videos/hero-desktop-poster.jpg"
      className={cn(
        "fixed inset-0 -z-20 min-h-screen min-w-full object-cover",
        className
      )}
      aria-hidden="true"
      onCanPlay={() => setCanPlay(true)}
      onLoadedMetadata={() => setCanPlay(true)}
    >
      <source src="/videos/hero-desktop.mp4" type="video/mp4" />
    </video>
  );
}
