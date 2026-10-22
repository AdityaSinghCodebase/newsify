import { Box, Typography, Chip } from "@mui/material";
import { timeAgo } from "../utils/dateHelpers";
import { useNavigate } from "react-router-dom";

function TopStoryCard({ article }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        height: 220,
        mx: 2,
        borderRadius: 1,
        overflow: "hidden",
        backgroundImage: `url(${article.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(15,23,42,0.9), rgba(15,23,42,0.1))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
          color: "#fff",
        }}
      >
        <Chip
          label="Top Story"
          size="small"
          sx={{
            alignSelf: "flex-start",
            mb: 1,
            bgcolor: "rgba(255,255,255,0.2)",
            color: "#fff",
          }}
        />
        <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.3 }}>
          {article.title}
        </Typography>
        <Typography variant="caption">
          {article.source} • {timeAgo(article.publishedAt)}
        </Typography>
      </Box>
    </Box>
  );
}

export default TopStoryCard;
