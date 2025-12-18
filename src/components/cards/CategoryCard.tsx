import { getCategoryColor, getCategoryIcon } from "@/constants";
import { Category } from "@/types/category";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  isAbleAction?: boolean;
}
export default function CategoryCard({
  category,
  onClick,
  onClickEdit,
  onClickDelete,
  isAbleAction = false,
}: CategoryCardProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  return (
    <Tooltip title={category.description || category.name} arrow>
      <Paper
        elevation={hoveredId === category.id ? 8 : 2}
        sx={{
          p: 3,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
          borderRadius: 3,
          backgroundColor: getCategoryColor(category.id),
          color: "white",
          position: "relative",
          minHeight: 140,
          width: { xs: 320, sm: 220, md: 220, lg: 220 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          },
        }}
        onMouseEnter={() => setHoveredId(category.id)}
        onMouseLeave={() => setHoveredId(null)}
        onClick={onClick}
      >
        <Box
          sx={{
            fontSize: "3rem",
            fontWeight: 700,
            mb: 1,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {getCategoryIcon(category.name)}
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            fontSize: "0.875rem",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            opacity: 0.95,
          }}
          noWrap
        >
          {category.name}
        </Typography>
        {hoveredId && isAbleAction && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 0.5,
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onClickEdit?.();
              }}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onClickDelete?.();
              }}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Paper>
    </Tooltip>
  );
}
