"use client";

import { cn } from "@/lib/utils";
import { BackgroundPortal } from "@/components/background-portal";
import { expectVideo, markVideoReady } from "@/lib/loading";
import { useEffect, useId, useRef, useState } from "react";

interface SkipSegment {
  start: number;
  end: number;
}

interface YouTubeBackgroundProps {
  videoId: string;
  className?: string;
  zoom?: number;
  skipSegments?: SkipSegment[];
}

interface YTPlayer {
  playVideo(): void;
  destroy(): void;
  unloadModule(name: string): void;
  getCurrentTime(): number;
  seekTo(seconds: number, allowSeekAhead?: boolean): void;
}

interface YTEvent {
  target: YTPlayer;
  data: number;
}

interface YTAPI {
  Player: new (
    elementId: string,
    options: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {
        onReady?: (event: YTEvent) => void;
        onStateChange?: (event: YTEvent) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number; BUFFERING: number };
}

declare global {
  interface Window {
    YT?: YTAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (apiPromise) return apiPromise;

  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  apiPromise = new Promise((resolve) => {
    const existing = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    if (existing) {
      const check = () => {
        if (window.YT?.Player) {
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
      return;
    }

    window.onYouTubeIframeAPIReady = () => resolve();

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });

  return apiPromise;
}

interface YouTubeBackgroundInnerProps {
  videoId: string;
  playerId: string;
  className?: string;
  zoom?: number;
  skipSegments?: SkipSegment[];
}

function YouTubeBackgroundInner({
  videoId,
  playerId,
  className,
  zoom = 1,
  skipSegments,
}: YouTubeBackgroundInnerProps) {
  const playerRef = useRef<YTPlayer | null>(null);
  const skipIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const createPlayer = () => {
      const YT = window.YT;
      if (!YT?.Player || !isMounted) return;

      const player = new YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 0,
          disablekb: 1,
          playsinline: 1,
          cc_load_policy: 3,
          showinfo: 0,
          autohide: 1,
          start: 0,
          vq: "hd720",
        },
        events: {
          onReady: (event) => {
            try {
              event.target.unloadModule("captions");
              event.target.unloadModule("cc");
            } catch {
              // ignore
            }
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (
              event.data === YT.PlayerState.PLAYING ||
              event.data === YT.PlayerState.BUFFERING
            ) {
              setIsPlaying(true);
              try {
                event.target.unloadModule("captions");
                event.target.unloadModule("cc");
              } catch {
                // ignore
              }
            }

            if (event.data === YT.PlayerState.PLAYING) {
              // First actual playback means the video is loaded enough to show.
              markVideoReady();
            }
          },
        },
      });

      playerRef.current = player;

      // Skip unwanted middle segments by polling current time and seeking past them.
      if (skipSegments && skipSegments.length > 0) {
        skipIntervalRef.current = setInterval(() => {
          const p = playerRef.current;
          if (!p || typeof p.getCurrentTime !== "function") return;
          const currentTime = p.getCurrentTime();
          for (const segment of skipSegments) {
            if (currentTime >= segment.start && currentTime < segment.end) {
              p.seekTo(segment.end, true);
              break;
            }
          }
        }, 200);
      }
    };

    loadYouTubeAPI().then(createPlayer);

    return () => {
      isMounted = false;
      if (skipIntervalRef.current) {
        clearInterval(skipIntervalRef.current);
        skipIntervalRef.current = null;
      }
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
      playerRef.current = null;
    };
  }, [videoId, playerId, skipSegments]);

  return (
    <div
      className={cn("fixed inset-0 -z-20 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        id={playerId}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-screen w-screen min-w-[177.78vh] [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
        style={{
          transform: `translate(-50%, -50%) scale(${zoom})`,
        }}
      />
      {/* Hide the YouTube title / top chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black/80 to-transparent" />
      {/* Hide the bottom controls / next-prev suggestions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black/80 to-transparent" />
      {/* Center play-button hide layer — fades once playback starts */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-black/40 transition-opacity duration-700",
          isPlaying ? "opacity-0" : "opacity-100"
        )}
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
    </div>
  );
}

export function YouTubeBackground({
  videoId,
  className,
  zoom,
  skipSegments,
}: YouTubeBackgroundProps) {
  const playerId = useId().replace(/:/g, "-");

  // Tell the global loader that a background video is expected on this page.
  expectVideo();

  return (
    <BackgroundPortal>
      <YouTubeBackgroundInner
        videoId={videoId}
        playerId={playerId}
        className={className}
        zoom={zoom}
        skipSegments={skipSegments}
      />
    </BackgroundPortal>
  );
}
