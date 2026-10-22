import { CssBaseline, Typography, ThemeProvider } from "@mui/material";
import { getTheme } from "./theme/theme";
import Splash from "./pages/Splash";

function App() {
  return (
    <>
      <ThemeProvider theme={getTheme("light")}>
        <CssBaseline />
        <Splash />
      </ThemeProvider>
    </>
  );
}

export default App;
