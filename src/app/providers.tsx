"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import ReduxProvider from "@/providers/ReduxProvider";
import { StoreProvider } from "@/providers/StoreProvier";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <HeroUIProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </HeroUIProvider>
    </StoreProvider>
  );
}
