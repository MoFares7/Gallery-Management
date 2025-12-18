import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid rgb(230, 230, 233)",
        scrollMarginTop: "80px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 600, color: "#333" }}
        >
          {title}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={() => router.push(href)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "#667eea",
            borderColor: "#667eea",
          }}
        >
          View All
        </Button>
      </Box>
      {children}
    </Box>
  );
}
