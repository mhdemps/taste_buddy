import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import Navigation from "../components/Navigation";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { InfoBoxFrame } from "../components/InfoBoxFrame";
import { ChalkPillFrame } from "../components/ChalkPillFrame";
import {
  INFO_PANEL_TEXT,
  PAGE_GRADIENT,
  PAGE_HORIZONTAL_PAD,
  PAGE_INTRO_BLURB_TEXT,
} from "../brand";
import imgRemoveRecipe from "@project-assets/party-remove-x.png";
import imgAddRecipe from "@project-assets/madison-is-pretty.png";
import imgYourRecipesHat from "@project-assets/thick hat.png";

const STORAGE_KEY = "tasteBuddyMyRecipes";

export type MyRecipeEntry = {
  id: string;
  recipeName: string;
  /** Comma- or semicolon-separated allergy tags for this dish */
  allergies: string;
  ingredients: string;
  directions: string;
  notes: string;
  savedAt: string;
};

function parseAllergyTags(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function loadRecipes(): MyRecipeEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (row): row is MyRecipeEntry =>
          !!row &&
          typeof row === "object" &&
          typeof (row as MyRecipeEntry).id === "string"
      )
      .map((row) => ({
        ...row,
        allergies: typeof row.allergies === "string" ? row.allergies : "",
      }));
  } catch {
    return [];
  }
}

function sortNewestFirst(list: MyRecipeEntry[]) {
  return [...list].sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  );
}

function persistRecipes(list: MyRecipeEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function MyRecipesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipeId: editRecipeId } = useParams<{ recipeId?: string }>();
  const isAddView = location.pathname.endsWith("/add");
  const isEditView = Boolean(editRecipeId);
  const isFormView = isAddView || isEditView;

  const [saved, setSaved] = useState<MyRecipeEntry[]>(() =>
    sortNewestFirst(loadRecipes())
  );

  const [expandedRecipeId, setExpandedRecipeId] = useState<string | null>(null);

  const [recipeName, setRecipeName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [notes, setNotes] = useState("");

  const refresh = useCallback(() => {
    setSaved(sortNewestFirst(loadRecipes()));
  }, []);

  useEffect(() => {
    if (isAddView) {
      setRecipeName("");
      setAllergies("");
      setIngredients("");
      setDirections("");
      setNotes("");
      return;
    }
    if (!editRecipeId) return;
    const found = loadRecipes().find((r) => r.id === editRecipeId);
    if (!found) {
      navigate("/my-recipes", { replace: true });
      return;
    }
    setRecipeName(found.recipeName);
    setAllergies(found.allergies);
    setIngredients(found.ingredients);
    setDirections(found.directions);
    setNotes(found.notes);
  }, [isAddView, editRecipeId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editRecipeId) {
      const list = loadRecipes();
      const existing = list.find((r) => r.id === editRecipeId);
      if (!existing) {
        navigate("/my-recipes");
        return;
      }
      const updated: MyRecipeEntry = {
        ...existing,
        recipeName: recipeName.trim(),
        allergies: allergies.trim(),
        ingredients: ingredients.trim(),
        directions: directions.trim(),
        notes: notes.trim(),
        savedAt: new Date().toISOString(),
      };
      persistRecipes(list.map((r) => (r.id === editRecipeId ? updated : r)));
      refresh();
      setRecipeName("");
      setAllergies("");
      setIngredients("");
      setDirections("");
      setNotes("");
      navigate("/my-recipes");
      return;
    }
    const list = loadRecipes();
    const row: MyRecipeEntry = {
      id: `my-recipe-${Date.now()}`,
      recipeName: recipeName.trim(),
      allergies: allergies.trim(),
      ingredients: ingredients.trim(),
      directions: directions.trim(),
      notes: notes.trim(),
      savedAt: new Date().toISOString(),
    };
    list.push(row);
    persistRecipes(list);
    refresh();
    setRecipeName("");
    setAllergies("");
    setIngredients("");
    setDirections("");
    setNotes("");
    navigate("/my-recipes");
  };

  const handleRemove = (entry: MyRecipeEntry) => {
    if (!confirm(`Remove "${entry.recipeName}" from your recipes?`)) return;
    persistRecipes(loadRecipes().filter((r) => r.id !== entry.id));
    refresh();
    setExpandedRecipeId((cur) => (cur === entry.id ? null : cur));
  };

  if (isFormView) {
    return (
      <div className={`flex min-h-screen flex-col overflow-x-hidden overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
        <GrayTasteHeader />

        <motion.div
          className="flex flex-1 flex-col items-center pb-44 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            alt=""
            src={imgYourRecipesHat}
            draggable={false}
            className="mb-3 h-auto w-[min(112px,30vw)] max-w-full select-none object-contain"
            style={{ transformOrigin: "50% 100%" }}
            whileHover={{ rotate: -10 }}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.02 }}
          />

          <motion.h1
            className="mb-4 max-w-[340px] text-center share-tech-bold text-[clamp(1.5rem,4.8vw,1.9rem)] leading-tight text-[#ff3a00]"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {isEditView ? "Edit recipe" : "Add a recipe"}
          </motion.h1>
          <motion.p
            className="mb-8 max-w-[340px] text-center share-tech-regular text-[17px] leading-snug"
            style={{ color: PAGE_INTRO_BLURB_TEXT }}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {isEditView
              ? "Update ingredients, steps, or notes — then save."
              : "Save ingredients, steps, and notes you want to keep."}
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[340px] flex-col space-y-6"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <InfoBoxFrame variant={0}>
              <label htmlFor="my-recipe-title" className="mb-2 block share-tech-bold text-[20px]">
                Recipe name
              </label>
              <input
                id="my-recipe-title"
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                className="w-full border-none bg-transparent share-tech-regular text-[18px] outline-none"
                placeholder="What do you call this dish?"
                required
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={1}>
              <label htmlFor="my-recipe-allergies" className="mb-2 block share-tech-bold text-[20px]">
                Allergy tags (optional)
              </label>
              <input
                id="my-recipe-allergies"
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full border-none bg-transparent share-tech-regular text-[18px] outline-none"
                placeholder="e.g. nuts, dairy — comma-separated"
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={2}>
              <label htmlFor="my-recipe-ingredients" className="mb-2 block share-tech-bold text-[20px]">
                Ingredients &amp; amounts
              </label>
              <textarea
                id="my-recipe-ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="share-tech-regular text-[18px]"
                placeholder="Everything that goes in"
                rows={5}
                required
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={3}>
              <label htmlFor="my-recipe-directions" className="mb-2 block share-tech-bold text-[20px]">
                Directions
              </label>
              <textarea
                id="my-recipe-directions"
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
                className="share-tech-regular text-[18px]"
                placeholder="How you make it"
                rows={6}
                required
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={0}>
              <label htmlFor="my-recipe-notes" className="mb-2 block share-tech-bold text-[20px]">
                Notes (optional)
              </label>
              <textarea
                id="my-recipe-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="share-tech-regular text-[18px]"
                placeholder="Timing tips, sides, tweaks for next time…"
                rows={3}
              />
            </InfoBoxFrame>

            <motion.button
              type="submit"
              className="self-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50"
              whileTap={{ scale: 0.97 }}
            >
              <ChalkPillFrame
                variant={0}
                fillClassName="border-2 border-[#e83500]/55 bg-[#ff3a00] shadow-[0_2px_14px_rgba(255,58,0,0.28)]"
                innerClassName="px-8 py-3"
              >
                <span className="share-tech-regular text-[18px] text-white">
                  {isEditView ? "Save changes" : "Save recipe"}
                </span>
              </ChalkPillFrame>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => navigate("/my-recipes")}
              className="self-center py-2 share-tech-bold text-[20px] text-[#ff3a00]"
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

  return (
    <div className={`flex min-h-screen flex-col overflow-x-hidden overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
      <GrayTasteHeader />

      <motion.div
        className="flex flex-1 flex-col items-center pb-44 pt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          alt=""
          src={imgYourRecipesHat}
          draggable={false}
          className="mb-3 h-auto w-[min(112px,30vw)] max-w-full select-none object-contain"
          style={{ transformOrigin: "50% 100%" }}
          whileHover={{ rotate: -10 }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.02 }}
        />

        <motion.h1
          className="mb-4 max-w-[340px] text-center share-tech-bold text-[clamp(1.5rem,4.8vw,1.9rem)] leading-tight text-[#ff3a00]"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          Your recipes
        </motion.h1>
        <motion.p
          className="mb-8 max-w-[340px] text-center share-tech-regular text-[17px] leading-snug"
          style={{ color: PAGE_INTRO_BLURB_TEXT }}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Tap a recipe to open it, or + to add a new one.
        </motion.p>

        <motion.section
          className="flex w-full max-w-[340px] flex-col gap-4"
          aria-labelledby="my-saved-recipes-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <h2
            id="my-saved-recipes-heading"
            className="text-center share-tech-bold text-[24px] text-[#ff3a00]"
          >
            Saved recipes
          </h2>
          {saved.length === 0 ? (
            <InfoBoxFrame variant={1}>
              <p className="share-tech-regular text-[18px] leading-snug">
                Nothing here yet — tap + below to add your first recipe.
              </p>
            </InfoBoxFrame>
          ) : (
            <ul className="flex list-none flex-col gap-5 p-0">
              {saved.map((r, i) => {
                const isExpanded = expandedRecipeId === r.id;
                const allergyList = parseAllergyTags(r.allergies);
                return (
                  <li key={r.id} className="relative w-full">
                    <div className="relative w-full">
                      <InfoBoxFrame variant={i % 4}>
                        {isExpanded ? (
                          <>
                            <h3 className="mb-2 pr-11 share-tech-bold text-[22px]">{r.recipeName}</h3>
                            {allergyList.length > 0 ? (
                              <>
                                <p className="mb-1.5 pr-11 share-tech-bold text-[17px] text-[#2d2d2d]">Allergies</p>
                                <ul className="mb-3 flex max-w-full flex-wrap gap-1.5 pr-11" aria-label="Allergens">
                                  {allergyList.map((tag, ti) => (
                                    <li
                                      key={`${r.id}-allergy-${ti}`}
                                      className="shrink-0 rounded-full border border-[#c42a08]/40 bg-[#fff5f2] px-2.5 py-0.5 share-tech-bold text-[13px] leading-tight text-[#ff3a00]"
                                    >
                                      {tag}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : null}
                            {r.ingredients ? (
                              <div className="mb-2">
                                <p className="mb-0.5 share-tech-bold text-[17px] text-[#2d2d2d]">Ingredients</p>
                                <p className="whitespace-pre-wrap break-words share-tech-regular text-[17px] leading-snug">
                                  {r.ingredients}
                                </p>
                              </div>
                            ) : null}
                            {r.directions ? (
                              <div className="mb-2">
                                <p className="mb-0.5 share-tech-bold text-[17px] text-[#2d2d2d]">Directions</p>
                                <p className="whitespace-pre-wrap break-words share-tech-regular text-[17px] leading-snug">
                                  {r.directions}
                                </p>
                              </div>
                            ) : null}
                            {r.notes ? (
                              <div className="mb-2">
                                <p className="mb-0.5 share-tech-bold text-[17px] text-[#2d2d2d]">Notes</p>
                                <p className="whitespace-pre-wrap break-words share-tech-regular text-[17px] leading-snug">
                                  {r.notes}
                                </p>
                              </div>
                            ) : null}
                            <div className="mt-4 flex flex-col items-center gap-3 border-t border-[#c42a08]/15 pt-4">
                              <motion.button
                                type="button"
                                className="border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50"
                                onClick={() => navigate(`/my-recipes/edit/${r.id}`)}
                                whileTap={{ scale: 0.97 }}
                              >
                                <ChalkPillFrame
                                  variant={(i + 1) % 4}
                                  fillClassName="border-2 border-[#e83500]/55 bg-[#ff3a00] shadow-[0_2px_14px_rgba(255,58,0,0.28)]"
                                  innerClassName="px-7 py-2.5"
                                >
                                  <span className="share-tech-regular text-[17px] text-white">Edit</span>
                                </ChalkPillFrame>
                              </motion.button>
                              <motion.button
                                type="button"
                                onClick={() => handleRemove(r)}
                                className="flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50"
                                aria-label={`Remove ${r.recipeName}`}
                                whileHover={{ scale: 1.06, opacity: 0.88 }}
                                whileTap={{ scale: 0.94 }}
                              >
                                <img
                                  alt=""
                                  src={imgRemoveRecipe}
                                  draggable={false}
                                  className="pointer-events-none block max-h-3 max-w-3 shrink-0 object-contain"
                                />
                              </motion.button>
                            </div>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="w-full cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#ff3a00]/40 focus-visible:ring-offset-2"
                            aria-expanded={false}
                            onClick={() => setExpandedRecipeId(r.id)}
                          >
                            <h3 className="mb-2 share-tech-bold text-[22px]">{r.recipeName}</h3>
                            {allergyList.length > 0 ? (
                              <ul className="mb-2 flex max-w-full flex-wrap gap-1.5" aria-label="Allergens">
                                {allergyList.map((tag, ti) => (
                                  <li
                                    key={`${r.id}-allergy-${ti}`}
                                    className="shrink-0 rounded-full border border-[#c42a08]/40 bg-[#fff5f2] px-2.5 py-0.5 share-tech-bold text-[13px] leading-tight text-[#ff3a00]"
                                  >
                                    {tag}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                            <p className="share-tech-regular text-[16px] leading-snug opacity-75" style={{ color: PAGE_INTRO_BLURB_TEXT }}>
                              Tap to open recipe
                            </p>
                          </button>
                        )}
                      </InfoBoxFrame>
                      {isExpanded ? (
                        <motion.button
                          type="button"
                          onClick={() => setExpandedRecipeId(null)}
                          className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#ff3a00]/40"
                          aria-label="Minimize recipe"
                          whileHover={{ opacity: 0.75 }}
                          whileTap={{ scale: 0.94 }}
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                            className="shrink-0"
                          >
                            <path
                              d="M6 14l6-6 6 6"
                              stroke={INFO_PANEL_TEXT}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.button>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.section>

        <motion.button
          type="button"
          onClick={() => navigate("/my-recipes/add")}
          className="mt-14 size-32"
          aria-label="Add a recipe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            alt=""
            className="h-full w-full object-contain"
            src={imgAddRecipe}
            draggable={false}
          />
        </motion.button>
      </motion.div>

      <Navigation />
    </div>
  );
}
