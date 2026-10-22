import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Switch,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

function Settings({ mode, setMode }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Settings
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        App Preferences
      </Typography>

      <Paper variant="outlined">
        <List>
          <ListItem
            secondaryAction={
              <Switch
                checked={mode === "dark"}
                onChange={(event) =>
                  setMode(event.target.checked ? "dark" : "light")
                }
              />
            }
          >
            <ListItemIcon>
              <DarkModeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dark Mode" />
          </ListItem>
        </List>
      </Paper>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mt: 3, mb: 1 }}
      >
        RSS Feeds
      </Typography>

      <Paper variant="outlined">
        <List>
          <ListItemButton onClick={() => navigate("/feeds")}>
            <ListItemIcon>
              <RssFeedIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Feeds" />
            <ChevronRightIcon color="disabled" />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
}

export default Settings;
