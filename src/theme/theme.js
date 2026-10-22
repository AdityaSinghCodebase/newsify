import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1E293B" : "#94A3B8",
      },
      background: {
        default: mode === "light" ? "#F8FAFC" : "#0F172A",
        paper: mode === "light" ? "#FFFFFF" : "#1E293B",
      },
    },
    shape: { borderRadius: 7 },
  });
