import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import GrayTasteHeader from "../components/GrayTasteHeader";
import {
  HOME_BUDDY_IMG_CLASS,
  HOME_HERO_HEADLINE_CLASS,
  HOME_HERO_STACK_CLASS,
  MASCOT_SHARED_LAYOUT_ID,
  PAGE_GRADIENT,
  PAGE_HORIZONTAL_PAD,
  WELCOME_MASCOT_INITIAL_SCALE,
} from "../brand";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

/** Same shell as HomePage `MascotButton` so layoutId measures identical padding/box */
const MASCOT_BUTTON_SHELL_CLASS =
  "flex flex-col items-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-3xl focus-visible:ring-2 focus-visible:ring-[#ff3a00]/40";

const HOLD_MS_AFTER_TEXT = 950;
const TEXT_DELAY_S = 0.08;
const TEXT_DURATION_S = 0.36;

const MASCOT_SPRING = { type: "spring" as const, stiffness: 420, damping: 38, mass: 0.85 };

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
        {/* Mirror HomePage: stack children are headline + flex justify-center (no extra max-w-lg wrapper) */}
        <motion.div
          className={`${HOME_HERO_HEADLINE_CLASS} text-[#ff3a00]`}
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

        <div className="flex justify-center">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className={`${MASCOT_BUTTON_SHELL_CLASS} pointer-events-none`}
          >
            <motion.img
              layoutId={MASCOT_SHARED_LAYOUT_ID}
              src={imgOrangeSmileShadow}
              alt=""
              draggable={false}
              className={`${HOME_BUDDY_IMG_CLASS} origin-bottom transition-none`}
              initial={{ scale: WELCOME_MASCOT_INITIAL_SCALE }}
              animate={{ scale: 1 }}
              transition={{
                scale: {
                  duration: TEXT_DURATION_S,
                  delay: TEXT_DELAY_S,
                  ease: SMOOTH_EASE,
                },
                layout: MASCOT_SPRING,
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
