"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastProvider } from "@heroui/toast";
import { LoadingProvider } from "@/context/LoadingContext";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <HeroUIProvider>
        <ToastProvider placement={"top-center"} />
        {children}
      </HeroUIProvider>
    </LoadingProvider>
  );
}
