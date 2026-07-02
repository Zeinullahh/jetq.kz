import { cn } from "@/lib/utils";

interface HeroVideoProps {
  children?: React.ReactNode;
  className?: string;
}

export function HeroVideo({ children, className }: HeroVideoProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-desktop-poster.jpg"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        >
          <source src="/videos/hero-desktop.mp4" type="video/mp4" />
        </video>
        <iframe
          src="https://www.instagram.com/reel/DWoVn-0DfAz/embed"
          className="h-full w-full object-cover md:hidden"
          allowFullScreen
          title="JetQ mobile background"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/50" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
        {children}
      </div>
    </section>
  );
}
