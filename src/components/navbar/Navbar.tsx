"use client";
import { material } from "@/lib/material";
import { materialIcons } from "@/lib/material-icons";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { theme } from "@/theme";
import { useNavigation } from "@/hooks/useNavigation";
import { useNavigationLoading } from "@/providers/NavigationLoadingProvider";

interface NavbarProps {
  onCategoriesClick?: () => void;
  onGalleryClick?: () => void;
}

export default function Navbar({}: NavbarProps) {
  const { push } = useNavigation();
  const { setNavigating } = useNavigationLoading();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const tabsList = [
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "Annotations",
      href: "/annotations",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (href: string) => {
    push(href);
    setMobileOpen(false);
  };

  const drawer = (
    <material.Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <material.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setNavigating(true)}
        >
          <material.Box
            sx={{
              width: 128,
              height: 32,
              position: "relative",
            }}
          >
            <Image
              src="/icons/logo.svg"
              alt="logo-image"
              fill
              style={{ objectFit: "contain" }}
            />
          </material.Box>
        </Link>
        <material.IconButton onClick={handleDrawerToggle}>
          <materialIcons.close />
        </material.IconButton>
      </material.Box>
      <material.Divider />
      <material.List>
        {tabsList.map((tab) => (
          <material.ListItem key={tab.label} disablePadding>
            <material.ListItemButton
              onClick={() => handleNavigation(tab.href)}
              sx={{
                textAlign: "center",
                py: 2,
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <material.ListItemText
                primary={tab.label}
                primaryTypographyProps={{
                  variant: "body1",
                  color: "text.primary",
                }}
              />
            </material.ListItemButton>
          </material.ListItem>
        ))}
      </material.List>
    </material.Box>
  );

  return (
    <material.AppBar
      position={isMobile ? "static" : "fixed"}
      sx={{
        zIndex: 1300,
        top: 0,
        backgroundColor: "background.paper",
        color: "text.primary",
        boxShadow: 1,
      }}
    >
      <material.Toolbar
        sx={{
          maxWidth: "xl",
          mx: "auto",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => setNavigating(true)}
        >
          <material.Box
            sx={{
              width: { xs: 128, md: 320, lg: 400 },
              height: 32,
              position: "relative",
            }}
          >
            <Image
              src="/icons/logo.svg"
              alt="logo-image"
              fill
              style={{ objectFit: "contain" }}
            />
          </material.Box>
        </Link>
        <material.Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {tabsList.map((tab) => (
            <material.Typography
              key={tab.label}
              variant="body2"
              onClick={() => push(tab.href)}
              sx={{
                color: "text.secondary",
                cursor: "pointer",
                "&:hover": { color: "primary.main" },
                display: { xs: "none", md: "block" },
                transition: "color 0.2s ease",
              }}
            >
              {tab.label}
            </material.Typography>
          ))}
          <material.IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <materialIcons.menu />
          </material.IconButton>
        </material.Box>
      </material.Toolbar>
      <material.Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
          },
        }}
      >
        {drawer}
      </material.Drawer>
    </material.AppBar>
  );
}
