import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import imgTasteBuddyPlanningRecovered1 from "figma:asset/a75f13ee8fdc55044426e18a4df7c4c3f15a6468.png";
// Add buddy button
import addCircle from "figma:asset/66d4f2d7685ae9ec88410743dbad25549c027578.png";
import plusSign from "figma:asset/0dc14cc468d43677607c926fd2e4ab5b748cbffd.png";

// Reusable Buddy Component — circle + buddy ratios match `src/imports/Buddies.tsx` (Figma Make)
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
      {/* Background circle */}
      <motion.button
        onClick={handleClick}
        className="absolute cursor-pointer overflow-hidden rounded-[93px]"
        style={{ left: `${leftPos}px`, top: `${topPos}px`, width: '138px', height: '134px' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          alt="" 
          className="absolute inset-0 max-w-none size-full object-cover pointer-events-none rounded-[93px]" 
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
              className="absolute inset-0 max-w-none size-full object-cover pointer-events-none" 
              src={isClicked ? smilingImage : buddyImage} 
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
      {/* Name label underneath */}
      <p 
        className="-translate-x-1/2 absolute font-['Relay_Trial:Regular',sans-serif] h-[28px] leading-[normal] not-italic text-[#ff3a00] text-[24px] text-center w-[94px] pointer-events-none"
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

  // Calculate positions dynamically based on number of buddies
  const numRows = Math.ceil(buddies.length / 2);
  const lastBuddyBottomPos = 214 + ((numRows - 1) * 191) + 141 + 28; // topPos + rowOffset + circleHeight + nameHeight
  const addButtonTopPos = lastBuddyBottomPos + 60;
  const minHeight = addButtonTopPos + 200; // Reduced height since we removed the text and bottom buddy

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <div className="bg-gradient-to-b from-[#ffab97] relative pb-32 to-[#ffc9bd] w-screen" style={{ minHeight: `${minHeight}px` }} data-name="Buddies">
        <div className="absolute h-[149px] left-[64px] top-[35px] w-[261px]" data-name="taste buddy planning [Recovered] 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[193.4%] left-[-5.22%] max-w-none top-[-46.7%] w-[110.43%]" src={imgTasteBuddyPlanningRecovered1} />
          </div>
        </div>
        <div className="absolute h-[149px] left-[64px] top-[35px] w-[261px]" data-name="taste buddy planning [Recovered] 2">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[193.4%] left-[-5.22%] max-w-none top-[-46.7%] w-[110.43%]" src={imgTasteBuddyPlanningRecovered1} />
          </div>
        </div>
        {buddies.map((buddy, index) => (
          <BuddyCard 
            key={buddy.id}
            name={buddy.name} 
            buddyImage={buddy.buddyImage} 
            smilingImage={buddy.smilingImage} 
            backgroundImage={buddy.circleImage} 
            leftPos={index % 2 === 0 ? 46 : 206} 
            topPos={214 + (Math.floor(index / 2) * 191)} 
            rotate={index % 2 === 1}
            buddyId={buddy.id} 
          />
        ))}
        
        {/* Add buddy button */}
        <motion.button
          onClick={() => navigate('/add-buddy')}
          className="absolute left-1/2 -translate-x-1/2 w-[80px] h-[80px]"
          style={{ top: `${addButtonTopPos}px` }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img alt="" className="absolute inset-0 w-full h-full object-contain" src={addCircle} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px]">
            <img alt="" className="w-full h-full object-contain" src={plusSign} />
          </div>
        </motion.button>

        {/* Fixed navigation bar at bottom */}
        <Navigation />
      </div>
    </div>
  );
}