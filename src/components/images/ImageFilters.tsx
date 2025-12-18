import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { ImageFilters } from "@/types/image";
import { useCategories } from "@/hooks/useCategories";
import ClearIcon from "@mui/icons-material/Clear";

interface ImageFiltersProps {
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
}

export default function ImageFiltersComponent({
  filters,
  onFiltersChange,
}: ImageFiltersProps) {
  const { data: categories } = useCategories();

  const handleFilterChange = (
    key: keyof ImageFilters,
    value: string | number | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof ImageFilters] !== undefined
  );

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
        value={filters.name || ""}
        onChange={(e) => handleFilterChange("name", e.target.value)}
        size="small"
        sx={{ minWidth: 200 }}
      />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.categoryId || ""}
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
        value={filters.minWidth || ""}
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
        value={filters.minHeight || ""}
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
