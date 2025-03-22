"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const MobileLayout = dynamic(() => import("./components/mobile/MobileLayout"));
const DesktopLayout = dynamic(() => import("./components/desktop/DesktopLayout"));

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>{isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>}</>
  );
}