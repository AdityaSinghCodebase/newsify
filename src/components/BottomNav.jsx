import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", md: "none" },
      }}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Explore"
          value="/explore"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          label="Categories"
          value="/categories"
          icon={<CategoryOutlinedIcon />}
        />
        <BottomNavigationAction
          label="Saved"
          value="/saved"
          icon={<BookmarkBorderIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          value="/settings"
          icon={<SettingsOutlinedIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
