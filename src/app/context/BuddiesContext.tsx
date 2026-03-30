import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import buddyPurple from "figma:asset/7fbb6811c7bb5f0ccf991ccd88167e933efb6a2a.png";
import buddyCyan from "figma:asset/1788e9dab05014099e5553e0607b2394a8cf3559.png";
import buddyYellow from "figma:asset/8ed007d7565f7174675413aae173d3d13e3678cb.png";
import buddyGreen from "figma:asset/6e9c42fb806d13ec709f3b10819eeb3ede308c82.png";
import buddyRed from "figma:asset/0b10c299d69c6690abfb59a6717823ffa51da520.png";
import buddyOrange from "figma:asset/c9c2d9aab4edc4242272e58890847fcaa02cc29a.png";
import buddyPurpleSmile from "figma:asset/4fea40f43adaaeb641f6a5596c8ae08017172ac7.png";
import buddyCyanSmile from "figma:asset/c4d2a6f781e0b8b857879302485470815338d05d.png";
import buddyYellowSmile from "figma:asset/19e946e3a9de4a2b52a9b0a6a059662f94c3a77a.png";
import buddyGreenSmile from "figma:asset/119b3f6dc08e71e7df8ddffc19a2567defd5fd4d.png";
import buddyRedSmile from "figma:asset/a6b57685d895d4c69078515f5637d43697a298ee.png";
import buddyOrangeSmile from "figma:asset/0c67afb45f6cddc1128cd0426f7adde9276d7914.png";
import circlePurple from "figma:asset/8c0e73a9d55b75fff0ddffd75eebc99c2431fe57.png";
import circleGreen from "figma:asset/e4486b6e6dd3dd882c49565b1390aec8a672b4c3.png";
import circleYellow from "figma:asset/2ac57b9d16f8491582fddc94d0ccdde38b55adac.png";
import circleCyan from "figma:asset/f7f2808e38d119f7d684db9b24fbaedf8ac263ed.png";
import circleRed from "figma:asset/c5af9d52d5bae857ee1bbfb7e8de82e0b912f66c.png";
import circleOrange from "figma:asset/7b41c928b341b03974c3bd30409f67f38af56722.png";

export interface Buddy {
  id: string;
  name: string;
  buddyImage: string;
  smilingImage: string;
  circleImage: string;
  backgroundColor: string;
  favoriteFood?: string;
  personality?: string;
  specialty?: string;
  partiesAttended?: number;
  recipesGiven?: string;
}

interface BuddiesContextType {
  buddies: Buddy[];
  addBuddy: (buddy: Omit<Buddy, "id" | "buddyImage" | "smilingImage" | "circleImage" | "backgroundColor">) => void;
  removeBuddy: (id: string) => void;
  getBuddyById: (id: string) => Buddy | undefined;
}

const BuddiesContext = createContext<BuddiesContextType | undefined>(undefined);

const buddyImages = [buddyPurple, buddyCyan, buddyYellow, buddyGreen, buddyRed, buddyOrange];
const buddySmilingImages = [buddyPurpleSmile, buddyCyanSmile, buddyYellowSmile, buddyGreenSmile, buddyRedSmile, buddyOrangeSmile];
const circleImages = [circlePurple, circleGreen, circleYellow, circleCyan, circleRed, circleOrange];
const backgroundColors = ["#b19cd9", "#7dd3d3", "#ffd966", "#93c47d", "#ea9999", "#f6b26b"];

const initialBuddies: Buddy[] = [
  {
    id: "bip",
    name: "Bip",
    buddyImage: buddyPurple,
    smilingImage: buddyPurpleSmile,
    circleImage: circleYellow,
    backgroundColor: "#b19cd9",
    favoriteFood: "Blueberry pancakes",
    personality: "Cheerful and energetic",
    specialty: "Breakfast dishes"
  },
  {
    id: "bop",
    name: "Bop",
    buddyImage: buddyCyan,
    smilingImage: buddyCyanSmile,
    circleImage: circleOrange,
    backgroundColor: "#7dd3d3",
    favoriteFood: "Seafood pasta",
    personality: "Calm and collected",
    specialty: "Seafood cuisine"
  },
  {
    id: "george",
    name: "George",
    buddyImage: buddyYellow,
    smilingImage: buddyYellowSmile,
    circleImage: circlePurple,
    backgroundColor: "#ffd966",
    favoriteFood: "Lemon tart",
    personality: "Creative and curious",
    specialty: "Desserts & pastries"
  },
  {
    id: "redbud",
    name: "Red Bud",
    buddyImage: buddyGreen,
    smilingImage: buddyGreenSmile,
    circleImage: circleCyan,
    backgroundColor: "#93c47d",
    favoriteFood: "Fresh salads",
    personality: "Health-conscious and wise",
    specialty: "Healthy cooking"
  },
  {
    id: "gabby",
    name: "Gabby",
    buddyImage: buddyRed,
    smilingImage: buddyRedSmile,
    circleImage: circleGreen,
    backgroundColor: "#ea9999",
    favoriteFood: "Spicy tacos",
    personality: "Bold and adventurous",
    specialty: "Spicy dishes"
  },
  {
    id: "madi",
    name: "Madi",
    buddyImage: buddyOrange,
    smilingImage: buddyOrangeSmile,
    circleImage: circlePurple,
    backgroundColor: "#f6b26b",
    favoriteFood: "Pumpkin soup",
    personality: "Warm and friendly",
    specialty: "Comfort food"
  },
  {
    id: "riley",
    name: "Riley",
    buddyImage: buddyYellow,
    smilingImage: buddyYellowSmile,
    circleImage: circleGreen,
    backgroundColor: "#ffd966",
    favoriteFood: "Banana bread",
    personality: "Sweet and caring",
    specialty: "Baked goods"
  }
];

export function BuddiesProvider({ children }: { children: ReactNode }) {
  const [buddies, setBuddies] = useState<Buddy[]>(() => {
    const saved = localStorage.getItem('tasteBuddyBuddies');
    return saved ? JSON.parse(saved) : initialBuddies;
  });

  useEffect(() => {
    localStorage.setItem('tasteBuddyBuddies', JSON.stringify(buddies));
  }, [buddies]);

  const addBuddy = (newBuddy: Omit<Buddy, "id" | "buddyImage" | "smilingImage" | "circleImage" | "backgroundColor">) => {
    const randomIndex = Math.floor(Math.random() * buddyImages.length);
    const circleIndex = Math.floor(Math.random() * circleImages.length);
    
    const buddy: Buddy = {
      ...newBuddy,
      id: `buddy-${Date.now()}`,
      buddyImage: buddyImages[randomIndex],
      smilingImage: buddySmilingImages[randomIndex],
      circleImage: circleImages[circleIndex],
      backgroundColor: backgroundColors[randomIndex]
    };

    setBuddies([...buddies, buddy]);
  };

  const removeBuddy = (id: string) => {
    setBuddies(buddies.filter(buddy => buddy.id !== id));
  };

  const getBuddyById = (id: string) => {
    return buddies.find(buddy => buddy.id === id);
  };

  return (
    <BuddiesContext.Provider value={{ buddies, addBuddy, removeBuddy, getBuddyById }}>
      {children}
    </BuddiesContext.Provider>
  );
}

export function useBuddies() {
  const context = useContext(BuddiesContext);
  if (!context) {
    throw new Error("useBuddies must be used within BuddiesProvider");
  }
  return context;
}