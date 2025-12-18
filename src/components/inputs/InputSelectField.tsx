import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

interface SelectOption {
  value: string | number;
  label: string;
}

interface InputSelectFieldProps
  extends Omit<SelectProps, "value" | "onChange"> {
  label: string;
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  options: SelectOption[];
  emptyOptionLabel?: string;
}

export default function InputSelectField({
  label,
  value,
  onChange,
  options,
  emptyOptionLabel = "All",
  ...props
}: InputSelectFieldProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        {...props}
        value={value || ""}
        onChange={(e) =>
          onChange(
            e.target.value === ""
              ? undefined
              : (e.target.value as string | number)
          )
        }
        label={label}
      >
        <MenuItem value="">
          <em>{emptyOptionLabel}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
