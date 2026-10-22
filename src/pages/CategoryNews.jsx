import { useState, useEffect } from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import { useNews } from "../context/NewsContext";
import { isToday, isYesterday } from "../utils/dateHelpers";

const filters = ["Recent", "Today", "Yesterday"];

function CategoryNews() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { news, markSeen } = useNews();
  const [filter, setFilter] = useState("Recent");

  useEffect(() => {
    markSeen(name);
  }, [name]);

  const articles = news
    .filter((article) => article.category === name)
    .filter((article) => {
      if (filter === "Today") return isToday(article.publishedAt);
      if (filter === "Yesterday") return isYesterday(article.publishedAt);
      return true;
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <Box sx={{ pb: 10 }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700} sx={{ ml: 1 }}>
          {name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1, px: 2, py: 1 }}>
        {filters.map((item) => (
          <Chip
            key={item}
            label={item}
            color="primary"
            variant={filter === item ? "filled" : "outlined"}
            onClick={() => setFilter(item)}
          />
        ))}
      </Box>

      {articles.length === 0 ? (
        <Typography color="text.secondary" sx={{ p: 3, textAlign: "center" }}>
          No news here yet.
        </Typography>
      ) : (
        articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))
      )}
    </Box>
  );
}

export default CategoryNews;
