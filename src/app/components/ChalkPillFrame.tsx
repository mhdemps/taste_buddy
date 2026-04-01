import type { ReactNode } from "react";
import { useId } from "react";

/**
 * Rounded pill with chalk displacement. Only the fill layer tilts on hover;
 * labels sit in a non-transformed layer so type stays sharp.
 */
const PILL_VARIANTS = [
  {
    seed: 11,
    scale: 1.48,
    freq: "0.068 0.088",
    tiltClass:
      "rotate-[-0.35deg] transition-transform duration-300 ease-out will-change-transform group-hover:-rotate-[1.05deg]",
  },
  {
    seed: 29,
    scale: 1.62,
    freq: "0.078 0.07",
    tiltClass:
      "rotate-[0.42deg] transition-transform duration-300 ease-out will-change-transform group-hover:rotate-[1.08deg]",
  },
  {
    seed: 47,
    scale: 1.4,
    freq: "0.072 0.092",
    tiltClass:
      "rotate-[-0.28deg] transition-transform duration-300 ease-out will-change-transform group-hover:rotate-[0.95deg]",
  },
  {
    seed: 63,
    scale: 1.55,
    freq: "0.06 0.08",
    tiltClass:
      "rotate-[0.38deg] transition-transform duration-300 ease-out will-change-transform group-hover:-rotate-[1.02deg]",
  },
] as const;

export function ChalkPillFrame({
  children,
  variant = 0,
  className = "",
  fillClassName,
  innerClassName = "px-6 py-2.5",
}: {
  children: ReactNode;
  variant?: number;
  className?: string;
  /** Border + background (+ shadow) for the sketched fill layer */
  fillClassName: string;
  innerClassName?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const v = PILL_VARIANTS[((variant % 4) + 4) % 4]!;
  const filterId = `tb-chalk-pill-${uid}`;

  return (
    <div className={`group relative isolate inline-flex max-w-full ${className}`}>
      <svg width={0} height={0} className="pointer-events-none absolute" aria-hidden>
        <defs>
          <filter id={filterId} x="-26%" y="-26%" width="152%" height="152%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={v.freq}
              numOctaves={3}
              seed={v.seed}
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={v.scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div className={`pointer-events-none absolute inset-0 z-0 ${v.tiltClass}`}>
        <span
          aria-hidden
          className={`absolute inset-0 block rounded-full shadow-none ${fillClassName}`}
          style={{ filter: `url(#${filterId})` }}
        />
      </div>
      <div
        className={`relative z-10 flex min-w-0 items-center justify-center ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
