import { material } from "@/lib/material";
import { materialIcons } from "@/lib/material-icons";
import PrimaryButton from "../buttons/PrimaryButton";

interface PageHeaderProps {
  title: string;
  onClick: () => void;
  buttonText: string;
  isHasFilters?: boolean;
  onFiltersClick?: () => void;
}
export default function PageHeader({
  title,
  onClick,
  buttonText,
  isHasFilters = false,
  onFiltersClick,
}: PageHeaderProps) {
  return (
    <material.Box
      sx={{
        mb: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        backgroundColor: "background.paper",
        padding: 4,
        borderRadius: 2,
        border: "2px solid",
        borderColor: "background.light",
      }}
    >
      <material.Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 700, color: "text.primary" }}
      >
        {title}
      </material.Typography>
      <material.Box sx={{ display: "flex", gap: 2 }}>
        <PrimaryButton
          onClick={onClick}
          buttonText={buttonText}
          startIcon={<materialIcons.add />}
        />
        {isHasFilters && (
          <material.Button
            variant="outlined"
            startIcon={<materialIcons.filterList />}
            onClick={onFiltersClick}
            sx={{
              borderColor: "error.main",
              color: "error.main",
              borderRadius: 1,
              textTransform: "none",
              "&:hover": {
                borderColor: "error.dark",
                backgroundColor: "error.main",
                color: "white",
              },
            }}
          >
            Filters
          </material.Button>
        )}
      </material.Box>
    </material.Box>
  );
}
