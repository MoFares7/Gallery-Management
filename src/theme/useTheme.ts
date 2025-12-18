import { useTheme } from "@mui/material/styles";
import { AppTheme } from "./index";

export const useAppTheme = (): AppTheme => {
  return useTheme() as AppTheme;
};
