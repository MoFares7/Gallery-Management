import PrimaryButton from "@/components/buttons/PrimaryButton";
import { material } from "@/lib/material";
import { Image } from "@/types/image";

interface SelectAnnotationDialogProps {
  open: boolean;
  onClose: () => void;
  images: Image[];
  handleImageSelectConfirm: () => void;
  tempSelectedImage: Image | null;
  handleImageSelect: (image: Image) => void;
}
export default function SelectAnnotationDialog({
  open,
  onClose,
  images,
  handleImageSelectConfirm,
  tempSelectedImage,
  handleImageSelect,
}: SelectAnnotationDialogProps) {
  return (
    <material.Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <material.DialogTitle>Select Image for Annotation</material.DialogTitle>
      <material.DialogContent>
        <material.Grid container spacing={2} sx={{ mt: 1 }}>
          {images?.map((img) => (
            <material.Grid size={{ xs: 6, sm: 4, md: 3 }} key={img.id}>
              <material.Box
                onClick={() => handleImageSelect(img)}
                sx={{
                  cursor: "pointer",
                  border:
                    tempSelectedImage?.id === img.id
                      ? "3px solid"
                      : "2px solid",
                  borderColor:
                    tempSelectedImage?.id === img.id
                      ? "primary.main"
                      : "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <material.Box
                  component="img"
                  src={img.url}
                  alt={img.name}
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <material.Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    backgroundColor: "background.paper",
                  }}
                >
                  <material.Box
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {img?.name}
                  </material.Box>
                </material.Box>
              </material.Box>
            </material.Grid>
          ))}
        </material.Grid>
      </material.DialogContent>
      <material.DialogActions>
        <PrimaryButton
          variant="outlined"
          onClick={() => {
            onClose?.();
          }}
          buttonText="Cancel"
          backgroundColor="white"
          hoverBackgroundColor="background.default"
        />
        <PrimaryButton
          onClick={() => handleImageSelectConfirm?.()}
          variant="contained"
          disabled={!tempSelectedImage}
          buttonText="Continue"
        />
      </material.DialogActions>
    </material.Dialog>
  );
}
