"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const MobileProfileForm = dynamic(() => import("../components/mobile/Profile/ProfileForm"));
const DesktopProfileForm = dynamic(() => import("../components/desktop/Profile/ProfileForm"));

export default function ProfilePage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return <>{isMobile ? <MobileProfileForm /> : <DesktopProfileForm />}</>;
}
