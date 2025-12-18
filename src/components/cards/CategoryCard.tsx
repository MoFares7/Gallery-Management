"use client";

import { getCategoryColor, getCategoryIcon } from "@/constants";
import { Category } from "@/types/category";
import { material } from "@/lib/material";
import { materialIcons } from "@/lib/material-icons";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { theme } from "@/theme";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <material.Tooltip title={category.description || category.name} arrow>
      <material.Paper
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
          width: "100%",
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
        <material.Box
          sx={{
            fontSize: "3rem",
            fontWeight: 700,
            mb: 1,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          {getCategoryIcon(category.name)}
        </material.Box>
        <material.Typography
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
        </material.Typography>
        {(hoveredId === category.id || isMobile) && isAbleAction && (
          <material.Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 0.5,
              zIndex: 10,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
          >
            <material.IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClickEdit?.();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClickEdit?.();
              }}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <materialIcons.edit fontSize="small" />
            </material.IconButton>
            <material.IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClickDelete?.();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClickDelete?.();
              }}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <materialIcons.delete fontSize="small" />
            </material.IconButton>
          </material.Box>
        )}
      </material.Paper>
    </material.Tooltip>
  );
}
