"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { LoadingProvider } from "@/context/LoadingContext";
import ReduxProvider from "@/providers/ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <HeroUIProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </HeroUIProvider>
    </LoadingProvider>
  );
}
