"use client";

import { useNavigationLoading } from "@/providers/NavigationLoadingProvider";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import { material } from "@/lib/material";

export default function NavigationLoader() {
  const { isNavigating } = useNavigationLoading();

  if (!isNavigating) return null;

  return (
    <material.Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <material.Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          p: 4,
        }}
      >
        <HandleStatusSection type="loading" />
      </material.Box>
    </material.Box>
  );
}
