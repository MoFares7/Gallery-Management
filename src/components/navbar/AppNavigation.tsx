"use client";
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/navigation";

interface AppNavigationProps {
  onCategoriesClick?: () => void;
  onGalleryClick?: () => void;
}

export default function AppNavigation({}: AppNavigationProps) {
  const router = useRouter();

  const handleGalleryClick = () => {
    router.push("/gallary");
  };

  const handleCategoriesClick = () => {
    router.push("/categories");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,
        top: 0,
        backgroundColor: "white",
        color: "#333",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Toolbar sx={{ maxWidth: "xl", mx: "auto", width: "100%" }}>
        <Avatar
          sx={{
            bgcolor: "#1976d2",
            mr: 2,
            width: 32,
            height: 32,
          }}
        >
          <ImageIcon fontSize="small" />
        </Avatar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "#333",
          }}
        >
          Averroes
        </Typography>
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Typography
            variant="body2"
            onClick={handleGalleryClick}
            sx={{
              color: "#666",
              cursor: "pointer",
              "&:hover": { color: "#1976d2" },
              display: { xs: "none", md: "block" },
              transition: "color 0.2s ease",
            }}
          >
            Gallery
          </Typography>
          <Typography
            variant="body2"
            onClick={handleCategoriesClick}
            sx={{
              color: "#666",
              cursor: "pointer",
              "&:hover": { color: "#1976d2" },
              display: { xs: "none", md: "block" },
              transition: "color 0.2s ease",
            }}
          >
            Categories
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
