import { FieldProps } from "formik";
import InputTextField from "../InputTextField";
import { TextFieldProps } from "@mui/material";

interface FormikInputTextFieldProps
  extends Omit<TextFieldProps, "value" | "onChange" | "name" | "onBlur"> {
  field: FieldProps["field"];
  form: FieldProps["form"];
  type?: "text" | "number" | "file";
}

export default function FormikInputTextField({
  field,
  form,
  type = "text",
  ...props
}: FormikInputTextFieldProps) {
  const error = form.touched[field.name] && !!form.errors[field.name];
  const helperText =
    form.touched[field.name] && form.errors[field.name]
      ? String(form.errors[field.name])
      : undefined;

  return (
    <InputTextField
      type={type}
      value={field.value}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
        form.setFieldTouched(field.name, true);
      }}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
}
