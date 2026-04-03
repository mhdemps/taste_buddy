import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import GrayTasteHeader from "../components/GrayTasteHeader";
import {
  HOME_HERO_HEADLINE_CLASS,
  HOME_HERO_STACK_CLASS,
  INTRO_BUDDY_IMG_CLASS,
  MASCOT_SHARED_LAYOUT_ID,
  PAGE_GRADIENT,
  PAGE_HORIZONTAL_PAD,
} from "../brand";
import imgOrangeShadow from "@project-assets/orange shadow.png";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

export default function StartScreenPage() {
  const navigate = useNavigate();
  const [isSmiling, setIsSmiling] = useState(false);

  const handleBuddyClick = () => {
    if (isSmiling) return;
    setIsSmiling(true);
    window.setTimeout(() => navigate("/welcome"), 600);
  };

  return (
    <div
      className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}
      data-name="Start Screen"
    >
      <GrayTasteHeader />

      {/* Same stack measure as home so the shared mascot layoutId lands in the same slot */}
      <div className={`${HOME_HERO_STACK_CLASS} pb-40`}>
        <div
          className={`${HOME_HERO_HEADLINE_CLASS} pointer-events-none invisible w-full select-none text-[#ff3a00]`}
          aria-hidden
        >
          <p className="mb-0">Your buddy for </p>
          <p>culinary exploration!</p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="m-0 flex cursor-pointer flex-col items-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-3xl focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#ffd5bc]"
            onClick={handleBuddyClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleBuddyClick();
              }
            }}
            aria-label="Taste Buddy — tap to continue"
          >
            <motion.img
              layoutId={MASCOT_SHARED_LAYOUT_ID}
              src={isSmiling ? imgOrangeSmileShadow : imgOrangeShadow}
              alt=""
              draggable={false}
              className={INTRO_BUDDY_IMG_CLASS}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
