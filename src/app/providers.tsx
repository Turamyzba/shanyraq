"use client";

import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastProvider } from "@heroui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {" "}
      <ToastProvider placement={"top-center"} />
      {children}
    </HeroUIProvider>
  );
}
