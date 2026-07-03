interface ProcessStepDarkProps {
  number: string;
  title: string;
  description: string;
}

export function ProcessStepDark({
  number,
  title,
  description,
}: ProcessStepDarkProps) {
  return (
    <div className="flex h-full min-h-[72px] items-stretch overflow-hidden bg-charcoal/90">
      <div className="flex aspect-square h-auto w-14 shrink-0 items-center justify-center bg-gold text-xl font-normal text-black">
        {number}
      </div>
      <div className="flex flex-col justify-center px-4 py-3">
        <h3 className="text-base font-normal uppercase tracking-wide text-white">
          {title}
        </h3>
        <p className="mt-0.5 text-sm leading-snug text-white/60">
          {description}
        </p>
      </div>
    </div>
  );
}
