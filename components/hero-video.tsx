import { cn } from "@/lib/utils";

interface HeroVideoProps {
  children?: React.ReactNode;
  className?: string;
}

export function HeroVideo({ children, className }: HeroVideoProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[80vh] items-center justify-center overflow-hidden md:min-h-screen",
        className
      )}
    >
      <div className="absolute inset-0 -z-20">
        <iframe
          src="https://www.youtube.com/embed/3Kh2gpornEY?autoplay=1&mute=1&loop=1&playlist=3Kh2gpornEY&controls=0&showinfo=0&rel=0"
          className="absolute inset-0 hidden h-full w-full md:block"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="JetQ desktop background"
        />
        <iframe
          src="https://www.instagram.com/reel/DWoVn-0DfAz/embed"
          className="h-full w-full object-cover md:hidden"
          allowFullScreen
          title="JetQ mobile background"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center text-white">
        {children}
      </div>
    </section>
  );
}
