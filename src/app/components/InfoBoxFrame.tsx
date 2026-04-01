import type { CSSProperties, ReactNode } from "react";
import { useId } from "react";
import { INFO_PANEL_INPUT_TEXT, INFO_PANEL_TEXT } from "../brand";

/**
 * Coral “pill” with SVG chalk displacement. Only the background layer tilts on hover;
 * copy lives in a sibling with no transform so it stays crisp at any angle.
 */
const CHALK_VARIANTS = [
  {
    seed: 11,
    scale: 2.45,
    freq: "0.062 0.084",
    radius: "1.35rem 1.08rem 1.42rem 1.12rem",
    tiltClass:
      "rotate-[-0.35deg] transition-transform duration-300 ease-out will-change-transform group-hover:-rotate-[1.05deg]",
  },
  {
    seed: 29,
    scale: 2.72,
    freq: "0.074 0.066",
    radius: "1.1rem 1.48rem 1.06rem 1.36rem",
    tiltClass:
      "rotate-[0.42deg] transition-transform duration-300 ease-out will-change-transform group-hover:rotate-[1.08deg]",
  },
  {
    seed: 47,
    scale: 2.35,
    freq: "0.068 0.09",
    radius: "1.44rem 1.14rem 1.26rem 1.06rem",
    tiltClass:
      "rotate-[-0.28deg] transition-transform duration-300 ease-out will-change-transform group-hover:rotate-[0.95deg]",
  },
  {
    seed: 63,
    scale: 2.55,
    freq: "0.056 0.076",
    radius: "1.06rem 1.34rem 1.52rem 1.14rem",
    tiltClass:
      "rotate-[0.38deg] transition-transform duration-300 ease-out will-change-transform group-hover:-rotate-[1.02deg]",
  },
] as const;

export function InfoBoxFrame({
  children,
  variant = 0,
}: {
  children: ReactNode;
  /** Cycles 0–3 for different noise seeds, corner asymmetry, tilt & hover direction. */
  variant?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const v = CHALK_VARIANTS[((variant % 4) + 4) % 4]!;
  const filterId = `tb-infobox-chalk-${uid}`;

  return (
    <div className="group relative isolate w-full">
      <svg width={0} height={0} className="pointer-events-none absolute" aria-hidden>
        <defs>
          <filter id={filterId} x="-28%" y="-28%" width="156%" height="156%">
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
          className="absolute inset-0 block border border-[#ff6b4a]/35 bg-[#ff8e7a] shadow-none"
          style={{
            filter: `url(#${filterId})`,
            borderRadius: v.radius,
          }}
        />
      </div>
      <div
        className="relative z-10 px-7 py-4 [&_h3]:text-[color:var(--tb-input-fill)] [&_input]:text-[color:var(--tb-input-fill)] [&_input]:placeholder:text-[color:var(--tb-input-fill)] [&_input]:placeholder:opacity-50 [&_p]:text-[color:var(--tb-input-fill)] [&_select]:w-full [&_select]:cursor-pointer [&_select]:border-none [&_select]:bg-transparent [&_select]:text-[color:var(--tb-input-fill)] [&_select]:outline-none [&_textarea]:min-h-[4.5rem] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:border-none [&_textarea]:bg-transparent [&_textarea]:text-[color:var(--tb-input-fill)] [&_textarea]:placeholder:text-[color:var(--tb-input-fill)] [&_textarea]:placeholder:opacity-50 [&_textarea]:outline-none"
        style={
          {
            color: INFO_PANEL_TEXT,
            ["--tb-input-fill" as string]: INFO_PANEL_INPUT_TEXT,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
