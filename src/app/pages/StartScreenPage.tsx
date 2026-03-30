import { useNavigate } from "react-router";
import imgImage11 from "figma:asset/c9c2d9aab4edc4242272e58890847fcaa02cc29a.png";
import imgTasteBuddyPlanningRecovered1 from "figma:asset/a75f13ee8fdc55044426e18a4df7c4c3f15a6468.png";

export default function StartScreenPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/welcome");
  };

  return (
    <div 
      className="bg-gradient-to-b from-[#ff9178] relative size-full to-[#ffc9bd] cursor-pointer" 
      data-name="Start Screen"
      onClick={handleClick}
    >
      <div className="-translate-x-1/2 absolute h-[34px] left-[calc(50%+4.5px)] mix-blend-multiply top-[664px] w-[203px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 203 34">
          <g id="Ellipse 19" opacity="0.5" style={{ mixBlendMode: "multiply" }}>
            <ellipse cx="101.5" cy="17" fill="var(--fill-0, #C0C0C0)" rx="101.5" ry="17" />
          </g>
        </svg>
      </div>
      <div className="-translate-x-1/2 absolute block left-1/2 size-[376px] top-[348px]" data-name="red bud 2">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[297px] left-[calc(50%+0.5px)] top-[calc(50%-0.5px)] w-[195px]" data-name="image 11">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-[0.18%] max-w-none size-full top-[0.14%]" src={imgImage11} />
          </div>
        </div>
      </div>
      <div className="absolute h-[202px] left-[19px] top-[109px] w-[353px]" data-name="taste buddy planning [Recovered] 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[193.4%] left-[-5.22%] max-w-none top-[-46.7%] w-[110.43%]" src={imgTasteBuddyPlanningRecovered1} />
        </div>
      </div>
    </div>
  );
}
