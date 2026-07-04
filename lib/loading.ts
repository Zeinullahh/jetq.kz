"use client";

let videoExpected = false;
let videoReady = false;
const readyCallbacks = new Set<() => void>();

export function expectVideo(): void {
  if (typeof window === "undefined") return;
  videoExpected = true;
}

export function isVideoExpected(): boolean {
  return typeof window !== "undefined" && videoExpected;
}

export function markVideoReady(): void {
  if (typeof window === "undefined" || videoReady) return;
  videoReady = true;

  readyCallbacks.forEach((cb) => cb());
  readyCallbacks.clear();

  window.dispatchEvent(new Event("videoReady"));
}

export function isVideoReady(): boolean {
  return typeof window !== "undefined" && videoReady;
}

export function onVideoReady(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if (videoReady) {
    callback();
    return () => {};
  }

  readyCallbacks.add(callback);
  return () => readyCallbacks.delete(callback);
}
