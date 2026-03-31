import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD } from "../brand";
import imgAddBuddy from "@project-assets/add button.png";

const FIRST_ROW_TOP = 16;
const ROW_STEP = 191;

function BuddyCard({ 
  name, 
  buddyImage, 
  smilingImage,
  backgroundImage, 
  leftPos, 
  topPos,
  rotate = false,
  buddyId
}: { 
  name: string; 
  buddyImage: string;
  smilingImage: string;
  backgroundImage: string; 
  leftPos: number; 
  topPos: number;
  rotate?: boolean;
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
    <>
      <motion.button
        type="button"
        onClick={handleClick}
        className="absolute cursor-pointer overflow-hidden rounded-[93px]"
        style={{ left: `${leftPos}px`, top: `${topPos}px`, width: '138px', height: '134px' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          alt="" 
          className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[93px] object-cover" 
          style={{ transform: rotate ? 'rotate(180deg)' : 'none' }}
          src={backgroundImage} 
        />
        <AnimatePresence mode="wait">
          <motion.div 
            key={isClicked ? "smiling" : "normal"}
            className="absolute aspect-[709/1083] left-[26.09%] right-[26.81%] top-[18px]" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              alt="" 
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" 
              src={isClicked ? smilingImage : buddyImage} 
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
      <p 
        className="pointer-events-none absolute -translate-x-1/2 h-[28px] w-[94px] text-center share-tech-regular text-[24px] not-italic leading-[normal] text-[#ff3a00]"
        style={{ left: `${leftPos + 69}px`, top: `${topPos + 141}px` }}
      >
        {name}
      </p>
    </>
  );
}

export default function BuddiesPage() {
  const navigate = useNavigate();
  const { buddies } = useBuddies();

  const numRows = Math.ceil(buddies.length / 2);
  const lastRowTop = FIRST_ROW_TOP + (numRows - 1) * ROW_STEP;
  const lastBuddyBottomPos = lastRowTop + 141 + 28;
  const addButtonTopPos = lastBuddyBottomPos + 60;
  const innerMinHeight = addButtonTopPos + 200;

  return (
    <div className={`flex min-h-screen flex-col overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`} data-name="Buddies">
      <GrayTasteHeader />

      <div
        className="relative mx-auto w-full max-w-[390px] flex-1 pb-40"
        style={{ minHeight: `${innerMinHeight}px` }}
      >
        {buddies.map((buddy, index) => (
          <BuddyCard 
            key={buddy.id}
            name={buddy.name} 
            buddyImage={buddy.buddyImage} 
            smilingImage={buddy.smilingImage} 
            backgroundImage={buddy.circleImage} 
            leftPos={index % 2 === 0 ? 46 : 206} 
            topPos={FIRST_ROW_TOP + (Math.floor(index / 2) * ROW_STEP)} 
            rotate={index % 2 === 1}
            buddyId={buddy.id} 
          />
        ))}

        <motion.button
          type="button"
          onClick={() => navigate('/add-buddy')}
          className="absolute left-1/2 h-[80px] w-[80px] -translate-x-1/2"
          style={{ top: `${addButtonTopPos}px` }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img alt="Add buddy" className="h-full w-full object-contain" src={imgAddBuddy} />
        </motion.button>
      </div>

      <Navigation />
    </div>
  );
}
