import { useNavigate } from "react-router";
import iconChef from "@project-assets/gray chef.png";
import iconParty from "@project-assets/gray party.png";
import iconHome from "@project-assets/gray home.png";
import iconRefresh from "@project-assets/gray swap.png";
import iconProfile from "@project-assets/gray buddy.png";

/** Subtle sketchy hover tilt — alternates like InfoBoxFrame. */
const ICON_HOVER_TILT = [
  "transition-transform duration-300 ease-out will-change-transform hover:-rotate-[7deg]",
  "transition-transform duration-300 ease-out will-change-transform hover:rotate-[8deg]",
  "transition-transform duration-300 ease-out will-change-transform hover:-rotate-[6deg]",
  "transition-transform duration-300 ease-out will-change-transform hover:rotate-[7deg]",
  "transition-transform duration-300 ease-out will-change-transform hover:-rotate-[8deg]",
] as const;

interface NavIconProps {
  icon: string;
  tiltClass: string;
  onClick?: () => void;
}

function NavIcon({ icon, tiltClass, onClick }: NavIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex h-[clamp(1.85rem,7vw,2.35rem)] w-[clamp(2.05rem,8.5vw,2.7rem)] shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50 active:scale-95 ${tiltClass}`}
    >
      <img
        alt=""
        src={icon}
        draggable={false}
        className="max-h-full max-w-full object-contain"
      />
    </button>
  );
}

const navItems = [
  { id: "chef", icon: iconChef, path: "/my-recipes" as const },
  { id: "party", icon: iconParty, path: "/party" as const },
  { id: "home", icon: iconHome, path: "/home" as const },
  { id: "welcome", icon: iconRefresh, path: "/friend-recipe" as const },
  { id: "profile", icon: iconProfile, path: "/buddies" as const },
];

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <svg width={0} height={0} className="pointer-events-none absolute overflow-hidden" aria-hidden>
        <defs>
          <filter id="tb-nav-chalk-edge" x="-22%" y="-22%" width="144%" height="144%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.072"
              numOctaves={3}
              seed="11"
              stitchTiles="stitch"
              result="chalkNoise"
            />
            <feDisplacementMap in="SourceGraphic" in2="chalkNoise" scale={2.5} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center px-2 sm:bottom-4 sm:px-4">
        <nav aria-label="Main" className="relative isolate flex w-full max-w-[min(480px,calc(100vw-24px))]">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-[#ff6b4a]/35 bg-[#ff8e7a] shadow-[0_3px_14px_rgba(45,36,32,0.14)]"
            style={{ filter: "url(#tb-nav-chalk-edge)" }}
          />
          <div className="relative z-10 flex w-full items-center justify-between gap-0 px-3 py-1 sm:px-5 sm:py-1.5">
            {navItems.map(({ id, icon, path }, index) => (
              <div key={id} className="flex min-w-0 flex-1 justify-center">
                <NavIcon
                  icon={icon}
                  tiltClass={ICON_HOVER_TILT[index % ICON_HOVER_TILT.length]}
                  onClick={() => navigate(path)}
                />
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
