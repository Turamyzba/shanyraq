"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastProvider } from "@heroui/toast";
import AuthProvider from "@/providers/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HeroUIProvider>
        <ToastProvider placement={"top-center"} />
        {children}
      </HeroUIProvider>
    </AuthProvider>
  );
}
