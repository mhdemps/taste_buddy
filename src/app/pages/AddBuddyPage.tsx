import { useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD } from "../brand";
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
    <div className={`flex min-h-screen flex-col overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
      <GrayTasteHeader />

      <motion.div
        className="flex flex-1 flex-col items-center pb-44 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[340px] flex-col space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative h-[120px] w-full">
            <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox4} />
            <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
              <label htmlFor="name" className="mb-2 share-tech-regular text-[18px] text-[#ff3a00]">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-none bg-transparent share-tech-regular text-[16px] text-[#2d2d2d] outline-none placeholder:text-[#2d2d2d]/50"
                placeholder="Enter buddy's name"
                required
              />
            </div>
          </div>

          <div className="relative h-[120px] w-full">
            <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox3} />
            <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
              <label htmlFor="parties" className="mb-2 share-tech-regular text-[18px] text-[#ff3a00]">
                Parties Attended
              </label>
              <input
                id="parties"
                type="number"
                value={parties}
                onChange={(e) => setParties(e.target.value)}
                className="border-none bg-transparent share-tech-regular text-[16px] text-[#2d2d2d] outline-none placeholder:text-[#2d2d2d]/50"
                placeholder="How many parties?"
                required
              />
            </div>
          </div>

          <div className="relative h-[120px] w-full">
            <img alt="" className="absolute inset-0 size-full object-contain" src={infoBox2} />
            <div className="relative z-10 flex h-full flex-col justify-center px-8 py-4">
              <label htmlFor="recipes" className="mb-2 share-tech-regular text-[18px] text-[#ff3a00]">
                Recipes Given
              </label>
              <input
                id="recipes"
                type="text"
                value={recipes}
                onChange={(e) => setRecipes(e.target.value)}
                className="border-none bg-transparent share-tech-regular text-[16px] text-[#2d2d2d] outline-none placeholder:text-[#2d2d2d]/50"
                placeholder="List recipes (comma separated)"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 text-center share-tech-regular text-[24px] text-[#ff3a00]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add Buddy!
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate('/buddies')}
            className="w-full py-2 text-center share-tech-regular text-[18px] text-[#ff3a00]"
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.form>
      </motion.div>

      <Navigation />
    </div>
  );
}
