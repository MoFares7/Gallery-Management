"use client";

import { material } from "@/lib/material";
import { QueryClientProvider } from "./QueryClientProvider";
import { NavigationLoadingProvider } from "./NavigationLoadingProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "@/theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <material.ThemeProvider theme={theme}>
        <material.CssBaseline />
        <NavigationLoadingProvider>{children}</NavigationLoadingProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </material.ThemeProvider>
    </QueryClientProvider>
  );
}
