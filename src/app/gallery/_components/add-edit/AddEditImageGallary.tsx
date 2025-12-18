"use client";

import InputFileField from "@/components/inputs/InputFileField";
import FormikInputSelectField from "@/components/inputs/formik-input/FormikInputSelectField";
import FormikInputTextField from "@/components/inputs/formik-input/FormikInputTextField";
import { material } from "@/lib/material";
import { useGetCategories } from "@/services/category.service";
import { CreateImageDto, Image as ImageType } from "@/types/image";
import { Field, Form, Formik } from "formik";

interface AddEditImageGallaryProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateImageDto) => void;
  isLoading?: boolean;
  imageToEdit?: ImageType | null;
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
  imageToEdit,
}: AddEditImageGallaryProps) {
  const isEditMode = !!imageToEdit;

  const initialValues: FormValues = {
    file: null,
    name: imageToEdit?.name || "",
    url: imageToEdit?.url || "",
    categoryId: imageToEdit?.categoryId,
  };

  const { data: categories } = useGetCategories();

  const handleSubmit = (values: FormValues) => {
    if (!values.name || !values.url) {
      return;
    }

    if (!isEditMode && !values.file) {
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
        // validationSchema={imageGalleryValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        key={imageToEdit?.id || "new"}
      >
        {({ isSubmitting, resetForm, values }) => (
          <Form>
            <material.DialogTitle>
              {isEditMode ? "Edit Image" : "Upload Image"}
            </material.DialogTitle>
            <material.DialogContent>
              <material.Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  pt: 1,
                }}
              >
                <Field
                  component={FormikInputTextField}
                  name="name"
                  label="Name"
                  size="small"
                  fullWidth
                />
                {isEditMode && (
                  <material.Box
                    component="img"
                    src={values.url}
                    alt="Current Image"
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
                  component={InputFileField}
                  name="file"
                  label="Image"
                  size="small"
                  fullWidth
                />
                {!isEditMode && values.url && (
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
                  (!isEditMode && !values.file)
                }
                startIcon={
                  isLoading ? (
                    <material.CircularProgress size={16} />
                  ) : undefined
                }
              >
                {isEditMode ? "Update" : "Upload"}
              </material.Button>
            </material.DialogActions>
          </Form>
        )}
      </Formik>
    </material.Dialog>
  );
}
