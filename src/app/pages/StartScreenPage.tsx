import { useState } from "react";
import { useNavigate } from "react-router";
import imgGrayTaste from "@project-assets/gray taste.png";
import imgOrangeShadow from "@project-assets/orange shadow.png";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

export default function StartScreenPage() {
  const navigate = useNavigate();
  const [isSmiling, setIsSmiling] = useState(false);

  const handleBuddyClick = () => {
    if (isSmiling) return;
    setIsSmiling(true);
    window.setTimeout(() => navigate("/welcome"), 550);
  };

  return (
    <div
      className="flex min-h-screen w-full min-w-0 flex-col bg-gradient-to-b from-[#ffc8a8] via-[#ffd5bc] to-[#ffe8d4] px-6"
      data-name="Start Screen"
    >
      <header className="flex shrink-0 justify-center pt-8 pb-6">
        <img
          src={imgGrayTaste}
          alt="taste buddy"
          className="h-auto w-[min(300px,88vw)] max-w-full object-contain"
          draggable={false}
        />
      </header>

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
          <div className="relative inline-flex h-[min(380px,48vh)] w-[min(280px,78vw)] items-center justify-center">
            <img
              src={imgOrangeShadow}
              alt=""
              draggable={false}
              className={`absolute max-h-full max-w-full object-contain object-bottom transition-opacity duration-300 ease-out select-none ${isSmiling ? "opacity-0" : "opacity-100"}`}
            />
            <img
              src={imgOrangeSmileShadow}
              alt=""
              draggable={false}
              className={`absolute max-h-full max-w-full object-contain object-bottom transition-opacity duration-300 ease-out select-none ${isSmiling ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
