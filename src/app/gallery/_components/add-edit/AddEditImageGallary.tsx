"use client";

import InputFileField from "@/components/inputs/InputFileField";
import FormikInputSelectField from "@/components/inputs/formik-input/FormikInputSelectField";
import { material } from "@/lib/material";
import { useGetCategories } from "@/services/category.service";
import { CreateImageDto } from "@/types/image";
import { Field, Form, Formik } from "formik";
import { imageGalleryValidationSchema } from "../../_validation";

interface AddEditImageGallaryProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateImageDto) => void;
  isLoading?: boolean;
}

interface FormValues {
  file: File | null;
  name: string;
  url: string;
  categoryId: number | undefined;
}

export default function AddEditImageGallary({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}: AddEditImageGallaryProps) {
  const initialValues: FormValues = {
    file: null,
    name: "",
    url: "",
    categoryId: undefined,
  };

  const { data: categories } = useGetCategories();

  const handleSubmit = (values: FormValues) => {
    if (!values.name || !values.url || !values.file) {
      return;
    }

    const img = new Image();
    img.onload = () => {
      const metadata = {
        size: values.file?.size,
        width: img.width,
        height: img.height,
        format:
          values.file?.type.split("/")[1] ||
          values.url.split(".").pop()?.split("?")[0] ||
          "unknown",
      };

      onSubmit({
        name: values.name,
        url: values.url,
        categoryId: values.categoryId,
        metadata,
      });
    };

    img.onerror = () => {
      const metadata = {
        size: values.file?.size,
        format:
          values.file?.type.split("/")[1] ||
          values.url.split(".").pop()?.split("?")[0] ||
          "unknown",
      };

      onSubmit({
        name: values.name,
        url: values.url,
        categoryId: values.categoryId,
        metadata,
      });
    };

    img.src = values.url;
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <material.Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={imageGalleryValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm, values }) => (
          <Form>
            <material.DialogTitle>Upload Image</material.DialogTitle>
            <material.DialogContent>
              <material.Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
              >
                <Field
                  component={InputFileField}
                  name="file"
                  label="Image"
                  size="small"
                  fullWidth
                />

                {values.url && (
                  <material.Box
                    component="img"
                    src={values.url}
                    alt="Preview"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: 200,
                      objectFit: "contain",
                      border: "1px solid #ddd",
                      borderRadius: 1,
                    }}
                  />
                )}
                <Field
                  component={FormikInputSelectField}
                  name="categoryId"
                  label="Category"
                  size="small"
                  fullWidth
                  options={
                    categories?.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    })) || []
                  }
                />
              </material.Box>
            </material.DialogContent>

            <material.DialogActions>
              <material.Button
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
                disabled={isLoading || isSubmitting}
              >
                Cancel
              </material.Button>
              <material.Button
                type="submit"
                variant="contained"
                disabled={
                  isLoading ||
                  isSubmitting ||
                  !values.name ||
                  !values.url ||
                  !values.file
                }
                startIcon={
                  isLoading ? (
                    <material.CircularProgress size={16} />
                  ) : undefined
                }
              >
                Upload
              </material.Button>
            </material.DialogActions>
          </Form>
        )}
      </Formik>
    </material.Dialog>
  );
}
