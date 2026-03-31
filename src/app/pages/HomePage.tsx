import { useState } from "react";
import { useNavigate } from "react-router";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD } from "../brand";
import imgOrangeShadow from "@project-assets/orange shadow.png";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

function MascotButton({
  isSmiling,
  onClick,
}: {
  isSmiling: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-3xl focus-visible:ring-2 focus-visible:ring-[#ff3a00]/40"
    >
      <img
        alt=""
        src={isSmiling ? imgOrangeSmileShadow : imgOrangeShadow}
        className="h-auto max-h-[min(240px,38vh)] w-[min(200px,58vw)] max-w-full object-contain object-bottom transition-none select-none"
        draggable={false}
      />
    </button>
  );
}

export default function HomePage() {
  const [isSmiling, setIsSmiling] = useState(false);
  const navigate = useNavigate();

  const handleMascotClick = () => {
    setIsSmiling(true);
    window.setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <div className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`} data-name="home">
      <GrayTasteHeader />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 pb-40 text-center">
        <div className="share-tech-regular max-w-lg px-2 text-[clamp(1.5rem,5.5vw,2rem)] leading-snug text-[#ff3a00]">
          <p className="mb-0">Your buddy for </p>
          <p>culinary exploration!</p>
        </div>

        <MascotButton isSmiling={isSmiling} onClick={handleMascotClick} />
      </div>

      <Navigation />
    </div>
  );
}
