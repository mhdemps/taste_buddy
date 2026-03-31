import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import buddyPurple from "@project-assets/purple buddy.png";
import buddyCyan from "@project-assets/blue buddy.png";
import buddyYellow from "@project-assets/yellow buddy.png";
import buddyGreen from "@project-assets/green buddy.png";
import buddyRed from "@project-assets/red buddy.png";
import buddyOrange from "@project-assets/orange buddy.png";
import buddyPurpleSmile from "@project-assets/purple buddy smile.png";
import buddyCyanSmile from "@project-assets/blue buddy smile.png";
import buddyYellowSmile from "@project-assets/yellow buddy smile.png";
import buddyGreenSmile from "@project-assets/green buddy smile.png";
import buddyRedSmile from "@project-assets/red buddy smile.png";
import buddyOrangeSmile from "@project-assets/orange buddy smile.png";
import circlePurple from "@project-assets/button.png";
import circleGreen from "@project-assets/button 2.png";
import circleYellow from "@project-assets/button 3.png";
import circleCyan from "@project-assets/button 4.png";
import circleRed from "@project-assets/box 3.png";
import circleOrange from "@project-assets/box 4.png";

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
