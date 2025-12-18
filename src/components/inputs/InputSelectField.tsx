import { material } from "@/lib/material";
import { SelectProps } from "@mui/material";

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
    <material.FormControl fullWidth>
      <material.InputLabel>{label}</material.InputLabel>
      <material.Select
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
        <material.MenuItem value="">
          <em>{emptyOptionLabel}</em>
        </material.MenuItem>
        {options?.map((option) => (
          <material.MenuItem key={option.value} value={option.value}>
            {option.label}
          </material.MenuItem>
        ))}
      </material.Select>
    </material.FormControl>
  );
}
