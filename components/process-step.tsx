interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div className="flex gap-4 rounded-none bg-white/50 backdrop-blur-md dark:bg-charcoal/50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold text-black font-normal uppercase">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-normal uppercase tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
