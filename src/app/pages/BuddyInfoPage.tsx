import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD } from "../brand";
import arrowLeft from "@project-assets/left arrow.png";
import infoBox1 from "@project-assets/box 1.png";
import infoBox2 from "@project-assets/box 2.png";
import infoBox3 from "@project-assets/box 3.png";

export default function BuddyInfoPage() {
  const navigate = useNavigate();
  const { buddyId } = useParams<{ buddyId: string }>();
  const { getBuddyById, removeBuddy } = useBuddies();
  
  const buddy = buddyId ? getBuddyById(buddyId) : null;
  
  if (!buddy) {
    return (
      <div className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
        <GrayTasteHeader />
        <div className="flex flex-1 items-center justify-center pb-32">
          <p className="share-tech-regular text-[#ff3a00]">Buddy not found</p>
        </div>
        <Navigation />
      </div>
    );
  }

  const handleRemove = () => {
    if (confirm(`Are you sure you want to remove ${buddy.name}?`)) {
      removeBuddy(buddyId!);
      navigate('/buddies');
    }
  };

  return (
    <div className={`flex min-h-screen flex-col overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
      <GrayTasteHeader />

      <div className="flex flex-1 flex-col items-center pb-44 pt-2">
        <div className="mb-4 flex w-full max-w-[340px] justify-start">
          <motion.button
            type="button"
            onClick={() => navigate('/buddies')}
            className="h-[50px] w-[80px]"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to buddies"
          >
            <img alt="" className="size-full object-contain" src={arrowLeft} />
          </motion.button>
        </div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative" style={{ width: '200px', height: '200px' }}>
            <img 
              alt="" 
              className="pointer-events-none absolute inset-0 size-full object-cover" 
              src={buddy.circleImage} 
            />
            <div className="absolute left-[42px] top-[24px] h-[152px] w-[116px]">
              <img alt="" className="size-full object-contain" src={buddy.smilingImage} />
            </div>
          </div>
        </motion.div>

        <motion.h1 
          className="mt-6 text-center share-tech-regular text-[42px] text-[#ff3a00]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {buddy.name}
        </motion.h1>

        <motion.div 
          className="mt-8 flex w-full max-w-[340px] flex-col items-center space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {buddy.favoriteFood && (
            <div className="relative h-[120px] w-full">
              <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox1} />
              <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
                <h3 className="mb-1 share-tech-regular text-[20px] text-[#ff3a00]">Favorite Food</h3>
                <p className="share-tech-regular text-[16px] text-[#2d2d2d]">{buddy.favoriteFood}</p>
              </div>
            </div>
          )}

          {buddy.personality && (
            <div className="relative h-[120px] w-full">
              <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox2} />
              <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
                <h3 className="mb-1 share-tech-regular text-[20px] text-[#ff3a00]">Personality</h3>
                <p className="share-tech-regular text-[16px] text-[#2d2d2d]">{buddy.personality}</p>
              </div>
            </div>
          )}

          {buddy.specialty && (
            <div className="relative h-[120px] w-full">
              <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox3} />
              <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
                <h3 className="mb-1 share-tech-regular text-[20px] text-[#ff3a00]">Specialty</h3>
                <p className="share-tech-regular text-[16px] text-[#2d2d2d]">{buddy.specialty}</p>
              </div>
            </div>
          )}

          {buddy.partiesAttended !== undefined && buddy.partiesAttended !== null && (
            <div className="relative h-[120px] w-full">
              <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox1} />
              <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
                <h3 className="mb-1 share-tech-regular text-[20px] text-[#ff3a00]">Parties Attended</h3>
                <p className="share-tech-regular text-[16px] text-[#2d2d2d]">{buddy.partiesAttended}</p>
              </div>
            </div>
          )}

          {buddy.recipesGiven && (
            <div className="relative h-[120px] w-full">
              <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox2} />
              <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
                <h3 className="mb-1 share-tech-regular text-[20px] text-[#ff3a00]">Recipes Given</h3>
                <p className="share-tech-regular text-[16px] text-[#2d2d2d]">{buddy.recipesGiven}</p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.button
          type="button"
          onClick={handleRemove}
          className="mt-10 share-tech-regular text-[16px] text-[#ff3a00]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ opacity: 0.7 }}
          whileTap={{ scale: 0.95 }}
        >
          Remove Buddy
        </motion.button>
      </div>

      <Navigation />
    </div>
  );
}
