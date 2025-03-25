"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastProvider } from "@heroui/toast";
import ReduxProvider from "@/providers/ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ReduxProvider>
        <ToastProvider placement={"top-center"} />
        {children}
      </ReduxProvider>
    </HeroUIProvider>
  );
}
