import { createBrowserRouter } from "react-router";
import StartScreenPage from "./pages/StartScreenPage";
import TextInPage from "./pages/TextInPage";
import HomePage from "./pages/HomePage";
import BuddiesPage from "./pages/BuddiesPage";
import BuddyInfoPage from "./pages/BuddyInfoPage";
import AddBuddyPage from "./pages/AddBuddyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: StartScreenPage,
  },
  {
    path: "/welcome",
    Component: TextInPage,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/buddies",
    Component: BuddiesPage,
  },
  {
    path: "/buddy/:buddyId",
    Component: BuddyInfoPage,
  },
  {
    path: "/add-buddy",
    Component: AddBuddyPage,
  },
]);