import { useEffect } from "react";
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
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const HOLD_MS_AFTER_TEXT = 950;
const TEXT_DELAY_S = 0.08;
const TEXT_DURATION_S = 0.36;

export default function TextInPage() {
  const navigate = useNavigate();

  const goHome = () => navigate("/home", { state: { fromWelcome: true } });

  useEffect(() => {
    const textDoneMs = (TEXT_DELAY_S + TEXT_DURATION_S) * 1000;
    const t = window.setTimeout(() => {
      navigate("/home", { state: { fromWelcome: true } });
    }, textDoneMs + HOLD_MS_AFTER_TEXT);
    return () => window.clearTimeout(t);
  }, [navigate]);

  return (
    <div
      className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}
      data-name="text in"
    >
      <GrayTasteHeader />

      <div
        className={`${HOME_HERO_STACK_CLASS} shrink-0 cursor-default pb-40 outline-none focus-visible:rounded-3xl focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#ffd5bc]`}
        onClick={goHome}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goHome();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Continue to home — happens automatically, or tap to skip."
      >
        <div className="flex w-full max-w-lg flex-col items-center gap-8">
          <motion.div
            className={`${HOME_HERO_HEADLINE_CLASS} w-full shrink-0 text-[#ff3a00]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: TEXT_DURATION_S,
              ease: SMOOTH_EASE,
              delay: TEXT_DELAY_S,
            }}
          >
            <p className="mb-0">Hello buddy,</p>
            <p>welcome back!</p>
          </motion.div>

          <div className="flex w-full shrink-0 justify-center">
            <motion.img
              layoutId={MASCOT_SHARED_LAYOUT_ID}
              src={imgOrangeSmileShadow}
              alt=""
              draggable={false}
              className={INTRO_BUDDY_IMG_CLASS}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
