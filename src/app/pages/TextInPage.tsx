import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import GrayTasteHeader from "../components/GrayTasteHeader";
import {
  INTRO_BUDDY_IMG_CLASS,
  INTRO_MAIN_LAYOUT_CLASS,
  PAGE_GRADIENT,
  PAGE_HORIZONTAL_PAD,
} from "../brand";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

/** After text fade-in (delay + duration), hold this long then go home */
const HOLD_MS_AFTER_TEXT = 1350;
const TEXT_DELAY_S = 0.15;
const TEXT_DURATION_S = 0.52;
const LEAVE_FADE_MS = 450;

export default function TextInPage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const skipToHome = () => {
    if (leaving) return;
    setLeaving(true);
  };

  useEffect(() => {
    const textDoneMs = (TEXT_DELAY_S + TEXT_DURATION_S) * 1000;
    const t = window.setTimeout(() => setLeaving(true), textDoneMs + HOLD_MS_AFTER_TEXT);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => navigate("/home"), LEAVE_FADE_MS);
    return () => window.clearTimeout(t);
  }, [leaving, navigate]);

  return (
    <div
      className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}
      data-name="text in"
    >
      <GrayTasteHeader />

      <div
        className={`${INTRO_MAIN_LAYOUT_CLASS} cursor-default outline-none focus-visible:rounded-3xl focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#ffd5bc]`}
        onClick={skipToHome}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            skipToHome();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Continue to home — happens automatically, or tap to skip."
      >
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 1 }}
          animate={leaving ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: LEAVE_FADE_MS / 1000, ease: SMOOTH_EASE }}
        >
          <motion.div
            className="absolute bottom-full left-1/2 z-10 mb-7 w-[min(100%,22rem)] -translate-x-1/2 text-center share-tech-bold text-[clamp(1.75rem,6vw,2.25rem)] leading-tight text-[#ff3a00]"
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

          <img
            src={imgOrangeSmileShadow}
            alt=""
            className={INTRO_BUDDY_IMG_CLASS}
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
