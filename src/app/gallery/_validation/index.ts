import * as Yup from "yup";

export const imageGalleryValidationSchema = Yup.object({
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
