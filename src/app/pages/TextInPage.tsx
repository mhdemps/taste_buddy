import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD } from "../brand";
import imgOrangeShadow from "@project-assets/orange shadow.png";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function TextInPage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const handleContinue = () => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => navigate("/home"), 520);
  };

  return (
    <div
      className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}
      data-name="text in"
    >
      <GrayTasteHeader />

      <button
        type="button"
        className="m-0 flex flex-1 cursor-pointer flex-col items-center justify-center border-0 bg-transparent px-0 py-10 text-center outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff3a00]/50"
        onClick={handleContinue}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleContinue();
          }
        }}
        aria-label="Continue to home"
      >
        <div className="flex w-full max-w-md flex-col items-center gap-8 sm:gap-10">
          <motion.div
            className="share-tech-regular text-[clamp(1.75rem,6vw,2.25rem)] leading-tight text-[#ff3a00]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 26,
              delay: 0.12,
              mass: 0.85,
            }}
          >
            <p className="mb-0">Hello buddy,</p>
            <p>welcome back!</p>
          </motion.div>

          <div className="relative flex min-h-[min(400px,50vh)] w-full max-w-[280px] flex-col items-center justify-end pb-2">
            <motion.div
              className="relative z-10 flex items-end justify-center"
              initial={{ scale: 1.12, y: 32, opacity: 0.96 }}
              animate={
                leaving
                  ? { y: [0, -26, 0, 10, 0], scale: [1, 1.06, 0.98, 0.82, 0.76] }
                  : { scale: 1, y: 0, opacity: 1 }
              }
              transition={
                leaving
                  ? { duration: 0.68, times: [0, 0.22, 0.42, 0.72, 1], ease: SMOOTH_EASE }
                  : {
                      type: "spring",
                      stiffness: 200,
                      damping: 21,
                      delay: 0.18,
                      mass: 0.9,
                    }
              }
            >
              <img
                src={imgOrangeShadow}
                alt=""
                className="h-auto max-h-[min(380px,48vh)] w-full max-w-[min(280px,78vw)] object-contain object-bottom select-none"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
      </button>
    </div>
  );
}
