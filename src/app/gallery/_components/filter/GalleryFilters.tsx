import { type ImageFilters } from "@/types/image";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useGalleryFilter } from "../../_hooks/useGalleryFilter";

interface GalleryFiltersProps {
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
}

export default function GalleryFilters({
  filters,
  onFiltersChange,
}: GalleryFiltersProps) {
  const {
    filters: filtersState,
    handleFilterChange,
    handleClearFilters,
    hasActiveFilters,
    categories,
  } = useGalleryFilter({ filters, onFiltersChange });

  return (
    <Box
      sx={{
        mb: 2,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search by Name"
        value={filtersState.name || ""}
        onChange={(e) => handleFilterChange("name", e.target.value)}
        size="small"
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filtersState.categoryId || ""}
          onChange={(e) =>
            handleFilterChange(
              "categoryId",
              e.target.value ? Number(e.target.value) : undefined
            )
          }
          label="Category"
        >
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories?.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Min Width"
        type="number"
        value={filtersState.minWidth || ""}
        onChange={(e) =>
          handleFilterChange(
            "minWidth",
            e.target.value ? Number(e.target.value) : undefined
          )
        }
        size="small"
        sx={{ width: 120 }}
      />

      <TextField
        label="Min Height"
        type="number"
        value={filtersState.minHeight || ""}
        onChange={(e) =>
          handleFilterChange(
            "minHeight",
            e.target.value ? Number(e.target.value) : undefined
          )
        }
        size="small"
        sx={{ width: 120 }}
      />

      {hasActiveFilters && (
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          startIcon={<ClearIcon />}
          size="small"
          sx={{ textTransform: "none" }}
        >
          Clear
        </Button>
      )}
    </Box>
  );
}
