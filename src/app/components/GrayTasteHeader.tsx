import imgTasteBuddyLogo from "@project-assets/trans-orange.png";

/** Same size/position everywhere — centered above page content */
export default function GrayTasteHeader() {
  return (
    <header className="flex w-full shrink-0 justify-center pt-8 pb-6">
      <img
        src={imgTasteBuddyLogo}
        alt="taste buddy"
        className="h-auto w-[min(300px,88vw)] max-w-full object-contain"
        draggable={false}
      />
    </header>
  );
}
