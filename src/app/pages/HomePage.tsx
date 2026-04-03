import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import {
  HOME_BUDDY_IMG_CLASS,
  HOME_HERO_HEADLINE_CLASS,
  HOME_HERO_STACK_CLASS,
  PAGE_GRADIENT,
  PAGE_HORIZONTAL_PAD,
} from "../brand";
import imgOrangeShadow from "@project-assets/orange shadow.png";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

const HOME_ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

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
        className={`${HOME_BUDDY_IMG_CLASS} transition-none`}
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

      <div className={`${HOME_HERO_STACK_CLASS} pb-40`}>
        <div className={`${HOME_HERO_HEADLINE_CLASS} text-[#ff3a00]`}>
          <p className="mb-0">Your buddy for </p>
          <p>culinary exploration!</p>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.34, ease: HOME_ENTRANCE_EASE, delay: 0.04 }}
        >
          <MascotButton isSmiling={isSmiling} onClick={handleMascotClick} />
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
}
