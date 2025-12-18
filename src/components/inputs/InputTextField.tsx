import { TextField, TextFieldProps } from "@mui/material";

interface InputTextFieldProps
  extends Omit<TextFieldProps, "value" | "onChange"> {
  value: string | undefined;
  onChange: (value: string) => void;
  type?: "text" | "number" | "file";
}

export default function InputTextField({
  value,
  onChange,
  type = "text",
  ...props
}: InputTextFieldProps) {
  return (
    <TextField
      type={type}
      {...props}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}
