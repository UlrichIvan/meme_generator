import { createContext } from "react";
export const memesContextValue = {
  memes: [],
  setMemes: () => [],
};
export const memesContext = createContext(memesContextValue);
