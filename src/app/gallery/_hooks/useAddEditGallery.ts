import { useGetCategories } from "@/services/category.service";
import { CreateImageDto, type Image as ImageType } from "@/types/image";

interface FormValues {
  file: File | null;
  name: string;
  url: string;
  categoryId: number | undefined;
}

export default function useAddEditGallery({
  imageToEdit,
  onSubmit,
  onClose,
}: {
  imageToEdit: ImageType | null;
  onSubmit: (data: CreateImageDto) => void;
  onClose: () => void;
}) {
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

  return {
    isEditMode,
    handleSubmit,
    handleClose,
    initialValues,
    categories,
  };
}
