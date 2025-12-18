"use client";

import { material } from "@/lib/material";
import PrimaryButton from "../buttons/PrimaryButton";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false,
}: DeleteConfirmationDialogProps) {
  return (
    <material.Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <material.DialogTitle>{title}</material.DialogTitle>
      <material.DialogContent>
        <material.DialogContentText>{message}</material.DialogContentText>
      </material.DialogContent>
      <material.DialogActions sx={{ px: 2, pb: 2 }}>
        <PrimaryButton
          variant="outlined"
          onClick={onClose}
          buttonText="Cancel"
          disabled={isLoading}
          backgroundColor="white"
          hoverBackgroundColor="background.default"
        />
        <PrimaryButton
          onClick={onConfirm}
          buttonText="Delete"
          loading={isLoading}
          disabled={isLoading}
        />
      </material.DialogActions>
    </material.Dialog>
  );
}
