"use client";

import FormikInputTextField from "@/components/inputs/formik-input/FormikInputTextField";
import { material } from "@/lib/material";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";
import { Field, Form, Formik } from "formik";
import { categoryValidationSchema } from "../../_validation";

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
    <material.Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        validationSchema={categoryValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <material.DialogTitle>
              {category ? "Edit Category" : "Create New Category"}
            </material.DialogTitle>
            <material.DialogContent>
              <material.Box
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
                disabled={isLoading || isSubmitting}
              >
                {category ? "Update" : "Create"}
              </material.Button>
            </material.DialogActions>
          </Form>
        )}
      </Formik>
    </material.Dialog>
  );
}
