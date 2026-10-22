import { useState } from "react";
import { Box, Chip, LinearProgress } from "@mui/material";
import Header from "../components/Header";
import TopStoryCard from "../components/TopStoryCard";
import NewsCard from "../components/NewsCard";
import { useNews } from "../context/NewsContext";

const categories = ["For You", "Education", "Science", "Tech", "Agriculture"];

function Home() {
  const { news, loading } = useNews();
  const [selected, setSelected] = useState("For You");

  const filtered =
    selected === "For You"
      ? news
      : news.filter((article) => article.category === selected);

  const topStory = filtered[0];
  const others = filtered.slice(1);

  return (
    <Box sx={{ pb: 10 }}>
      <Header />
      {loading && <LinearProgress />}

      <Box
        sx={{
          display: "flex",
          gap: 1,
          px: 2,
          py: 1.5,
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((name) => (
          <Chip
            key={name}
            label={name}
            color="primary"
            variant={selected === name ? "filled" : "outlined"}
            onClick={() => setSelected(name)}
          />
        ))}
      </Box>

      {topStory && <TopStoryCard article={topStory} />}

      {others.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </Box>
  );
}

export default Home;
