import { useState } from "react";
import { useNavigate } from "react-router";
import Navigation from "../components/Navigation";
import imgImage25 from "figma:asset/173964c56f062e8d3b196a42ab9ca906fa5269cb.png";
import imgImage26 from "figma:asset/9966cdd8c61b0423178613725c3174ef95f4b441.png";
import imgTasteBuddyPlanningRecovered1 from "figma:asset/a75f13ee8fdc55044426e18a4df7c4c3f15a6468.png";
import imgImage27 from "figma:asset/5224b576ab097ea99dc5cc7f0441ce69cc4f650b.png";
import imgRedBudSmile from "figma:asset/f4b6630b44f9c8d4aeaee9fda9bd4be57541ef67.png";
import organicShape1 from "figma:asset/a2a7b65b4cf6fd78bef2c9afbad239b9c162719a.png";
import organicShape2 from "figma:asset/37c5344494624fced33a62ab62a19e1270bee61d.png";
import organicShape3 from "figma:asset/bcc88538d17aab359922d206779a1cb0adae8b6b.png";
import organicShape4 from "figma:asset/bec931c9c8b83402d28f1a60e9c50278c5ab9d2d.png";

function Image1({ className }: { className?: string }) {
  return (
    <div className={className || "absolute h-[54px] left-[35px] top-[775px] w-[50px]"} data-name="image 6">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} />
    </div>
  );
}

function Image9({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`${className || "absolute h-[54px] left-[129px] top-[775px] w-[42px]"} cursor-pointer`}
      data-name="image 9"
    >
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage9} />
    </button>
  );
}

function Image26({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`${className || "absolute h-[54px] left-[166px] top-[775px] w-[54px]"} cursor-pointer`}
      data-name="image 26"
    >
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage26} />
    </button>
  );
}

function Image2({ className }: { className?: string }) {
  return (
    <div className={className || "absolute h-[64px] left-[309px] top-[770px] w-[46px]"} data-name="image 8">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage8} />
    </div>
  );
}

function Image({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`${className || "absolute h-[55px] left-[215px] top-[774px] w-[50px]"} cursor-pointer`} 
      data-name="image 5"
    >
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
      <div className="absolute aspect-[872/937] left-0 right-0 top-px" data-name="image 25">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage25} />
      </div>
    </button>
  );
}

function BuddyCharacter({ isSmiling, onClick }: { isSmiling: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="absolute contents left-[134px] top-[212px] cursor-pointer"
    >
      <div className="-translate-x-1/2 absolute h-[23.04px] left-[calc(50%+6px)] top-[392px] w-[128px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 23.04">
          <ellipse cx="64" cy="11.52" fill="var(--fill-0, #C09085)" fillOpacity="0.5" id="Ellipse 20" rx="64" ry="11.52" />
        </svg>
      </div>
      <div className="absolute h-[193px] left-[134px] top-[212px] w-[126px]" data-name="image 27">
        <img 
          alt="" 
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full transition-all duration-300" 
          src={isSmiling ? imgRedBudSmile : imgImage27} 
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
      <div className="bg-gradient-to-b from-[#ffab97] relative min-h-screen to-[#ffc9bd] w-screen" data-name="home">
        <div className="absolute h-[149px] left-[64px] top-[35px] w-[261px]" data-name="taste buddy planning [Recovered] 1">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[193.4%] left-[-5.22%] max-w-none top-[-46.7%] w-[110.43%]" src={imgTasteBuddyPlanningRecovered1} />
          </div>
        </div>
        <div className="-translate-x-1/2 absolute font-['Relay_Trial:Regular','Noto_Sans:Regular',sans-serif] h-[82px] leading-[normal] left-[195px] text-[#ff3a00] text-[24px] text-center top-[442px] w-[416px] whitespace-pre-wrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
          <p className="mb-0">{`Your buddy for `}</p>
          <p>culinary exploration!</p>
        </div>
        
        <BuddyCharacter isSmiling={isSmiling} onClick={handleBuddyClick} />

        {/* Fixed navigation bar at bottom */}
        <Navigation />
      </div>
    </div>
  );
}