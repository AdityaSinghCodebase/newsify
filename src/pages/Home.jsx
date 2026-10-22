import { useState } from "react";
import { Box, Chip, LinearProgress, Badge } from "@mui/material";
import Header from "../components/Header";
import TopStoryCard from "../components/TopStoryCard";
import NewsCard from "../components/NewsCard";
import { useNews } from "../context/NewsContext";

const categories = ["For You", "Education", "Science", "Tech", "Agriculture"];

function Home() {
  const { news, loading, newCount, markSeen } = useNews();
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
          <Badge
            key={name}
            badgeContent={name === "For You" ? 0 : newCount(name)}
            color="error"
            max={99}
            sx={{ mr: 0.5 }}
          >
            <Chip
              label={name}
              color="primary"
              variant={selected === name ? "filled" : "outlined"}
              onClick={() => {
                setSelected(name);
                if (name !== "For You") markSeen(name);
              }}
            />
          </Badge>
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
