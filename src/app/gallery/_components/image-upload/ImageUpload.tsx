"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useState, useRef } from "react";
import { CreateImageDto } from "@/types/image";
import { useGetCategories } from "@/services/category.service";
import InputSelectField from "../../../../components/inputs/InputSelectField";

interface ImageUploadProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateImageDto) => void;
  isLoading?: boolean;
}

export default function ImageUpload({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}: ImageUploadProps) {
  const { data: categories } = useGetCategories();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setName(selectedFile.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !url) {
      return;
    }

    const img = new Image();
    img.onload = () => {
      const metadata = {
        size: file?.size,
        width: img.width,
        height: img.height,
        format:
          file?.type.split("/")[1] ||
          url.split(".").pop()?.split("?")[0] ||
          "unknown",
      };

      onSubmit({
        name,
        url,
        categoryId,
        metadata,
      });
      setName("");
      setUrl("");
      setCategoryId(undefined);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    img.onerror = () => {
      const metadata = {
        size: file?.size,
        format:
          file?.type.split("/")[1] ||
          url.split(".").pop()?.split("?")[0] ||
          "unknown",
      };

      onSubmit({
        name,
        url,
        categoryId,
        metadata,
      });
      setName("");
      setUrl("");
      setCategoryId(undefined);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    img.src = url;
  };

  const handleClose = () => {
    setName("");
    setUrl("");
    setCategoryId(undefined);
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              disabled={isLoading}
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

            {url && (
              <Box
                component="img"
                src={url}
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

            <InputSelectField
              label="Category"
              value={categoryId}
              onChange={(value) => setCategoryId(value as number | undefined)}
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
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !name || !url}
            startIcon={isLoading ? <CircularProgress size={16} /> : undefined}
          >
            Upload
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
