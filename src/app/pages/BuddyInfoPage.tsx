import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  useBuddies,
  circleForBuddyColor,
  getBuddyColorIndex,
  type BuddyEditablePayload,
} from "../context/BuddiesContext";
import Navigation from "../components/Navigation";
import { InfoBoxFrame } from "../components/InfoBoxFrame";
import { ChalkPillFrame } from "../components/ChalkPillFrame";
import GrayTasteHeader from "../components/GrayTasteHeader";
import { PAGE_GRADIENT, PAGE_HORIZONTAL_PAD } from "../brand";
import {
  BUDDY_IN_CIRCLE_H_PCT,
  BUDDY_IN_CIRCLE_W_PCT,
  BUDDY_PROFILE_CIRCLE_MAX,
} from "../buddyLayout";

function buddyToForm(b: {
  name: string;
  favoriteFood?: string;
  personality?: string;
  specialty?: string;
  partiesAttended?: number;
  recipesGiven?: string;
  allergies?: string;
}): BuddyEditablePayload {
  return {
    name: b.name,
    favoriteFood: b.favoriteFood ?? "",
    personality: b.personality ?? "",
    specialty: b.specialty ?? "",
    partiesAttended: b.partiesAttended != null ? String(b.partiesAttended) : "",
    recipesGiven: b.recipesGiven ?? "",
    allergies: b.allergies ?? "",
  };
}

const inputClass = "border-none bg-transparent share-tech-regular text-[16px] outline-none";

export default function BuddyInfoPage() {
  const navigate = useNavigate();
  const { buddyId } = useParams<{ buddyId: string }>();
  const { getBuddyById, removeBuddy, updateBuddy } = useBuddies();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<BuddyEditablePayload>({
    name: "",
    favoriteFood: "",
    personality: "",
    specialty: "",
    partiesAttended: "",
    recipesGiven: "",
    allergies: "",
  });

  const buddy = buddyId ? getBuddyById(buddyId) : null;

  useEffect(() => {
    setEditing(false);
  }, [buddyId]);

  useEffect(() => {
    if (buddy && !editing) {
      setForm(buddyToForm(buddy));
    }
  }, [buddy, editing]);

  if (!buddy) {
    return (
      <div className={`flex min-h-screen flex-col ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
        <GrayTasteHeader />
        <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-32">
          <p className="share-tech-bold text-[#ff3a00]">Buddy not found</p>
          <motion.button
            type="button"
            onClick={() => navigate("/buddies")}
            className="border-0 bg-transparent p-0 outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45"
            whileTap={{ scale: 0.98 }}
          >
            <ChalkPillFrame
              variant={0}
              fillClassName="border-2 border-[#ff3a00] bg-[#fffaf8] shadow-[0_2px_14px_rgba(45,36,32,0.1)]"
              innerClassName="px-7 py-2.5"
            >
              <span className="share-tech-bold text-[15px] text-[#ff3a00]">All buddies</span>
            </ChalkPillFrame>
          </motion.button>
        </div>
        <Navigation />
      </div>
    );
  }

  const detailCircle = circleForBuddyColor(getBuddyColorIndex(buddy.buddyImage));

  const handleRemove = () => {
    if (confirm(`Are you sure you want to remove ${buddy.name}?`)) {
      removeBuddy(buddyId!);
      navigate("/buddies");
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBuddy(buddy.id, form);
    setEditing(false);
  };

  const openEdit = () => {
    setForm(buddyToForm(buddy));
    setEditing(true);
  };

  return (
    <div className={`flex min-h-screen flex-col overflow-y-auto ${PAGE_GRADIENT} ${PAGE_HORIZONTAL_PAD}`}>
      <GrayTasteHeader />

      <div className="flex flex-1 flex-col items-center pb-44 pt-2">
        <div className="mb-5 flex w-full max-w-[340px] justify-center">
          <motion.button
            type="button"
            onClick={() => navigate("/buddies")}
            className="border-0 bg-transparent p-0 outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45"
            aria-label="Back to all buddies"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChalkPillFrame
              variant={1}
              fillClassName="border-2 border-[#ff6b4a]/45 bg-[#fff8f5] shadow-[0_2px_14px_rgba(45,36,32,0.1)] transition-[border-color,background-color,box-shadow] group-hover:border-[#ff3a00]/55 group-hover:bg-white group-hover:shadow-[0_4px_18px_rgba(255,58,0,0.12)]"
              innerClassName="gap-2 px-5 py-2.5"
            >
              <span
                className="share-tech-bold text-[20px] leading-none text-[#ff3a00] transition-transform duration-200 group-hover:-translate-x-0.5"
                aria-hidden
              >
                ‹
              </span>
              <span className="share-tech-bold text-[16px] text-[#ff3a00]">All buddies</span>
            </ChalkPillFrame>
          </motion.button>
        </div>

        <motion.div
          className="flex w-full flex-col items-center px-2"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className={`relative mx-auto aspect-square w-full overflow-hidden rounded-[50%] ${BUDDY_PROFILE_CIRCLE_MAX}`}
          >
            <img
              alt=""
              className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
              style={{ borderRadius: "50%" }}
              src={detailCircle}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div
                className="flex min-h-0 min-w-0 items-center justify-center"
                style={{
                  width: `${BUDDY_IN_CIRCLE_W_PCT}%`,
                  height: `${BUDDY_IN_CIRCLE_H_PCT}%`,
                  maxWidth: `${BUDDY_IN_CIRCLE_W_PCT}%`,
                  maxHeight: `${BUDDY_IN_CIRCLE_H_PCT}%`,
                }}
              >
                <img
                  alt=""
                  className="max-h-full max-w-full object-contain object-center"
                  src={buddy.smilingImage}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {!editing && (
          <motion.h1
            className="-mt-2 mt-2 text-center share-tech-bold text-[42px] leading-none text-[#ff3a00]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {buddy.name}
          </motion.h1>
        )}

        {editing ? (
          <motion.form
            id="buddy-edit-form"
            onSubmit={handleSave}
            className="mt-8 flex w-full max-w-[340px] flex-col items-center space-y-6"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <InfoBoxFrame variant={0}>
              <label htmlFor="edit-name" className="mb-1 block share-tech-regular text-[18px]">
                Name
              </label>
              <input
                id="edit-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={`w-full ${inputClass}`}
                required
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={1}>
              <label htmlFor="edit-food" className="mb-1 block share-tech-regular text-[18px]">
                Favorite Food
              </label>
              <input
                id="edit-food"
                type="text"
                value={form.favoriteFood}
                onChange={(e) => setForm((f) => ({ ...f, favoriteFood: e.target.value }))}
                className={`w-full ${inputClass}`}
                placeholder="Optional"
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={2}>
              <label htmlFor="edit-personality" className="mb-1 block share-tech-regular text-[18px]">
                Personality
              </label>
              <input
                id="edit-personality"
                type="text"
                value={form.personality}
                onChange={(e) => setForm((f) => ({ ...f, personality: e.target.value }))}
                className={`w-full ${inputClass}`}
                placeholder="Optional"
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={3}>
              <label htmlFor="edit-specialty" className="mb-1 block share-tech-regular text-[18px]">
                Specialty
              </label>
              <input
                id="edit-specialty"
                type="text"
                value={form.specialty}
                onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                className={`w-full ${inputClass}`}
                placeholder="Optional"
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={0}>
              <label htmlFor="edit-parties" className="mb-1 block share-tech-regular text-[18px]">
                Parties Attended
              </label>
              <input
                id="edit-parties"
                type="number"
                min={0}
                value={form.partiesAttended}
                onChange={(e) => setForm((f) => ({ ...f, partiesAttended: e.target.value }))}
                className={`w-full ${inputClass}`}
                placeholder="Optional"
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={1}>
              <label htmlFor="edit-recipes" className="mb-1 block share-tech-regular text-[18px]">
                Recipes Given
              </label>
              <input
                id="edit-recipes"
                type="text"
                value={form.recipesGiven}
                onChange={(e) => setForm((f) => ({ ...f, recipesGiven: e.target.value }))}
                className={`w-full ${inputClass}`}
                placeholder="Optional"
              />
            </InfoBoxFrame>

            <InfoBoxFrame variant={2}>
              <label htmlFor="edit-allergies" className="mb-1 block share-tech-regular text-[18px]">
                Allergies &amp; restrictions
              </label>
              <textarea
                id="edit-allergies"
                value={form.allergies}
                onChange={(e) => setForm((f) => ({ ...f, allergies: e.target.value }))}
                className="share-tech-regular text-[16px]"
                placeholder="Optional — foods to avoid"
                rows={4}
              />
            </InfoBoxFrame>
          </motion.form>
        ) : (
          <motion.div
            className="mt-8 flex w-full max-w-[340px] flex-col items-center space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {buddy.favoriteFood && (
              <InfoBoxFrame variant={0}>
                <h3 className="mb-1 share-tech-bold text-[20px]">Favorite Food</h3>
                <p className="min-w-0 break-words share-tech-regular text-[16px] leading-snug">
                  {buddy.favoriteFood}
                </p>
              </InfoBoxFrame>
            )}

            {buddy.personality && (
              <InfoBoxFrame variant={1}>
                <h3 className="mb-1 share-tech-bold text-[20px]">Personality</h3>
                <p className="min-w-0 break-words share-tech-regular text-[16px] leading-snug">
                  {buddy.personality}
                </p>
              </InfoBoxFrame>
            )}

            {buddy.specialty && (
              <InfoBoxFrame variant={2}>
                <h3 className="mb-1 share-tech-bold text-[20px]">Specialty</h3>
                <p className="min-w-0 break-words share-tech-regular text-[16px] leading-snug">
                  {buddy.specialty}
                </p>
              </InfoBoxFrame>
            )}

            {buddy.partiesAttended !== undefined && buddy.partiesAttended !== null && (
              <InfoBoxFrame variant={3}>
                <h3 className="mb-1 share-tech-bold text-[20px]">Parties Attended</h3>
                <p className="min-w-0 break-words share-tech-regular text-[16px] leading-snug">
                  {buddy.partiesAttended}
                </p>
              </InfoBoxFrame>
            )}

            {buddy.recipesGiven && (
              <InfoBoxFrame variant={0}>
                <h3 className="mb-1 share-tech-bold text-[20px]">Recipes Given</h3>
                <p className="min-w-0 break-words share-tech-regular text-[16px] leading-snug">
                  {buddy.recipesGiven}
                </p>
              </InfoBoxFrame>
            )}

            {buddy.allergies && (
              <InfoBoxFrame variant={1}>
                <h3 className="mb-1 share-tech-bold text-[20px]">Allergies &amp; restrictions</h3>
                <p className="min-w-0 whitespace-pre-wrap break-words share-tech-regular text-[16px] leading-snug">
                  {buddy.allergies}
                </p>
              </InfoBoxFrame>
            )}
          </motion.div>
        )}

        <motion.div
          className="mt-10 flex w-full max-w-[340px] flex-col items-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          {editing ? (
            <div className="flex w-full flex-wrap justify-center gap-3">
              <motion.button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setForm(buddyToForm(buddy));
                }}
                className="border-0 bg-transparent p-0 outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45"
                whileTap={{ scale: 0.97 }}
              >
                <ChalkPillFrame
                  variant={2}
                  fillClassName="border-2 border-[#ff3a00] bg-[#fffaf8] shadow-[0_2px_10px_rgba(45,36,32,0.08)]"
                  innerClassName="px-6 py-2.5"
                >
                  <span className="share-tech-regular text-[16px] text-[#ff3a00]">Cancel</span>
                </ChalkPillFrame>
              </motion.button>
              <motion.button
                type="submit"
                form="buddy-edit-form"
                className="border-0 bg-transparent p-0 outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45"
                whileTap={{ scale: 0.97 }}
              >
                <ChalkPillFrame
                  variant={3}
                  fillClassName="border-2 border-[#e83500]/55 bg-[#ff3a00] shadow-[0_2px_12px_rgba(255,58,0,0.28)]"
                  innerClassName="px-6 py-2.5"
                >
                  <span className="share-tech-regular text-[16px] text-white">Save changes</span>
                </ChalkPillFrame>
              </motion.button>
            </div>
          ) : (
            <motion.button
              type="button"
              onClick={openEdit}
              className="border-0 bg-transparent p-0 outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-[#ff3a00]/45"
              whileTap={{ scale: 0.97 }}
            >
              <ChalkPillFrame
                variant={0}
                fillClassName="border-2 border-[#e83500]/55 bg-[#ff3a00] shadow-[0_2px_14px_rgba(255,58,0,0.28)]"
                innerClassName="px-8 py-3"
              >
                <span className="share-tech-regular text-[16px] text-white">Edit buddy</span>
              </ChalkPillFrame>
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={handleRemove}
            className="share-tech-regular text-[16px] text-[#ff3a00]"
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove Buddy
          </motion.button>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
}
