import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import GrayTasteHeader from "../components/GrayTasteHeader";
import {
  HOME_HERO_HEADLINE_CLASS,
  HOME_HERO_STACK_CLASS,
  INTRO_TO_HOME_BUDDY_SCALE,
  PAGE_GRADIENT,
  PAGE_HORIZONTAL_PAD,
  PAGE_INTRO_BLURB_TEXT,
} from "../brand";
import imgOrangeSmileShadow from "@project-assets/orange smile shadow.png";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

/** After text fade-in (delay + duration), hold this long then go home */
const HOLD_MS_AFTER_TEXT = 950;
const TEXT_DELAY_S = 0.08;
const TEXT_DURATION_S = 0.36;
const LEAVE_FADE_MS = 320;

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
        className={`${HOME_HERO_STACK_CLASS} shrink-0 cursor-default pb-24 outline-none focus-visible:rounded-3xl focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#ffd5bc] sm:pb-28`}
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
          initial={{ opacity: 1 }}
          animate={leaving ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: LEAVE_FADE_MS / 1000, ease: SMOOTH_EASE }}
          className="flex w-full max-w-lg flex-col items-center gap-8"
        >
          <motion.div
            className={`${HOME_HERO_HEADLINE_CLASS} w-full shrink-0`}
            style={{ color: PAGE_INTRO_BLURB_TEXT }}
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

          <motion.div
            className="flex w-full shrink-0 origin-bottom items-end justify-center"
            initial={{ scale: 1 }}
            animate={{ scale: INTRO_TO_HOME_BUDDY_SCALE }}
            transition={{
              duration: TEXT_DURATION_S,
              ease: SMOOTH_EASE,
              delay: TEXT_DELAY_S,
            }}
          >
            <img
              src={imgOrangeSmileShadow}
              alt=""
              className="max-h-[min(380px,48vh)] w-auto max-w-[min(280px,78vw)] object-contain object-bottom select-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
