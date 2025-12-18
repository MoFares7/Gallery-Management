"use client";

import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { categoryValidationSchema } from "../../_validation";
import FormikInputTextField from "@/components/inputs/formik-input/FormikInputTextField";

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryDto | UpdateCategoryDto) => void;
  category?: Category;
  isLoading?: boolean;
}

interface FormValues {
  name: string;
  description: string;
}

export default function AddEditCategory({
  open,
  onClose,
  onSubmit,
  category,
  isLoading = false,
}: CategoryFormProps) {
  const initialValues: FormValues = {
    name: category?.name ?? "",
    description: category?.description ?? "",
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      name: values.name,
      description: values.description ?? undefined,
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={categoryValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <DialogTitle>
              {category ? "Edit Category" : "Create New Category"}
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
              >
                <Field
                  component={FormikInputTextField}
                  name="name"
                  label="Category Name"
                  fullWidth
                  disabled={isLoading || isSubmitting}
                />
                <Field
                  component={FormikInputTextField}
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  fullWidth
                  disabled={isLoading || isSubmitting}
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
                disabled={isLoading || isSubmitting}
              >
                {category ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
