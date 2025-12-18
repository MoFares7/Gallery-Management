"use client";
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AppNavigationProps {
  onCategoriesClick?: () => void;
  onGalleryClick?: () => void;
}

export default function AppNavigation({}: AppNavigationProps) {
  const router = useRouter();

  const handleGalleryClick = () => {
    router.push("/gallery");
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
        backgroundColor: "background.paper",
        color: "text.primary",
        boxShadow: 1,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "xl",
          mx: "auto",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Link href="/home" style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
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
              color: "text.primary",
            }}
          >
            Averroes
          </Typography>
        </Link>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Typography
            variant="body2"
            onClick={handleGalleryClick}
            sx={{
              color: "text.secondary",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
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
              color: "text.secondary",
              cursor: "pointer",
              "&:hover": { color: "primary.main" },
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
