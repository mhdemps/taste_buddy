import { useNavigate, useLocation, useParams } from "react-router";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { useBuddies } from "../context/BuddiesContext";
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
import imgPartyPlus from "@project-assets/madison-is-pretty.png";
import imgRemoveParty from "@project-assets/party-remove-x.png";
import imgPartyTopBuddy from "@project-assets/vibe-code-bad.png";

const STORAGE_KEY = "tasteBuddyPartyPlans";

export type PartyPlanEntry = {
  id: string;
  partyName: string;
  /** Comma- or semicolon-separated party theme tags */
  partyThemes: string;
  date: string;
  address: string;
  buddyId: string;
  buddyName: string;
  bringing: string;
  savedAt: string;
};

function parsePartyThemes(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function normalizePartyEntry(raw: unknown): PartyPlanEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string" || !o.id) return null;
  const buddyName = typeof o.buddyName === "string" ? o.buddyName : "";
  const legacyName =
    typeof o.partyName === "string"
      ? o.partyName
      : buddyName
        ? `${buddyName}'s party`
        : "Party";
  return {
    id: o.id,
    partyName: legacyName,
    partyThemes: typeof o.partyThemes === "string" ? o.partyThemes : "",
    date: typeof o.date === "string" ? o.date : "",
    address: typeof o.address === "string" ? o.address : "",
    buddyId: typeof o.buddyId === "string" ? o.buddyId : "",
    buddyName,
    bringing: typeof o.bringing === "string" ? o.bringing : "",
    savedAt: typeof o.savedAt === "string" ? o.savedAt : new Date().toISOString(),
  };
}

function loadPartyPlans(): PartyPlanEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizePartyEntry).filter((e): e is PartyPlanEntry => e !== null);
  } catch {
    return [];
  }
}

function sortPlansNewestFirst(list: PartyPlanEntry[]) {
  return [...list].sort(
    (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
  );
}

function persistPlans(list: PartyPlanEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return "—";
  const d = new Date(isoDate + "T12:00:00");
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AttendPartyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { partyId: editPartyId } = useParams<{ partyId?: string }>();
  const isAddView = location.pathname.endsWith("/add");
  const isEditView = Boolean(editPartyId);
  const isFormView = isAddView || isEditView;
  const { buddies } = useBuddies();
  const [savedPlans, setSavedPlans] = useState<PartyPlanEntry[]>(() =>
    sortPlansNewestFirst(loadPartyPlans())
  );

  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const [partyName, setPartyName] = useState("");
  const [partyThemes, setPartyThemes] = useState("");
  const [partyDate, setPartyDate] = useState("");
  const [address, setAddress] = useState("");
  const [buddyId, setBuddyId] = useState("");
  const [bringing, setBringing] = useState("");

  const refreshSavedPlans = useCallback(() => {
    setSavedPlans(sortPlansNewestFirst(loadPartyPlans()));
  }, []);

  useEffect(() => {
    if (buddies.length === 0) return;
    if (!buddyId || !buddies.some((b) => b.id === buddyId)) {
      setBuddyId(buddies[0]!.id);
    }
  }, [buddies, buddyId]);

  useEffect(() => {
    if (isFormView && buddies.length === 0) {
      navigate("/party", { replace: true });
    }
  }, [isFormView, buddies.length, navigate]);

  useEffect(() => {
    if (isAddView) {
      setPartyName("");
      setPartyThemes("");
      setPartyDate("");
      setAddress("");
      setBringing("");
      return;
    }
    if (!editPartyId) return;
    const found = loadPartyPlans().find((p) => p.id === editPartyId);
    if (!found) {
      navigate("/party", { replace: true });
      return;
    }
    setPartyName(found.partyName);
    setPartyThemes(found.partyThemes);
    setPartyDate(found.date);
    setAddress(found.address);
    setBuddyId(found.buddyId || (buddies[0]?.id ?? ""));
    setBringing(found.bringing);
  }, [isAddView, editPartyId, navigate, buddies]);

  const selectedBuddy = useMemo(
    () => buddies.find((b) => b.id === buddyId),
    [buddies, buddyId]
  );

  const goToAddParty = () => {
    if (buddies.length === 0) {
      navigate("/add-buddy");
      return;
    }
    navigate("/party/add");
  };

  const handleDeleteParty = (plan: PartyPlanEntry) => {
    if (
      !confirm(
        `Remove "${plan.partyName}" from your saved parties?`
      )
    ) {
      return;
    }
    persistPlans(loadPartyPlans().filter((p) => p.id !== plan.id));
    refreshSavedPlans();
    setExpandedPlanId((cur) => (cur === plan.id ? null : cur));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuddy) return;

    if (editPartyId) {
      const list = loadPartyPlans();
      const existing = list.find((p) => p.id === editPartyId);
      if (!existing) {
        navigate("/party");
        return;
      }
      const updated: PartyPlanEntry = {
        ...existing,
        partyName: partyName.trim(),
        partyThemes: partyThemes.trim(),
        date: partyDate,
        address: address.trim(),
        buddyId: selectedBuddy.id,
        buddyName: selectedBuddy.name,
        bringing: bringing.trim(),
        savedAt: new Date().toISOString(),
      };
      persistPlans(list.map((p) => (p.id === editPartyId ? updated : p)));
      refreshSavedPlans();
      setPartyName("");
      setPartyThemes("");
      setPartyDate("");
      setAddress("");
      setBringing("");
      navigate("/party");
      return;
    }

    const list = loadPartyPlans();
    const row: PartyPlanEntry = {
      id: `party-${Date.now()}`,
      partyName: partyName.trim(),
      partyThemes: partyThemes.trim(),
      date: partyDate,
      address: address.trim(),
      buddyId: selectedBuddy.id,
      buddyName: selectedBuddy.name,
      bringing: bringing.trim(),
      savedAt: new Date().toISOString(),
    };
    list.push(row);
    persistPlans(list);
    refreshSavedPlans();
    setPartyName("");
    setPartyThemes("");
    setPartyDate("");
    setAddress("");
    setBringing("");
    navigate("/party");
  };

  function renderThemePills(planId: string, themes: string[], layout: "collapsed" | "expanded") {
    if (themes.length === 0) return null;
    const margin = layout === "expanded" ? "mb-3" : "mb-2";
    const endPad = layout === "expanded" ? " pr-11" : "";
    return (
      <ul
        className={`${margin} flex max-w-full flex-wrap gap-1.5${endPad}`}
        aria-label="Party themes"
      >
        {themes.map((tag, ti) => (
          <li
            key={`${planId}-theme-${ti}`}
            className="shrink-0 rounded-full border border-[#c42a08]/40 bg-[#fff5f2] px-2.5 py-0.5 share-tech-bold text-[13px] leading-tight text-[#ff3a00]"
          >
            {tag}
          </li>
        ))}
      </ul>
    );
  }

  if (isFormView && buddies.length > 0) {
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
            src={imgPartyTopBuddy}
            draggable={false}
            className="mb-4 h-auto w-[min(220px,58vw)] max-w-full select-none object-contain"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.02 }}
          />

          <motion.h1
            className="mb-6 max-w-[340px] text-center share-tech-bold text-[clamp(1.5rem,4.8vw,1.9rem)] leading-tight text-[#ff3a00]"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            {isEditView ? "Edit party" : "Add a party"}
          </motion.h1>
          <motion.p
            className="mb-8 max-w-[340px] text-center share-tech-regular text-[17px] leading-snug"
            style={{ color: PAGE_INTRO_BLURB_TEXT }}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            {isEditView
              ? "Update themes, date, or what you’re bringing — then save."
              : "Fill in the details, then save — you’ll see it on your Buddy party list."}
          </motion.p>

          <motion.section
            className="flex w-full max-w-[340px] flex-col gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-label="Party information"
          >
            <h2 className="text-center share-tech-bold text-[24px] text-[#ff3a00]">Party info</h2>
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <InfoBoxFrame variant={0}>
                <label htmlFor="party-name" className="mb-2 block share-tech-regular text-[20px]">
                  Party name
                </label>
                <input
                  id="party-name"
                  type="text"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                  className="w-full border-none bg-transparent share-tech-regular text-[18px] outline-none"
                  placeholder="e.g. George's summer cookout"
                  required
                />
              </InfoBoxFrame>

              <InfoBoxFrame variant={1}>
                <label htmlFor="party-themes" className="mb-2 block share-tech-regular text-[20px]">
                  Party themes (optional)
                </label>
                <input
                  id="party-themes"
                  type="text"
                  value={partyThemes}
                  onChange={(e) => setPartyThemes(e.target.value)}
                  className="w-full border-none bg-transparent share-tech-regular text-[18px] outline-none"
                  placeholder="e.g. tropical, potluck, costume — comma-separated"
                />
              </InfoBoxFrame>

              <InfoBoxFrame variant={2}>
                <label htmlFor="party-date" className="mb-2 block share-tech-regular text-[20px]">
                  Date
                </label>
                <input
                  id="party-date"
                  type="date"
                  value={partyDate}
                  onChange={(e) => setPartyDate(e.target.value)}
                  className="w-full border-none bg-transparent share-tech-regular text-[18px] outline-none"
                  required
                />
              </InfoBoxFrame>

              <InfoBoxFrame variant={3}>
                <label htmlFor="party-address" className="mb-2 block share-tech-regular text-[20px]">
                  Address
                </label>
                <textarea
                  id="party-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="share-tech-regular text-[18px]"
                  placeholder="Street, city, or place name"
                  rows={3}
                  required
                />
              </InfoBoxFrame>

              <InfoBoxFrame variant={0}>
                <label htmlFor="party-buddy" className="mb-2 block share-tech-regular text-[20px]">
                  Buddy host
                </label>
                <select
                  id="party-buddy"
                  value={buddyId}
                  onChange={(e) => setBuddyId(e.target.value)}
                  className="share-tech-regular text-[18px]"
                  required
                >
                  {buddies.map((b) => (
                    <option key={b.id} value={b.id} className="text-[#2d2d2d]">
                      {b.name}
                    </option>
                  ))}
                </select>
              </InfoBoxFrame>

              <InfoBoxFrame variant={1}>
                <label htmlFor="party-bringing" className="mb-2 block share-tech-regular text-[20px]">
                  What are you bringing?
                </label>
                <input
                  id="party-bringing"
                  type="text"
                  value={bringing}
                  onChange={(e) => setBringing(e.target.value)}
                  className="w-full border-none bg-transparent share-tech-regular text-[18px] outline-none"
                  placeholder="Dish, drinks, games…"
                  required
                />
              </InfoBoxFrame>

              <motion.button
                type="submit"
                className="self-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50"
                whileTap={{ scale: 0.97 }}
              >
                <ChalkPillFrame
                  variant={3}
                  fillClassName="border-2 border-[#e83500]/55 bg-[#ff3a00] shadow-[0_2px_14px_rgba(255,58,0,0.28)]"
                  innerClassName="px-8 py-3"
                >
                  <span className="share-tech-regular text-[18px] text-white">
                    {isEditView ? "Save changes" : "Save party"}
                  </span>
                </ChalkPillFrame>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => navigate("/party")}
                className="self-center py-2 share-tech-bold text-[20px] text-[#ff3a00]"
                whileHover={{ opacity: 0.7 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </motion.form>
          </motion.section>
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
          src={imgPartyTopBuddy}
          draggable={false}
          className="mb-4 h-auto w-[min(220px,58vw)] max-w-full select-none object-contain"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.02 }}
        />

        <motion.h1
          className="mb-6 max-w-[340px] text-center share-tech-bold text-[clamp(1.5rem,4.8vw,1.9rem)] leading-tight text-[#ff3a00]"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          Buddy party
        </motion.h1>
        <motion.p
          className="mb-8 max-w-[340px] text-center share-tech-regular text-[17px] leading-snug"
          style={{ color: PAGE_INTRO_BLURB_TEXT }}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          Tap a party to open it, or + to plan a new one.
        </motion.p>

        <motion.section
          className="mb-2 flex w-full max-w-[340px] flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          aria-labelledby="saved-parties-heading"
        >
          <h2
            id="saved-parties-heading"
            className="text-center share-tech-bold text-[24px] text-[#ff3a00]"
          >
            Your saved parties
          </h2>

          {savedPlans.length === 0 ? (
            <InfoBoxFrame variant={1}>
              <p className="share-tech-regular text-[18px] leading-snug">
                Nothing here yet — tap + below to add party details.
              </p>
            </InfoBoxFrame>
          ) : (
            <ul className="flex list-none flex-col gap-5 p-0">
              {savedPlans.map((plan, index) => {
                const isExpanded = expandedPlanId === plan.id;
                const themeList = parsePartyThemes(plan.partyThemes);
                return (
                  <li key={plan.id} className="relative w-full">
                    <div className="relative w-full">
                      <InfoBoxFrame variant={index % 4}>
                        {isExpanded ? (
                          <>
                            <h3 className="mb-2 pr-11 share-tech-bold text-[22px]">{plan.partyName}</h3>
                            {renderThemePills(plan.id, themeList, "expanded")}
                            <p className="mb-2 share-tech-regular text-[17px] leading-snug">
                              <span className="opacity-90">When · </span>
                              {formatDisplayDate(plan.date)}
                            </p>
                            {plan.address ? (
                              <p className="mb-2 whitespace-pre-wrap break-words share-tech-regular text-[17px] leading-snug">
                                <span className="opacity-90">Where · </span>
                                {plan.address}
                              </p>
                            ) : null}
                            {plan.buddyName ? (
                              <p className="mb-2 share-tech-regular text-[17px] leading-snug">
                                <span className="opacity-90">Host · </span>
                                {plan.buddyName}
                              </p>
                            ) : null}
                            {plan.bringing ? (
                              <p className="mb-2 whitespace-pre-wrap break-words share-tech-regular text-[17px] leading-snug">
                                <span className="opacity-90">Bringing · </span>
                                {plan.bringing}
                              </p>
                            ) : null}
                            <div className="mt-4 flex flex-col items-center gap-3 border-t border-[#c42a08]/15 pt-4">
                              <motion.button
                                type="button"
                                className="border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50"
                                onClick={() => navigate(`/party/edit/${plan.id}`)}
                                whileTap={{ scale: 0.97 }}
                              >
                                <ChalkPillFrame
                                  variant={(index + 1) % 4}
                                  fillClassName="border-2 border-[#e83500]/55 bg-[#ff3a00] shadow-[0_2px_14px_rgba(255,58,0,0.28)]"
                                  innerClassName="px-7 py-2.5"
                                >
                                  <span className="share-tech-regular text-[17px] text-white">Edit</span>
                                </ChalkPillFrame>
                              </motion.button>
                              <motion.button
                                type="button"
                                onClick={() => handleDeleteParty(plan)}
                                className="flex h-6 w-6 items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#ff3a00]/50"
                                aria-label={`Remove ${plan.partyName} from saved parties`}
                                whileHover={{ scale: 1.06, opacity: 0.88 }}
                                whileTap={{ scale: 0.94 }}
                              >
                                <img
                                  alt=""
                                  src={imgRemoveParty}
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
                            onClick={() => setExpandedPlanId(plan.id)}
                          >
                            <h3 className="mb-2 share-tech-bold text-[22px]">{plan.partyName}</h3>
                            {renderThemePills(plan.id, themeList, "collapsed")}
                            <p className="mb-2 share-tech-regular text-[16px] leading-snug opacity-90">
                              <span className="opacity-90">When · </span>
                              {formatDisplayDate(plan.date)}
                            </p>
                            {plan.buddyName ? (
                              <p className="mb-2 share-tech-regular text-[16px] leading-snug opacity-90">
                                <span className="opacity-90">Host · </span>
                                {plan.buddyName}
                              </p>
                            ) : null}
                            <p
                              className="share-tech-regular text-[16px] leading-snug opacity-75"
                              style={{ color: PAGE_INTRO_BLURB_TEXT }}
                            >
                              Tap to open party
                            </p>
                          </button>
                        )}
                      </InfoBoxFrame>
                      {isExpanded ? (
                        <motion.button
                          type="button"
                          onClick={() => setExpandedPlanId(null)}
                          className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center border-0 bg-transparent p-0 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-[#ff3a00]/40"
                          aria-label="Minimize party"
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

        {buddies.length === 0 ? (
          <motion.div
            className="mt-6 flex w-full max-w-[340px] flex-col gap-6"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InfoBoxFrame variant={0}>
              <p className="share-tech-regular text-[18px] leading-snug">
                Add a buddy first so you can link a party to them.
              </p>
            </InfoBoxFrame>
            <motion.button
              type="button"
              onClick={() => navigate("/add-buddy")}
              className="w-full py-3 text-center share-tech-bold text-[20px] text-[#ff3a00]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add a buddy
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            type="button"
            onClick={goToAddParty}
            className="mt-14 size-32"
            aria-label="Add a party"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              alt=""
              className="h-full w-full object-contain"
              src={imgPartyPlus}
              draggable={false}
            />
          </motion.button>
        )}
      </motion.div>

      <Navigation />
    </div>
  );
}
