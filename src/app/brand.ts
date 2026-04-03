/** Shared light orange ombre + layout padding for every screen */
export const PAGE_GRADIENT =
  "min-h-screen w-full min-w-0 bg-gradient-to-b from-[#ffc8a8] via-[#ffd5bc] to-[#ffe8d4]";

export const PAGE_HORIZONTAL_PAD = "px-6";

/** Coral panel default text + headings — same neutral gray as field values */
export const INFO_PANEL_TEXT = "#2d2d2d";

/** Typed values in coral info fields — neutral gray */
export const INFO_PANEL_INPUT_TEXT = "#2d2d2d";

/** Intro / subtitle under page titles & second line on welcome screens — lighter than body copy on panels for header contrast */
export const PAGE_INTRO_BLURB_TEXT = "#5a5a5a";

/** Start + welcome screens: shared buddy sizing so route changes don’t move the character */
export const INTRO_BUDDY_IMG_CLASS =
  "max-h-[min(380px,48vh)] w-auto max-w-[min(280px,78vw)] object-contain object-bottom select-none";

/** /welcome: scale HOME-sized asset up to intro visual size, then animate to 1 (matches /home layoutId) */
export const WELCOME_MASCOT_INITIAL_SCALE = 380 / 240;

/** Home hub mascot — matches end state of welcome → home layout morph */
export const HOME_BUDDY_IMG_CLASS =
  "h-auto max-h-[min(240px,38vh)] w-[min(200px,58vw)] max-w-full object-contain object-bottom select-none";

/** Main content area below GrayTasteHeader — matches start/welcome vertical centering */
export const INTRO_MAIN_LAYOUT_CLASS =
  "flex flex-1 flex-col items-center justify-center pb-16";

/** Shared stack under header: home hub + welcome screen (text then mascot, same measure) */
export const HOME_HERO_STACK_CLASS =
  "flex flex-1 flex-col items-center justify-center gap-8 text-center";

/** Two-line hero headline (regular weight) — add text-[#ff3a00] on each screen */
export const HOME_HERO_HEADLINE_CLASS =
  "share-tech-regular max-w-lg px-2 text-[clamp(1.65rem,5.8vw,2.15rem)] leading-snug";

/** motion `layoutId` for the orange mascot across start / welcome / home */
export const MASCOT_SHARED_LAYOUT_ID = "tastebuddy-main-mascot";
