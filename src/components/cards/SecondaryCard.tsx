"use client";

import { material } from "@/lib/material";
import { materialIcons } from "@/lib/material-icons";
import { Image } from "@/types/image";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { theme } from "@/theme";

interface SecondaryCardProps {
  image: Image;
  onClick: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  isAbleAction?: boolean;
}

export default function SecondaryCard({
  image,
  onClick,
  onClickEdit,
  onClickDelete,
  isAbleAction = false,
}: SecondaryCardProps) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <material.Card
      sx={{
        height: "100%",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <material.CardMedia
        component="img"
        image={image?.url}
        alt={image?.name}
        sx={{
          height: 200,
          objectFit: "cover",
        }}
      />
      <material.CardContent>
        <material.Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
          }}
          noWrap
        >
          {image?.name}
        </material.Typography>
        {image?.metadata?.resolution && (
          <material.Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            {image?.metadata?.resolution}
          </material.Typography>
        )}
      </material.CardContent>

      {(hovered || isMobile) && isAbleAction && (
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
          {onClickEdit && (
            <material.Tooltip title="Edit">
              <material.IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClickEdit();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClickEdit();
                }}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                }}
              >
                <materialIcons.edit fontSize="small" />
              </material.IconButton>
            </material.Tooltip>
          )}
          {onClickDelete && (
            <material.Tooltip title="Delete">
              <material.IconButton
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClickDelete();
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClickDelete();
                }}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "error.main",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                }}
              >
                <materialIcons.delete fontSize="small" />
              </material.IconButton>
            </material.Tooltip>
          )}
        </material.Box>
      )}
    </material.Card>
  );
}
