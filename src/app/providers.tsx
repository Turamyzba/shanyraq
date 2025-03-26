"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import ReduxProvider from "@/providers/ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </HeroUIProvider>
  );
}
