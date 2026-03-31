import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
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
    return <div>Buddy not found</div>;
  }

  const handleRemove = () => {
    if (confirm(`Are you sure you want to remove ${buddy.name}?`)) {
      removeBuddy(buddyId!);
      navigate('/buddies');
    }
  };

  // Count the number of info cards to calculate remove button position
  const infoCardCount = [
    buddy.favoriteFood,
    buddy.personality,
    buddy.specialty,
    buddy.partiesAttended,
    buddy.recipesGiven
  ].filter(Boolean).length;
  
  // Calculate position: start + (cards * height) + (cards * spacing) + extra spacing
  const removeButtonTop = 360 + (infoCardCount * 120) + ((infoCardCount - 1) * 24) + 40;
  const minHeight = removeButtonTop + 200; // Ensure enough space to scroll past nav bar

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <motion.div 
        className="bg-gradient-to-b from-[#ffab97] relative to-[#ffc9bd] w-screen"
        style={{ minHeight: `${minHeight}px`, paddingBottom: '120px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >

        {/* Buddy character with circle background - matching BuddiesPage ratio */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-[80px]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative" style={{ width: '200px', height: '200px' }}>
            <img 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
              src={buddy.circleImage} 
            />
            {/* Using same ratio as BuddiesPage: 80x105 in 138px circle, scaled up proportionally */}
            <div className="absolute" style={{ width: '116px', height: '152px', left: '42px', top: '24px' }}>
              <img alt="" className="w-full h-full object-contain" src={buddy.smilingImage} />
            </div>
          </div>
        </motion.div>

        {/* Buddy name */}
        <motion.h1 
          className="absolute left-1/2 -translate-x-1/2 top-[290px] font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[42px] text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {buddy.name}
        </motion.h1>

        {/* Info cards with organic box backgrounds */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-[360px] w-[340px] space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Show appropriate fields based on what data exists */}
          {buddy.favoriteFood && (
            <div className="relative h-[120px]">
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox1} />
              <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
                <h3 className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[20px] mb-1">Favorite Food</h3>
                <p className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px]">{buddy.favoriteFood}</p>
              </div>
            </div>
          )}

          {buddy.personality && (
            <div className="relative h-[120px]">
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox2} />
              <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
                <h3 className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[20px] mb-1">Personality</h3>
                <p className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px]">{buddy.personality}</p>
              </div>
            </div>
          )}

          {buddy.specialty && (
            <div className="relative h-[120px]">
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox3} />
              <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
                <h3 className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[20px] mb-1">Specialty</h3>
                <p className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px]">{buddy.specialty}</p>
              </div>
            </div>
          )}

          {buddy.partiesAttended && (
            <div className="relative h-[120px]">
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox1} />
              <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
                <h3 className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[20px] mb-1">Parties Attended</h3>
                <p className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px]">{buddy.partiesAttended}</p>
              </div>
            </div>
          )}

          {buddy.recipesGiven && (
            <div className="relative h-[120px]">
              <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox2} />
              <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
                <h3 className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[20px] mb-1">Recipes Given</h3>
                <p className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px]">{buddy.recipesGiven}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Remove button as plain text - positioned below info cards */}
        <motion.button
          onClick={handleRemove}
          className="absolute left-1/2 -translate-x-1/2 font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[16px]"
          style={{ top: `${removeButtonTop}px` }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ opacity: 0.7 }}
          whileTap={{ scale: 0.95 }}
        >
          Remove Buddy
        </motion.button>

        {/* Back button with arrow - smaller size */}
        <motion.button
          onClick={() => navigate('/buddies')}
          className="absolute left-8 top-8 w-[80px] h-[50px]"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img alt="Back" className="w-full h-full object-contain" src={arrowLeft} />
        </motion.button>

        {/* Fixed navigation bar at bottom */}
        <Navigation />
      </motion.div>
    </div>
  );
}