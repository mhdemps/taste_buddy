import { useState } from "react";
import { useNavigate } from "react-router";
import Navigation from "../components/Navigation";
import imgLogo from "@project-assets/orange logo.png";
import imgBuddy from "@project-assets/orange buddy.png";
import imgBuddySmile from "@project-assets/orange buddy smile.png";
import imgShadow from "@project-assets/orange shadow.png";

function BuddyCharacter({ isSmiling, onClick }: { isSmiling: boolean; onClick: () => void }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="absolute left-[134px] top-[212px] cursor-pointer"
    >
      <div className="absolute left-[calc(50%+6px)] top-[392px] h-[23.04px] w-[128px] -translate-x-1/2">
        <img alt="" className="size-full object-cover opacity-60" src={imgShadow} />
      </div>
      <div className="absolute left-[134px] top-[212px] h-[193px] w-[126px]" data-name="mascot">
        <img 
          alt="" 
          className="size-full max-w-none object-cover transition-all duration-300" 
          src={isSmiling ? imgBuddySmile : imgBuddy} 
        />
      </div>
    </button>
  );
}

export default function HomePage() {
  const [isSmiling, setIsSmiling] = useState(false);
  const navigate = useNavigate();

  const handleBuddyClick = () => {
    setIsSmiling(true);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <div className="relative min-h-screen w-screen bg-gradient-to-b from-[#ffab97] to-[#ffc9bd]" data-name="home">
        <div className="absolute left-[64px] top-[35px] h-[149px] w-[261px]" data-name="logo">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img alt="Taste Buddy" className="absolute left-[-5.22%] top-[-46.7%] h-[193.4%] w-[110.43%] max-w-none object-contain" src={imgLogo} />
          </div>
        </div>
        <div className="absolute left-[195px] top-[442px] h-[82px] w-[416px] -translate-x-1/2 text-center font-['Relay_Trial:Regular','Noto_Sans:Regular',sans-serif] text-[24px] leading-[normal] text-[#ff3a00]" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          <p className="mb-0">Your buddy for </p>
          <p>culinary exploration!</p>
        </div>
        
        <BuddyCharacter isSmiling={isSmiling} onClick={handleBuddyClick} />

        <Navigation />
      </div>
    </div>
  );
}
