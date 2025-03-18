"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
const MobileLayout = dynamic(() => import("./responsive/MobileLayout"), { ssr: false });
const DesktopLayout = dynamic(() => import("./responsive/DesktopLayout"), { ssr: false });
export default function ProfilePage() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }
  return <>{isMobile ? <MobileLayout /> : <DesktopLayout />}</>;
}
