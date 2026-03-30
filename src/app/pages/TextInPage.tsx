import { useNavigate } from "react-router";
import { motion } from "motion/react";
import imgTasteBuddyPlanningRecovered1 from "figma:asset/a75f13ee8fdc55044426e18a4df7c4c3f15a6468.png";
import imgImage11 from "figma:asset/c9c2d9aab4edc4242272e58890847fcaa02cc29a.png";

export default function TextInPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div 
      className="bg-gradient-to-b from-[#ff9178] relative size-full to-[#ffc9bd] cursor-pointer" 
      data-name="text in"
      onClick={handleClick}
    >
      <motion.div 
        className="-translate-x-1/2 absolute h-[23.04px] left-[calc(50%+5px)] top-[676.98px] w-[128px]"
        initial={{ width: 203, height: 34, top: 664, left: "calc(50% + 4.5px)" }}
        animate={{ width: 128, height: 23.04, top: 676.98, left: "calc(50% + 5px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 23.04">
          <ellipse cx="64" cy="11.52" fill="var(--fill-0, #C09085)" fillOpacity="0.5" id="Ellipse 20" rx="64" ry="11.52" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="-translate-x-1/2 absolute h-[86px] left-[calc(50%+0.5px)] top-[379px] w-[221px]" 
        data-name="Hello buddy, welcome back!"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <div className="absolute font-['Relay_Trial:Regular',sans-serif] inset-0 leading-[normal] not-italic text-[#ff3a00] text-[36px] text-center whitespace-nowrap">
          <p className="mb-0">Hello buddy,</p>
          <p>welcome back!</p>
        </div>
      </motion.div>
      
      <div className="absolute h-[202px] left-[19px] top-[109px] w-[353px]" data-name="taste buddy planning [Recovered] 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[193.4%] left-[-5.22%] max-w-none top-[-46.7%] w-[110.43%]" src={imgTasteBuddyPlanningRecovered1} />
        </div>
      </div>
      
      <motion.div 
        className="-translate-x-1/2 absolute block left-[calc(50%+1px)] size-[245px] top-[470.5px]" 
        data-name="red bud 3"
        initial={{ width: 376, height: 376, top: 348, left: "50%" }}
        animate={{ width: 245, height: 245, top: 470.5, left: "calc(50% + 1px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[193.524px] left-[calc(50%+0.33px)] top-[calc(50%-0.33px)] w-[127.061px]" data-name="image 11">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute left-[0.18%] max-w-none size-full top-[0.14%]" src={imgImage11} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}