import { useState } from "react";
import { useNavigate } from "react-router";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD } from "../brand";
import imgOrangeShadow from "@project-assets/orange shadow.png";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

export default function StartScreenPage() {
  const navigate = useNavigate();
  const [isSmiling, setIsSmiling] = useState(false);

  const handleBuddyClick = () => {
    if (isSmiling) return;
    setIsSmiling(true);
    window.setTimeout(() => navigate("/welcome"), 850);
  };

  return (
    <div
      className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}
      data-name="Start Screen"
    >
      <GrayTasteHeader />

      <div className="flex flex-1 flex-col items-center justify-center pb-16">
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
            className="max-h-[min(380px,48vh)] w-auto max-w-[min(280px,78vw)] object-contain object-bottom select-none"
          />
        </button>
      </div>
    </div>
  );
}
