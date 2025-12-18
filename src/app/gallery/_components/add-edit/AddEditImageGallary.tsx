"use client";

import { useGetCategories } from "@/services/category.service";
import { CreateImageDto } from "@/types/image";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Formik, Form, useFormikContext, Field } from "formik";
import * as Yup from "yup";
import InputSelectField from "@/components/inputs/InputSelectField";
import InputFileField from "@/components/inputs/InputFileField";
import FormikInputSelectField from "@/components/inputs/formik-input/FormikInputSelectField";

interface AddEditImageGallaryProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateImageDto) => void;
  isLoading?: boolean;
}

const validationSchema = Yup.object({
  file: Yup.mixed<File>()
    .required("Image file is required")
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return false;
      return value instanceof File && value.type.startsWith("image/");
    }),
  name: Yup.string().required("Image name is required"),
  url: Yup.string().required("Image URL is required"),
  categoryId: Yup.number().optional(),
});

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
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm, values }) => (
          <Form>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogContent>
              <Box
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
                  <Box
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
              </Box>
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  resetForm();
                  handleClose();
                }}
                disabled={isLoading || isSubmitting}
              >
                Cancel
              </Button>
              <Button
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
                  isLoading ? <CircularProgress size={16} /> : undefined
                }
              >
                Upload
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
