"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastProvider } from "@heroui/toast";
import { LoadingProvider } from "@/context/LoadingContext";
import ReduxProvider from "@/providers/ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <HeroUIProvider>
        <ReduxProvider>
          <ToastProvider placement={"top-center"} />
          {children}
        </ReduxProvider>
      </HeroUIProvider>
    </LoadingProvider>
  );
}
