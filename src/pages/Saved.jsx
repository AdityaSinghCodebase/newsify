import { Box, Typography } from "@mui/material";
import NewsCard from "../components/NewsCard";
import { useSaved } from "../context/SavedContext";
import { categoryList } from "../data/categories";

function Saved() {
  const { saved } = useSaved();

  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Saved Articles
      </Typography>

      {saved.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
          Nothing saved yet. Tap the bookmark on any article to save it.
        </Typography>
      )}

      {categoryList.map((category) => {
        const items = saved.filter(
          (article) => article.category === category.name,
        );
        if (items.length === 0) return null;

        return (
          <Box key={category.name} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} color="primary">
              {category.name} ({items.length})
            </Typography>
            {items.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </Box>
        );
      })}
    </Box>
  );
}

export default Saved;
