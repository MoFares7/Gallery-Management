"use client";
import { material } from "@/lib/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  onCategoriesClick?: () => void;
  onGalleryClick?: () => void;
}

export default function Navbar({}: NavbarProps) {
  const router = useRouter();

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

  return (
    <material.AppBar
      position="fixed"
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
        <Link href="/home" style={{ display: "flex", alignItems: "center" }}>
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
              onClick={() => router.push(tab.href)}
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
        </material.Box>
      </material.Toolbar>
    </material.AppBar>
  );
}
