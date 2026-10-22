import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useColorMode } from "../context/ColorModeContext";
import { useNavigate } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import { categoryList } from "../data/categories";

function Header() {
  const navigate = useNavigate();
  const { mode, setMode } = useColorMode();
  const { newCount } = useNews();
  const totalNew = categoryList.reduce(
    (sum, category) => sum + newCount(category.name),
    0,
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: { xs: "background.paper", md: "background.default" },
        color: "text.primary",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ ml: 1, display: { xs: "block", md: "none" } }}
        >
          Newsify
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton color="inherit" onClick={() => navigate("/explore")}>
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate("/categories")}>
          <Badge badgeContent={totalNew} color="error" max={99}>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
