import { cn } from "@/lib/utils";

/* סמל המותג: שמש ים-תיכונית שהיא גם צמצם מצלמה.
   6 להבי צמצם מסתחררים סביב מרכז — אור, תנועה וצילום בסימן אחד. */
export function LogoMark({ className }: { className?: string }) {
  const blades = [0, 60, 120, 180, 240, 300];
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-10 w-10", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="dm-sun-gold" x1="8" y1="6" x2="42" y2="44">
          <stop stopColor="#EFD9A4" />
          <stop offset="0.55" stopColor="#D9B36A" />
          <stop offset="1" stopColor="#B3853B" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#dm-sun-gold)" />
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="#8A6A25"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {blades.map((deg) => (
        <path
          key={deg}
          d="M39 24 L28.9 27.4"
          stroke="#2A241D"
          strokeWidth="3.4"
          strokeLinecap="round"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="4.6" fill="#2A241D" />
      <circle cx="22.4" cy="22.4" r="1.4" fill="#EFD9A4" opacity="0.9" />
    </svg>
  );
}

/* לוגו מלא: סמל + וורדמרק. */
export function BrandLogo({
  lang,
  dark = false,
  className,
}: {
  lang: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 shrink-0 transition-transform duration-500 hover:rotate-[30deg]" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.35rem] font-extrabold tracking-tight",
            dark ? "text-[#FBF8F1]" : "text-[#2A241D]"
          )}
        >
          {lang === "he" ? "דוד מורגנשטרן" : "David Morgenstern"}
        </span>
        <span className="mt-1.5 text-[10px] font-semibold tracking-[0.32em] text-champagne-600">
          {lang === "he" ? "צילום אירועים ומשפחה" : "EVENTS & FAMILY PHOTOGRAPHY"}
        </span>
      </span>
    </span>
  );
}
