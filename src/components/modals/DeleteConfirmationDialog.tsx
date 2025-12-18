"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>
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
      </DialogActions>
    </Dialog>
  );
}
