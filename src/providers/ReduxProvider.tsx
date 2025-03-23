"use client";

import { store } from "@/store/store";
import type React from "react";

import { Provider } from "react-redux";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
