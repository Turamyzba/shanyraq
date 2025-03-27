// src/app/(profile)/my-announcements/[responseToAparmentId]/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const DesktopGroupsDetails = dynamic(
  () => import("../../components/desktop/MyAnnouncements/GroupsDetails"),
  { ssr: false }
);

const MobileGroupsDetails = dynamic(
  () => import("../../components/mobile/MyAnnouncements/GroupsDetails"),
  { ssr: false }
);

const ApartmentResponsesPage = () => {
  const params = useParams();
  const responseToApartmentId = params.responseToAparmentId as string;
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  return <>{isMobile ? <MobileGroupsDetails /> : <DesktopGroupsDetails />}</>;
};

export default ApartmentResponsesPage;
