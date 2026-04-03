import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import {
  HOME_BUDDY_IMG_CLASS,
  HOME_HERO_HEADLINE_CLASS,
  HOME_HERO_STACK_CLASS,
  MASCOT_SHARED_LAYOUT_ID,
  PAGE_GRADIENT,
  PAGE_HORIZONTAL_PAD,
} from "../brand";
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
      <motion.img
        layoutId={MASCOT_SHARED_LAYOUT_ID}
        alt=""
        src={isSmiling ? imgOrangeSmileShadow : imgOrangeShadow}
        className={`${HOME_BUDDY_IMG_CLASS} transition-none`}
        draggable={false}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
      />
    </button>
  );
}

export default function HomePage() {
  const location = useLocation();
  const fromWelcome = Boolean((location.state as { fromWelcome?: boolean } | null)?.fromWelcome);
  const [isSmiling, setIsSmiling] = useState(fromWelcome);

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

      <div className={`${HOME_HERO_STACK_CLASS} pb-40`}>
        <div className={`${HOME_HERO_HEADLINE_CLASS} text-[#ff3a00]`}>
          <p className="mb-0">Your buddy for </p>
          <p>culinary exploration!</p>
        </div>

        <div className="flex justify-center">
          <MascotButton isSmiling={isSmiling} onClick={handleMascotClick} />
        </div>
      </div>

      <Navigation />
    </div>
  );
}
