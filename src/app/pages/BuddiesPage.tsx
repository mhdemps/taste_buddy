import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuddies, circleForBuddyColor, getBuddyColorIndex } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD, PAGE_INTRO_BLURB_TEXT } from "../brand";
import { BUDDY_IN_CIRCLE_H_PCT, BUDDY_IN_CIRCLE_W_PCT } from "../buddyLayout";
import imgAddBuddy from "@project-assets/madison-is-pretty.png";

function BuddyCard({
  name,
  buddyImage,
  smilingImage,
  backgroundImage,
  circleFlipped,
  buddyId,
}: {
  name: string;
  buddyImage: string;
  smilingImage: string;
  backgroundImage: string;
  circleFlipped: boolean;
  buddyId: string;
}) {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate(`/buddy/${buddyId}`);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-sm:origin-top max-sm:scale-[1.14]">
        <motion.button
          type="button"
          onClick={handleClick}
          className="relative aspect-square w-full overflow-hidden rounded-[50%] shadow-none"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
        <img
          alt=""
          className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
          style={{
            borderRadius: "50%",
            transform: circleFlipped ? "rotate(180deg)" : "none",
          }}
          src={backgroundImage}
          draggable={false}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={isClicked ? "smiling" : "normal"}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="flex min-h-0 min-w-0 items-center justify-center"
              style={{
                width: `${BUDDY_IN_CIRCLE_W_PCT}%`,
                height: `${BUDDY_IN_CIRCLE_H_PCT}%`,
                maxWidth: `${BUDDY_IN_CIRCLE_W_PCT}%`,
                maxHeight: `${BUDDY_IN_CIRCLE_H_PCT}%`,
              }}
            >
              <img
                alt=""
                className="max-h-full max-w-full object-contain object-center"
                src={isClicked ? smilingImage : buddyImage}
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        </motion.button>
      </div>
      <p className="-mt-2 max-w-[11rem] text-center share-tech-bold text-[clamp(1.5rem,5.2vw,1.9rem)] leading-none tracking-wide text-[#ff3a00] max-sm:-mt-2.5 sm:-mt-2 sm:max-w-[12rem] sm:text-[clamp(1.65rem,4vw,2rem)]">
        {name}
      </p>
    </div>
  );
}

export default function BuddiesPage() {
  const navigate = useNavigate();
  const { buddies } = useBuddies();

  return (
    <div
      className={`flex min-h-screen flex-col overflow-x-hidden overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}
      data-name="Buddies"
    >
      <GrayTasteHeader />

      <motion.div
        className="flex flex-1 flex-col items-center pb-44 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="mb-4 max-w-[340px] text-center share-tech-bold text-[clamp(1.5rem,4.8vw,1.9rem)] leading-tight text-[#ff3a00]"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          Buddies
        </motion.h1>
        <motion.p
          className="mb-5 max-w-[340px] text-center share-tech-regular text-[17px] leading-snug"
          style={{ color: PAGE_INTRO_BLURB_TEXT }}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Tap a buddy for their profile — use + to add another Taste Buddy.
        </motion.p>

        <div className="mx-auto w-full max-w-[40rem] overflow-visible px-1.5 sm:max-w-[48rem] sm:px-3">
          <motion.div
            className="grid grid-cols-2 gap-x-3 gap-y-11 overflow-visible sm:gap-x-6 sm:gap-y-12"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {buddies.map((buddy, index) => (
              <BuddyCard
                key={buddy.id}
                name={buddy.name}
                buddyImage={buddy.buddyImage}
                smilingImage={buddy.smilingImage}
                backgroundImage={circleForBuddyColor(getBuddyColorIndex(buddy.buddyImage))}
                circleFlipped={((index % 2) + Math.floor(index / 2)) % 2 === 1}
                buddyId={buddy.id}
              />
            ))}
          </motion.div>
        </div>

        <motion.button
          type="button"
          onClick={() => navigate("/add-buddy")}
          className="mt-9 size-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            alt="Add buddy"
            className="h-full w-full object-contain"
            src={imgAddBuddy}
          />
        </motion.button>
      </motion.div>

      <Navigation />
    </div>
  );
}
