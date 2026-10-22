import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { categoryList } from "../data/categories";
import { useNavigate } from "react-router-dom";
import { useNews } from "../context/NewsContext";

function Categories() {
  const navigate = useNavigate();
  const { newCount } = useNews();
  return (
    <Box sx={{ p: 2, pb: 10 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
        Categories
      </Typography>

      <List sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {categoryList.map((category) => (
          <Paper key={category.name} variant="outlined">
            <ListItemButton
              sx={{ borderRadius: 3, py: 1.5 }}
              onClick={() => navigate(`/category/${category.name}`)}
            >
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText
                primary={category.name}
                secondary={category.description}
                slotProps={{ fontWeight: 500 }}
              />
              {newCount(category.name) > 0 && (
                <Chip
                  label={newCount(category.name)}
                  color="error"
                  size="small"
                  sx={{ mr: 1 }}
                />
              )}
              <ChevronRightIcon color="disabled" />
            </ListItemButton>
          </Paper>
        ))}
      </List>
    </Box>
  );
}

export default Categories;
