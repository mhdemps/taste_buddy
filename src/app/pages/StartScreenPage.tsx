import { useState } from "react";
import { useNavigate } from "react-router";
import GrayTasteHeader from "../components/GrayTasteHeader";
import {
  INTRO_BUDDY_IMG_CLASS,
  INTRO_MAIN_LAYOUT_CLASS,
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

      <div className={INTRO_MAIN_LAYOUT_CLASS}>
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
          <img
            src={isSmiling ? imgOrangeSmileShadow : imgOrangeShadow}
            alt=""
            draggable={false}
            className={INTRO_BUDDY_IMG_CLASS}
          />
        </button>
      </div>
    </div>
  );
}
