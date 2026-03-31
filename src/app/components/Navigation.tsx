import { useNavigate } from "react-router";
import navBackground from "@project-assets/nav bar.png";
import iconChef from "@project-assets/fill chef.png";
import iconParty from "@project-assets/fill party.png";
import iconHome from "@project-assets/filled home.png";
import iconRefresh from "@project-assets/fill swap.png";
import iconProfile from "@project-assets/fill buddy.png";

interface NavIconProps {
  icon: string;
  onClick?: () => void;
  className?: string;
}

function NavIcon({ icon, onClick, className }: NavIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} cursor-pointer transition-all duration-200 hover:opacity-80`}
    >
      <img
        alt=""
        className="pointer-events-none absolute inset-0 size-full max-w-none object-contain"
        src={icon}
      />
    </button>
  );
}

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <div className="relative h-[69px] w-[360px]">
        <img
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          src={navBackground}
        />

        <NavIcon
          icon={iconChef}
          onClick={() => navigate("/home")}
          className="absolute left-[48px] top-[17px] h-[35px] w-[32px]"
        />

        <NavIcon
          icon={iconParty}
          onClick={() => navigate("/buddies")}
          className="absolute left-[108px] top-[18px] h-[33px] w-[26px]"
        />

        <NavIcon
          icon={iconHome}
          onClick={() => navigate("/home")}
          className="absolute left-[165px] top-[18px] h-[34px] w-[30px]"
        />

        <NavIcon
          icon={iconRefresh}
          onClick={() => navigate("/welcome")}
          className="absolute left-[223px] top-[19px] h-[32px] w-[32px]"
        />

        <NavIcon
          icon={iconProfile}
          onClick={() => navigate("/add-buddy")}
          className="absolute left-[282px] top-[15px] h-[40px] w-[29px]"
        />
      </div>
    </div>
  );
}
