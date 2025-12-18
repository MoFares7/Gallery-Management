import { Button, CircularProgress } from "@mui/material";

interface PrimaryButtonProps {
  onClick: () => void;
  buttonText: string;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  variant?: "contained" | "outlined";
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}
export default function PrimaryButton({
  onClick,
  buttonText,
  startIcon,
  disabled,
  loading,
  variant = "contained",
  backgroundColor = "error.main",
  hoverBackgroundColor = "error.dark",
}: PrimaryButtonProps) {
  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: 1,
        textTransform: "none",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        "&:hover": {
          backgroundColor: hoverBackgroundColor,
        },
      }}
    >
      {loading ? <CircularProgress size={16} color="inherit" /> : buttonText}
    </Button>
  );
}
