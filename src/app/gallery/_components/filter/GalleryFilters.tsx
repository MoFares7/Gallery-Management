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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormikInputTextField from "@/components/inputs/formik-input/FormikInputTextField";
import FormikInputSelectField from "@/components/inputs/formik-input/FormikInputSelectField";

interface GalleryFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().optional(),
  categoryId: Yup.number().optional(),
  metadata: Yup.object({
    size: Yup.string().optional(),
    resolution: Yup.string().optional(),
  }).optional(),
});

interface FormValues {
  name: string;
  categoryId: number | undefined;
  metadata: {
    size: string;
    resolution: string;
  };
}

export default function GalleryFilters({
  open,
  onClose,
  filters,
  onFiltersChange,
}: GalleryFiltersProps) {
  const initialValues: FormValues = {
    name: filters.name ?? "",
    categoryId: filters.categoryId,
    metadata: {
      size: filters.metadata?.size ?? "",
      resolution: filters.metadata?.resolution ?? "",
    },
  };
  const { data: categories } = useGetCategories();

  const handleSubmit = (values: FormValues) => {
    const newFilters: ImageFilters = {
      name: values.name || undefined,
      categoryId: values.categoryId,
      metadata: {
        size: values.metadata.size || undefined,
        resolution: values.metadata.resolution || undefined,
      },
    };

    if (!newFilters.metadata?.size && !newFilters.metadata?.resolution) {
      delete newFilters.metadata;
    }

    onFiltersChange(newFilters);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, resetForm, isSubmitting }) => {
          const hasActiveFilters =
            !!values.name ||
            !!values.categoryId ||
            !!values.metadata.size ||
            !!values.metadata.resolution;

          const handleClearFilters = () => {
            resetForm({
              values: {
                name: "",
                categoryId: undefined,
                metadata: {
                  size: "",
                  resolution: "",
                },
              },
            });
          };

          return (
            <Form>
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
                  <Field
                    component={FormikInputTextField}
                    name="name"
                    label="Search by Name"
                    size="small"
                    fullWidth
                  />
                  <Field
                    component={FormikInputSelectField}
                    name="categoryId"
                    label="Category"
                    size="small"
                    options={
                      categories?.map((cat) => ({
                        value: cat.id,
                        label: cat.name,
                      })) || []
                    }
                    emptyOptionLabel="All Categories"
                  />
                  <Field
                    component={FormikInputTextField}
                    name="metadata.size"
                    label="Size"
                    type="number"
                    size="small"
                    fullWidth
                    placeholder="e.g., 2MB"
                  />
                  <Field
                    component={FormikInputTextField}
                    name="metadata.resolution"
                    label="Resolution"
                    size="small"
                    fullWidth
                    placeholder="e.g., 1920x1080"
                  />
                </Stack>

                {hasActiveFilters && (
                  <Box sx={{ mt: 3 }}>
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={handleClearFilters}
                      startIcon={<ClearIcon />}
                      fullWidth
                      sx={{ textTransform: "none" }}
                      disabled={isSubmitting}
                    >
                      Clear All Filters
                    </Button>
                  </Box>
                )}
              </DialogContent>

              <DialogActions sx={{ p: 2.5, pt: 1 }}>
                <Button
                  type="button"
                  onClick={handleCancel}
                  sx={{ textTransform: "none" }}
                  color="inherit"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
}
