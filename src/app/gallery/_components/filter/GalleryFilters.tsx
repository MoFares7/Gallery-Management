"use client";
import { type ImageFilters } from "@/types/image";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useGetCategories } from "@/services/category.service";
import { useEffect, useState } from "react";
import InputTextField from "@/components/inputs/InputTextField";
import InputSelectField from "@/components/inputs/InputSelectField";

interface GalleryFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
}

export default function GalleryFilters({
  open,
  onClose,
  filters,
  onFiltersChange,
}: GalleryFiltersProps) {
  const { data: categories } = useGetCategories();
  const [tempFilters, setTempFilters] = useState<ImageFilters>(filters);

  useEffect(() => {
    if (open) {
      setTempFilters(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleFilterChange = (
    key: keyof ImageFilters,
    value: string | number | undefined
  ) => {
    setTempFilters({
      ...tempFilters,
      [key]: value || undefined,
    });
  };

  const handleMetadataFilterChange = (
    key: "size" | "resolution",
    value: string | undefined
  ) => {
    setTempFilters({
      ...tempFilters,
      metadata: {
        ...tempFilters.metadata,
        [key]: value || undefined,
      },
    });
  };

  const handleClearFilters = () => {
    setTempFilters({});
  };

  const handleSave = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  const handleCancel = () => {
    setTempFilters(filters);
    onClose();
  };

  const hasActiveFilters =
    !!tempFilters.name ||
    !!tempFilters.categoryId ||
    !!tempFilters.metadata?.size ||
    !!tempFilters.metadata?.resolution;

  const categoryOptions =
    categories?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FilterListIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filters
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <InputTextField
            label="Search by Name"
            value={tempFilters.name}
            onChange={(value) => handleFilterChange("name", value || undefined)}
            size="small"
          />

          <InputSelectField
            label="Category"
            value={tempFilters.categoryId}
            onChange={(value) =>
              handleFilterChange(
                "categoryId",
                value ? Number(value) : undefined
              )
            }
            options={categoryOptions}
            emptyOptionLabel="All Categories"
            size="small"
          />

          <InputTextField
            label="Size"
            type="number"
            value={tempFilters.metadata?.size}
            onChange={(value) =>
              handleMetadataFilterChange("size", value || undefined)
            }
            size="small"
            placeholder="e.g., 2MB"
          />

          <InputTextField
            label="Resolution"
            value={tempFilters.metadata?.resolution}
            onChange={(value) =>
              handleMetadataFilterChange("resolution", value || undefined)
            }
            size="small"
            placeholder="e.g., 1920x1080"
          />
        </Stack>

        {hasActiveFilters && (
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<ClearIcon />}
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Clear All Filters
            </Button>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 1 }}>
        <Button
          onClick={handleCancel}
          sx={{ textTransform: "none" }}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
