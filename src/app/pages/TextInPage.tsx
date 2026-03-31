import { useNavigate } from "react-router";
import { motion } from "motion/react";
import imgLogo from "@project-assets/orange logo.png";
import imgMascot from "@project-assets/orange buddy.png";

export default function TextInPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <div 
      className="relative size-full cursor-pointer bg-gradient-to-b from-[#ff9178] to-[#ffc9bd]" 
      data-name="text in"
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
    >
      <motion.div 
        className="absolute left-[calc(50%+5px)] top-[676.98px] h-[23.04px] w-[128px] -translate-x-1/2"
        initial={{ width: 203, height: 34, top: 664, left: "calc(50% + 4.5px)" }}
        animate={{ width: 128, height: 23.04, top: 676.98, left: "calc(50% + 5px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 128 23.04">
          <ellipse cx="64" cy="11.52" fill="var(--fill-0, #C09085)" fillOpacity="0.5" id="Ellipse 20" rx="64" ry="11.52" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute left-[calc(50%+0.5px)] top-[379px] h-[86px] w-[221px] -translate-x-1/2" 
        data-name="Hello buddy, welcome back!"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 text-center font-['Relay_Trial:Regular',sans-serif] text-[36px] not-italic leading-[normal] text-[#ff3a00] whitespace-nowrap">
          <p className="mb-0">Hello buddy,</p>
          <p>welcome back!</p>
        </div>
      </motion.div>
      
      <div className="absolute left-[19px] top-[109px] h-[202px] w-[353px]" data-name="logo">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img alt="" className="absolute left-[-5.22%] top-[-46.7%] h-[193.4%] w-[110.43%] max-w-none object-contain" src={imgLogo} />
        </div>
      </div>
      
      <motion.div 
        className="absolute left-[calc(50%+1px)] top-[470.5px] block size-[245px] -translate-x-1/2" 
        data-name="mascot"
        initial={{ width: 376, height: 376, top: 348, left: "50%" }}
        animate={{ width: 245, height: 245, top: 470.5, left: "calc(50% + 1px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="absolute left-[calc(50%+0.33px)] top-[calc(50%-0.33px)] h-[193.524px] w-[127.061px] -translate-x-1/2 -translate-y-1/2">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img alt="" className="absolute left-[0.18%] top-[0.14%] size-full max-w-none object-contain" src={imgMascot} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
