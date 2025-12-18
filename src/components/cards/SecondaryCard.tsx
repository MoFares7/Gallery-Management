"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { Image } from "@/types/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

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

  return (
    <Card
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
      <CardMedia
        component="img"
        image={image?.url}
        alt={image?.name}
        sx={{
          height: 200,
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
          }}
          noWrap
        >
          {image.name}
        </Typography>
        {image?.metadata?.resolution && (
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            {image?.metadata?.resolution}
          </Typography>
        )}
      </CardContent>

      {hovered && isAbleAction && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 0.5,
          }}
        >
          {onClickEdit && (
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickEdit();
                }}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {onClickDelete && (
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onClickDelete();
                }}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "error.main",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Card>
  );
}
