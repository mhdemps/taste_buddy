import { useNavigate, useLocation } from "react-router";
import navBackground from "figma:asset/a4cfa7e28d7f2ad2199daf5ce6ceaf69761c6c25.png";

// Dark orange filled icons (#ff3a00)
import iconChef from "figma:asset/7eb9b2f4c4aed993738fa5aae79cfae46ff61dd9.png";
import iconParty from "figma:asset/b6158e2b04dc2b0be874c75c86de4a62c0c3d992.png";
import iconHome from "figma:asset/5c6e52c3a084bef4d0e3ec9fdcce04488ea99d19.png";
import iconRefresh from "figma:asset/aa04a058d4cb7d5e28dfd62ec95b21a7d08da065.png";
import iconProfile from "figma:asset/e85c96e3cf6c5aed11ee31207f20b6d6bae71b02.png";

interface NavIconProps {
  icon: string;
  onClick?: () => void;
  className?: string;
}

function NavIcon({ icon, onClick, className }: NavIconProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} cursor-pointer transition-all duration-200 hover:opacity-80`}
    >
      <img
        alt=""
        className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
        src={icon}
      />
    </button>
  );
}

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <div className="relative h-[69px] w-[360px]">
        {/* Navigation background */}
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          src={navBackground}
        />
        
        {/* Icon 1 - Chef (leftmost) */}
        <NavIcon
          icon={iconChef}
          className="absolute h-[35px] left-[48px] top-[17px] w-[32px]"
        />
        
        {/* Icon 2 - Party popper (Buddies page) */}
        <NavIcon
          icon={iconParty}
          onClick={() => navigate('/buddies')}
          className="absolute h-[33px] left-[108px] top-[18px] w-[26px]"
        />
        
        {/* Icon 3 - CENTER HOME */}
        <NavIcon
          icon={iconHome}
          onClick={() => navigate('/home')}
          className="absolute h-[34px] left-[165px] top-[18px] w-[30px]"
        />
        
        {/* Icon 4 - Refresh (between center and rightmost) */}
        <NavIcon
          icon={iconRefresh}
          className="absolute h-[32px] left-[223px] top-[19px] w-[32px]"
        />
        
        {/* Icon 5 - Profile (rightmost) */}
        <NavIcon
          icon={iconProfile}
          className="absolute h-[40px] left-[282px] top-[15px] w-[29px]"
        />
      </div>
    </div>
  );
}