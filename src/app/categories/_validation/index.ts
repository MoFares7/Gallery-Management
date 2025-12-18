import * as Yup from "yup";

export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .min(1, "Category name cannot be empty"),
  description: Yup.string(),
});
