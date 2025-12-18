"use client";
import { type ImageFilters } from "@/types/image";
import { materialIcons } from "@/lib/material-icons";
import { material } from "@/lib/material";
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
    <material.Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
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
              <material.DialogTitle>
                <material.Box sx={{ display: "flex", alignItems: "center" }}>
                  <materialIcons.filterList
                    sx={{ mr: 1, color: "primary.main" }}
                  />
                  <material.Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Filters
                  </material.Typography>
                </material.Box>
              </material.DialogTitle>

              <material.DialogContent>
                <material.Stack spacing={3} sx={{ mt: 1 }}>
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
                </material.Stack>

                {hasActiveFilters && (
                  <material.Box sx={{ mt: 3 }}>
                    <material.Button
                      type="button"
                      variant="outlined"
                      onClick={handleClearFilters}
                      startIcon={<materialIcons.clear />}
                      fullWidth
                      sx={{ textTransform: "none" }}
                      disabled={isSubmitting}
                    >
                      Clear All Filters
                    </material.Button>
                  </material.Box>
                )}
              </material.DialogContent>

              <material.DialogActions sx={{ p: 2.5, pt: 1 }}>
                <material.Button
                  type="button"
                  onClick={handleCancel}
                  sx={{ textTransform: "none" }}
                  color="inherit"
                  disabled={isSubmitting}
                >
                  Cancel
                </material.Button>
                <material.Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  disabled={isSubmitting}
                >
                  Save
                </material.Button>
              </material.DialogActions>
            </Form>
          );
        }}
      </Formik>
    </material.Dialog>
  );
}
