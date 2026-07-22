export function SectionLabel({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      <span aria-hidden className="h-px w-10 bg-champagne/50" />
      {children}
    </p>
  );
}
