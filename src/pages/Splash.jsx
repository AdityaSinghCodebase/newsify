import { Box, Typography } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { motion } from "framer-motion";

function Splash() {
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#1E293B",
        color: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center" }}
      >
        <ArticleOutlinedIcon sx={{ fontSize: 90, color: "#94A3B8" }} />
        <Typography variant="h3" fontWeight={700}>
          Newsify
        </Typography>
        <Typography sx={{ mt: 1, color: "#94A3B8" }}>
          Your world, in one place
        </Typography>
      </motion.div>

      <Box
        sx={{
          width: 80,
          height: 4,
          bgcolor: "#334155",
          borderRadius: 2,
          mt: 8,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2 }}
          style={{ height: "100%", background: "#F8FAFC" }}
        />
      </Box>
    </Box>
  );
}

export default Splash;
