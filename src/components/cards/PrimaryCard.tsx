"use client";
import { material } from "@/lib/material";
import { materialIcons } from "@/lib/material-icons";
import { useNavigation } from "@/hooks/useNavigation";

interface PrimaryCardProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

export default function PrimaryCard({
  title,
  href,
  children,
}: PrimaryCardProps) {
  const { push } = useNavigation();
  return (
    <material.Box
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "background.paper",
        boxShadow: 2,
        border: "1px solid",
        borderColor: "divider",
        scrollMarginTop: "80px",
      }}
    >
      <material.Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <material.Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          {title}
        </material.Typography>
        <material.Button
          variant="outlined"
          endIcon={<materialIcons.arrowForward />}
          onClick={() => push(href)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "error.main",
            borderColor: "error.main",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: (theme) => theme.palette.error.main + "10",
            },
          }}
        >
          View All
        </material.Button>
      </material.Box>
      {children}
    </material.Box>
  );
}
