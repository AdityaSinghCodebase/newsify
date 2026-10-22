import { Box, Typography, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { timeAgo } from "../utils/dateHelpers";
import { useNavigate } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useSaved } from "../context/SavedContext";

function NewsCard({ article }) {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSaved();
  return (
    <Box
      onClick={() => navigate(`/article/${article.id}`)}
      sx={{ display: "flex", gap: 2, px: 2, py: 1.5, cursor: "pointer" }}
    >
      <Box
        component="img"
        src={article.image}
        alt=""
        sx={{ width: 90, height: 90, objectFit: "cover", borderRadius: 1 }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography fontWeight={500} sx={{ lineHeight: 1.3 }}>
          {article.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {article.source} • {timeAgo(article.publishedAt)}
        </Typography>
      </Box>
      <IconButton
        sx={{ alignSelf: "flex-start" }}
        onClick={(event) => {
          event.stopPropagation();
          toggleSave(article);
        }}
      >
        {isSaved(article.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Box>
  );
}

export default NewsCard;
