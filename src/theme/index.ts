import { createTheme, TypeBackground, TypeText } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    background?: Partial<TypeBackground> | undefined;
    text?: Partial<TypeText> | undefined;
    accent?: {
      main?: string;
      light?: string;
      dark?: string;
    };
    category?: string[];
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
      contrastText: "#fff",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
      // @ts-expect-error: extend MUI background palette with "light" and "gradient"
      light: "#f8f9fa",
      gradient: "linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
    error: {
      main: "#667eea",
      light: "#a8d8ff",
      dark: "#764ba2",
    },
    category: [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E2",
      "#F8B739",
      "#52BE80",
      "#E74C3C",
      "#3498DB",
      "#9B59B6",
      "#1ABC9C",
      "#F39C12",
    ],
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export type AppTheme = typeof theme;
