import { Box, Button } from "@mui/material";
import { useFormikContext } from "formik";
import { useRef } from "react";

interface FormValues {
  file: File | null;
  name: string;
  url: string;
  categoryId: number | undefined;
}

export default function InputFileField() {
  const { setFieldValue, errors, touched } = useFormikContext<FormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFieldValue("file", selectedFile);
      setFieldValue("name", selectedFile.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("url", reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const hasError = touched.file && !!errors.file;

  return (
    <>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{
          borderColor: hasError ? "error.main" : undefined,
          "&:hover": {
            borderColor: hasError ? "error.main" : undefined,
          },
        }}
      >
        Select Image
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      {hasError && (
        <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: -1 }}>
          {errors.file}
        </Box>
      )}
    </>
  );
}
