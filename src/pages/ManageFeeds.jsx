import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useFeeds } from "../context/FeedContext";
import { categoryList } from "../data/categories";

function ManageFeeds() {
  const navigate = useNavigate();
  const { feeds, addFeed, removeFeed } = useFeeds();

  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Science");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const cleanUrl = url.trim();

    try {
      const parsed = new URL(cleanUrl);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error("bad protocol");
      }
    } catch {
      setError("Please enter a valid link starting with http:// or https://");
      return;
    }

    if (feeds.some((feed) => feed.url === cleanUrl)) {
      setError("This feed is already added.");
      return;
    }

    addFeed(cleanUrl, category);
    setUrl("");
    setError("");
  };

  return (
    <Box sx={{ pb: 10 }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700} sx={{ ml: 1 }}>
          Manage Feeds
        </Typography>
      </Box>

      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="RSS feed link"
          placeholder="https://example.com/rss"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          fullWidth
        >
          {categoryList.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        {error && <Alert severity="error">{error}</Alert>}

        <Button variant="contained" onClick={handleAdd}>
          Add Feed
        </Button>
      </Box>

      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ px: 2, mb: 1 }}
      >
        Your Feeds ({feeds.length})
      </Typography>

      {feeds.length === 0 ? (
        <Typography color="text.secondary" sx={{ px: 2 }}>
          No feeds added yet.
        </Typography>
      ) : (
        <Paper variant="outlined" sx={{ mx: 2 }}>
          <List>
            {feeds.map((feed) => (
              <ListItem
                key={feed.id}
                secondaryAction={
                  <IconButton onClick={() => removeFeed(feed.id)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={feed.url}
                  secondary={feed.category}
                  slotProps={{ primary: { noWrap: true } }}
                  sx={{ pr: 4 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default ManageFeeds;
