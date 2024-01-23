"use client";

import { AuthProvider } from "@context/useAuth";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <AuthProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}
