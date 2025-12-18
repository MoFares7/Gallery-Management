import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface PageHeaderProps {
  title: string;
  onClick: () => void;
  buttonText: string;
}
export default function PageHeader({ title, onClick, buttonText }: PageHeaderProps) {
  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onClick}
        sx={{
          backgroundColor: "error.main",
          borderRadius: 2,
          textTransform: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: "error.dark",
          },
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}
