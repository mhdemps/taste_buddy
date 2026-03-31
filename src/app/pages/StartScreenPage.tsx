import { useNavigate } from "react-router";
import imgLogo from "@project-assets/orange logo.png";
import imgMascot from "@project-assets/orange buddy.png";
import imgShadow from "@project-assets/orange shadow.png";

export default function StartScreenPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/welcome");
  };

  return (
    <div 
      className="relative size-full cursor-pointer bg-gradient-to-b from-[#ff9178] to-[#ffc9bd]" 
      data-name="Start Screen"
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
    >
      <div className="absolute left-[calc(50%+4.5px)] top-[664px] h-[34px] w-[203px] -translate-x-1/2 mix-blend-multiply">
        <img alt="" className="size-full object-cover opacity-70" src={imgShadow} />
      </div>
      <div className="absolute left-1/2 top-[348px] block size-[376px] -translate-x-1/2" data-name="mascot">
        <div className="absolute left-[calc(50%+0.5px)] top-[calc(50%-0.5px)] h-[297px] w-[195px] -translate-x-1/2 -translate-y-1/2">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img alt="" className="absolute left-[0.18%] top-[0.14%] size-full max-w-none object-contain" src={imgMascot} />
          </div>
        </div>
      </div>
      <div className="absolute left-[19px] top-[109px] h-[202px] w-[353px]" data-name="logo">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-[-5.22%] top-[-46.7%] h-[193.4%] w-[110.43%] max-w-none object-contain" src={imgLogo} />
        </div>
      </div>
    </div>
  );
}
