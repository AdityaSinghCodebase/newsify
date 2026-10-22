import { Box, Typography, Chip, IconButton, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate, useParams } from "react-router-dom";
import { useNews } from "../context/NewsContext";
import { timeAgo } from "../utils/dateHelpers";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useSaved } from "../context/SavedContext";

const sampleText = "Description is not given in this article.";

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useSaved();
  const { news, loading } = useNews();

  const article = news.find((item) => String(item.id) === id);

  if (!article) {
    return (
      <Typography sx={{ p: 3 }}>
        {loading ? "Loading..." : "Article not found."}
      </Typography>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      <Box
        sx={{
          height: 260,
          backgroundImage: `url(${article.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          p: 1,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ bgcolor: "rgba(0,0,0,0.4)", color: "#fff" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => toggleSave(article)}
            sx={{ bgcolor: "rgba(0,0,0,0.4)", color: "#fff" }}
          >
            {isSaved(article.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton sx={{ bgcolor: "rgba(0,0,0,0.4)", color: "#fff" }}>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <Chip label={article.category} size="small" sx={{ mb: 1.5 }} />

        <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.3 }}>
          {article.title}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {article.source} • {timeAgo(article.publishedAt)}
        </Typography>

        <Typography sx={{ mt: 2, lineHeight: 1.8 }}>
          {" "}
          {article.description ||
            "This feed only shares the headline. Tap the button below to read the full story."}
        </Typography>

        {article.link && (
          <Button
            variant="outlined"
            href={article.link}
            target="_blank"
            rel="noreferrer"
            sx={{ mt: 3 }}
          >
            Read full article
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Article;
