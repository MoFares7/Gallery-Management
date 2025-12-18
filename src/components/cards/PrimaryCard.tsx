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
        backgroundColor: "background.paper",
        boxShadow: 2,
        border: "1px solid",
        borderColor: "divider",
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
          sx={{ fontWeight: 600, color: "text.primary" }}
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
            color: "error.main",
            borderColor: "error.main",
            "&:hover": {
              borderColor: "error.dark",
              backgroundColor: (theme) => theme.palette.error.main + "10",
            },
          }}
        >
          View All
        </Button>
      </Box>
      {children}
    </Box>
  );
}
