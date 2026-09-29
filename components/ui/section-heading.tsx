import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  level?: "h1" | "h2";
  className?: string;
}

/* כותרת סקשן — "עריכתי פרימיום": קו שיער + סריף מכובד, בלי תגיות רועשות. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  level = "h2",
  className,
}: SectionHeadingProps) {
  const Tag = level;
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-champagne-600",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-champagne-500" aria-hidden />
        {eyebrow}
        {align === "center" && (
          <span className="h-px w-8 bg-champagne-500" aria-hidden />
        )}
      </p>
      <Tag className="mt-6 font-display text-4xl leading-[1.18] text-balance text-foreground md:text-5xl">
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
