import { FieldProps } from "formik";
import InputSelectField from "../InputSelectField";
import { SelectProps } from "@mui/material";

interface SelectOption {
  value: string | number;
  label: string;
}

interface FormikInputSelectFieldProps
  extends Omit<SelectProps, "value" | "onChange" | "name" | "onBlur"> {
  field: FieldProps["field"];
  form: FieldProps["form"];
  label: string;
  options: SelectOption[];
  emptyOptionLabel?: string;
}

export default function FormikInputSelectField({
  field,
  form,
  ...props
}: FormikInputSelectFieldProps) {
  return (
    <InputSelectField
      value={field.value}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
        form.setFieldTouched(field.name, true);
      }}
      {...props}
    />
  );
}
