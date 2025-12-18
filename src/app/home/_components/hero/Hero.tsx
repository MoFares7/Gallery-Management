import { material } from "@/lib/material";

export default function Hero() {
  return (
    <material.Box
      sx={{
        textAlign: "center",
        background: (theme) =>
          `linear-gradient(135deg, ${theme?.palette?.error?.main} 0%, ${theme?.palette?.error?.dark} 100%)`,
        borderRadius: 4,
        p: 6,
        color: "white",
        boxShadow: 3,
      }}
    >
      <material.Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: "2rem", md: "3rem" },
        }}
      >
        Daily hit of interactive design and showcase of{" "}
        <material.Box
          component="span"
          sx={{ color: (theme) => theme?.palette?.error?.light }}
        >
          creativity
        </material.Box>
      </material.Typography>
      <material.Typography
        variant="h4"
        sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}
      >
        We proudly highlight one brilliant interactive project each day.
      </material.Typography>
    </material.Box>
  );
}
