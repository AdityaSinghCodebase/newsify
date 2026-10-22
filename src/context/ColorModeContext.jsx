import { createContext, useContext } from "react";

export const ColorModeContext = createContext();

export function useColorMode() {
  return useContext(ColorModeContext);
}
