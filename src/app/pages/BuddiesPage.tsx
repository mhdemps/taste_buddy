import { useNavigate } from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import imgLogo from "@project-assets/orange logo.png";
import imgAddBuddy from "@project-assets/add button.png";

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
        className="pointer-events-none absolute -translate-x-1/2 h-[28px] w-[94px] text-center font-['Relay_Trial:Regular',sans-serif] text-[24px] not-italic leading-[normal] text-[#ff3a00]"
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
  const lastBuddyBottomPos = 214 + ((numRows - 1) * 191) + 141 + 28;
  const addButtonTopPos = lastBuddyBottomPos + 60;
  const minHeight = addButtonTopPos + 200;

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <div className="relative w-screen bg-gradient-to-b from-[#ffab97] to-[#ffc9bd] pb-32" style={{ minHeight: `${minHeight}px` }} data-name="Buddies">
        <div className="absolute left-[64px] top-[35px] h-[149px] w-[261px]" data-name="logo">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img alt="Taste Buddy" className="absolute left-[-5.22%] top-[-46.7%] h-[193.4%] w-[110.43%] max-w-none object-contain" src={imgLogo} />
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

        <Navigation />
      </div>
    </div>
  );
}
