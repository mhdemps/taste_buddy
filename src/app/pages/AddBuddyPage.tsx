import { useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD, PAGE_INTRO_BLURB_TEXT } from "../brand";
import { InfoBoxFrame } from "../components/InfoBoxFrame";
import { ChalkPillFrame } from "../components/ChalkPillFrame";

function optStr(s: string): string | undefined {
  const t = s.trim();
  return t === "" ? undefined : t;
}

export default function AddBuddyPage() {
  const navigate = useNavigate();
  const { addBuddy } = useBuddies();
  const [name, setName] = useState("");
  const [favoriteFood, setFavoriteFood] = useState("");
  const [personality, setPersonality] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [parties, setParties] = useState("");
  const [recipes, setRecipes] = useState("");
  const [allergies, setAllergies] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const partiesRaw = parties.trim();
    let partiesAttended: number | undefined;
    if (partiesRaw !== "") {
      const n = Number.parseInt(partiesRaw, 10);
      partiesAttended = Number.isNaN(n) ? undefined : n;
    }

    addBuddy({
      name: name.trim(),
      favoriteFood: optStr(favoriteFood),
      personality: optStr(personality),
      specialty: optStr(specialty),
      partiesAttended,
      recipesGiven: optStr(recipes),
      allergies: optStr(allergies),
    });
    navigate("/buddies");
  };

  return (
    <div className={`flex min-h-screen flex-col overflow-x-hidden overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
      <GrayTasteHeader />

      <motion.div
        className="flex flex-1 flex-col items-center pb-44 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="mb-4 max-w-[340px] text-center share-tech-bold text-[clamp(1.35rem,4.5vw,1.75rem)] leading-tight text-[#ff3a00]"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          Add a buddy
        </motion.h1>
        <motion.p
          className="mb-8 max-w-[340px] text-center share-tech-regular text-[15px] leading-snug"
          style={{ color: PAGE_INTRO_BLURB_TEXT }}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Their favorite flavors, how you know them, and any allergies to keep in mind.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[340px] flex-col space-y-6"
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <InfoBoxFrame variant={0}>
            <label htmlFor="add-buddy-name" className="mb-2 block share-tech-regular text-[18px]">
              Name
            </label>
            <input
              id="add-buddy-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-none bg-transparent share-tech-regular text-[16px] outline-none"
              placeholder="What should we call them?"
              required
            />
          </InfoBoxFrame>

          <InfoBoxFrame variant={1}>
            <label htmlFor="add-buddy-food" className="mb-2 block share-tech-regular text-[18px]">
              Favorite food
            </label>
            <input
              id="add-buddy-food"
              type="text"
              value={favoriteFood}
              onChange={(e) => setFavoriteFood(e.target.value)}
              className="w-full border-none bg-transparent share-tech-regular text-[16px] outline-none"
              placeholder="Optional"
            />
          </InfoBoxFrame>

          <InfoBoxFrame variant={2}>
            <label htmlFor="add-buddy-personality" className="mb-2 block share-tech-regular text-[18px]">
              Personality
            </label>
            <input
              id="add-buddy-personality"
              type="text"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="w-full border-none bg-transparent share-tech-regular text-[16px] outline-none"
              placeholder="Optional"
            />
          </InfoBoxFrame>

          <InfoBoxFrame variant={3}>
            <label htmlFor="add-buddy-specialty" className="mb-2 block share-tech-regular text-[18px]">
              Specialty
            </label>
            <input
              id="add-buddy-specialty"
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full border-none bg-transparent share-tech-regular text-[16px] outline-none"
              placeholder="Optional — what they cook best"
            />
          </InfoBoxFrame>

          <InfoBoxFrame variant={0}>
            <label htmlFor="add-buddy-parties" className="mb-2 block share-tech-regular text-[18px]">
              Parties attended
            </label>
            <input
              id="add-buddy-parties"
              type="number"
              min={0}
              value={parties}
              onChange={(e) => setParties(e.target.value)}
              className="w-full border-none bg-transparent share-tech-regular text-[16px] outline-none"
              placeholder="Optional"
            />
          </InfoBoxFrame>

          <InfoBoxFrame variant={1}>
            <label htmlFor="add-buddy-recipes" className="mb-2 block share-tech-regular text-[18px]">
              Recipes given
            </label>
            <input
              id="add-buddy-recipes"
              type="text"
              value={recipes}
              onChange={(e) => setRecipes(e.target.value)}
              className="w-full border-none bg-transparent share-tech-regular text-[16px] outline-none"
              placeholder="Optional — dishes they’ve shared"
            />
          </InfoBoxFrame>

          <InfoBoxFrame variant={2}>
            <label htmlFor="add-buddy-allergies" className="mb-2 block share-tech-regular text-[18px]">
              Allergies &amp; restrictions
            </label>
            <textarea
              id="add-buddy-allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="share-tech-regular text-[16px]"
              placeholder="Tag foods to avoid — e.g. nuts, dairy, shellfish (comma-separated is fine)"
              rows={4}
            />
          </InfoBoxFrame>

          <motion.button
            type="submit"
            className="self-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50"
            whileTap={{ scale: 0.97 }}
          >
            <ChalkPillFrame
              variant={2}
              fillClassName="border-2 border-[#e83500]/55 bg-[#ff3a00] shadow-[0_2px_14px_rgba(255,58,0,0.28)]"
              innerClassName="px-8 py-3"
            >
              <span className="share-tech-regular text-[16px] text-white">Save buddy</span>
            </ChalkPillFrame>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate("/buddies")}
            className="self-center py-2 share-tech-bold text-[18px] text-[#ff3a00]"
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
