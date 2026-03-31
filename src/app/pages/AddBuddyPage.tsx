import { useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import imgLogo from "@project-assets/orange logo.png";
import infoBox1 from "@project-assets/box 1.png";
import infoBox2 from "@project-assets/box 2.png";
import infoBox3 from "@project-assets/box 3.png";
import infoBox4 from "@project-assets/box 4.png";

export default function AddBuddyPage() {
  const navigate = useNavigate();
  const { addBuddy } = useBuddies();
  const [name, setName] = useState("");
  const [parties, setParties] = useState("");
  const [recipes, setRecipes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBuddy({
      name,
      partiesAttended: parseInt(parties),
      recipesGiven: recipes
    });
    navigate('/buddies');
  };

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden">
      <motion.div 
        className="bg-gradient-to-b from-[#ffab97] relative to-[#ffc9bd] w-screen"
        style={{ minHeight: 'calc(100vh + 100px)', paddingBottom: '200px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="absolute h-[149px] left-[64px] top-[35px] w-[261px]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[193.4%] left-[-5.22%] max-w-none top-[-46.7%] w-[110.43%] object-contain" src={imgLogo} />
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="absolute left-1/2 -translate-x-1/2 top-[240px] w-[340px] space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Name field */}
          <div className="relative h-[120px] w-full">
            <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox4} />
            <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
              <label htmlFor="name" className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[18px] mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px] bg-transparent border-none outline-none placeholder:text-[#2d2d2d]/50"
                placeholder="Enter buddy's name"
                required
              />
            </div>
          </div>

          {/* Parties attended field */}
          <div className="relative h-[120px] w-full">
            <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox3} />
            <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
              <label htmlFor="parties" className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[18px] mb-2">
                Parties Attended
              </label>
              <input
                id="parties"
                type="number"
                value={parties}
                onChange={(e) => setParties(e.target.value)}
                className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px] bg-transparent border-none outline-none placeholder:text-[#2d2d2d]/50"
                placeholder="How many parties?"
                required
              />
            </div>
          </div>

          {/* Recipes given field */}
          <div className="relative h-[120px] w-full">
            <img alt="" className="absolute inset-0 w-full h-full object-contain" src={infoBox2} />
            <div className="relative z-10 px-8 py-4 flex flex-col justify-center h-full">
              <label htmlFor="recipes" className="font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[18px] mb-2">
                Recipes Given
              </label>
              <input
                id="recipes"
                type="text"
                value={recipes}
                onChange={(e) => setRecipes(e.target.value)}
                className="font-['Relay_Trial:Regular',sans-serif] text-[#2d2d2d] text-[16px] bg-transparent border-none outline-none placeholder:text-[#2d2d2d]/50"
                placeholder="List recipes (comma separated)"
                required
              />
            </div>
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            className="w-full py-4 font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[24px] text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Buddy!
          </motion.button>

          {/* Cancel button */}
          <motion.button
            type="button"
            onClick={() => navigate('/buddies')}
            className="w-full py-2 font-['Relay_Trial:Regular',sans-serif] text-[#ff3a00] text-[18px] text-center"
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.form>

        {/* Fixed navigation bar at bottom */}
        <Navigation />
      </motion.div>
    </div>
  );
}