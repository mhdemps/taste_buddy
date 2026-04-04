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
    <div className="mx-auto flex w-full min-w-0 max-w-[min(19rem,100%)] flex-col items-center justify-self-center overflow-visible px-1 sm:max-w-[19rem] sm:px-0 md:w-full md:max-w-none md:justify-self-stretch md:px-0">
      {/*
        Name sits tight under the circle: pulled up with -mt (% of card width) so it overlaps
        the empty band under the square layout box, without crowding the colored disk (scale leaves headroom).
      */}
      <div className="z-10 w-full origin-top max-sm:scale-100 sm:scale-[1.2] md:scale-[1.28] lg:scale-[1.32]">
        <motion.button
          type="button"
          aria-label={`${name} — open buddy profile`}
          onClick={handleClick}
          className="relative aspect-square w-full overflow-hidden rounded-[50%] shadow-none"
          whileHover={{ scale: 1.015 }}
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
      <p
        className="pointer-events-none relative z-20 w-full max-w-full px-1.5 pb-0.5 text-center share-tech-bold tracking-wide leading-snug max-sm:-mt-[13%] max-sm:pt-1 max-sm:text-[clamp(17px,5.4vmin,2rem)] sm:mt-[clamp(1.35rem,6.5vw,2.85rem)] sm:pt-2 sm:text-[clamp(16px,3.7vw,1.88rem)] md:mt-[clamp(2rem,8vw,3.75rem)] md:px-1 md:pt-3 md:text-[clamp(17px,3.1vw,2rem)] md:leading-snug lg:mt-[clamp(2.6rem,9vw,4.75rem)] lg:text-[clamp(18px,2.7vw,2.1rem)]"
        style={{
          color: "#ff3a00",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          WebkitTextSizeAdjust: "100%",
        }}
      >
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
      className={`flex min-h-screen min-w-0 flex-col overflow-x-hidden overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}
      data-name="Buddies"
    >
      <GrayTasteHeader />

      <motion.div
        className="flex w-full min-w-0 max-w-full flex-1 flex-col items-center pb-44 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="mb-4 w-full max-w-[min(340px,calc(100vw-2.5rem))] px-1 text-center share-tech-bold text-[clamp(1.5rem,4.8vw,1.9rem)] leading-snug text-[#ff3a00]"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          Buddies
        </motion.h1>
        <motion.p
          className="mb-10 w-full max-w-[min(340px,calc(100vw-2.5rem))] break-words px-3 text-center share-tech-regular text-[clamp(15px,4.2vw,17px)] leading-snug sm:mb-14 md:mb-16 md:px-0"
          style={{ color: PAGE_INTRO_BLURB_TEXT }}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Tap a buddy for their profile — use + to add another Taste Buddy.
        </motion.p>

        <div className="mx-auto w-full min-w-0 max-w-[40rem] overflow-visible px-1 sm:max-w-[48rem] sm:px-3">
          <motion.div
            className="grid w-full min-w-0 grid-cols-1 justify-items-stretch gap-x-0 gap-y-12 overflow-visible sm:gap-y-14 md:grid-cols-2 md:gap-x-[clamp(1rem,9vw,3.75rem)] md:gap-y-[clamp(4rem,28vw,8.75rem)] md:justify-items-stretch"
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
