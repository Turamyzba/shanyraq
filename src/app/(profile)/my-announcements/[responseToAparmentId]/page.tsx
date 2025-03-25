// src/app/(profile)/my-announcements/[responseToAparmentId]/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

// Dynamically import the desktop and mobile components
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

  // Set mounted state after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show loading state until client-side rendering is complete
  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  return (
    <>
      {isMobile ? (
        <MobileGroupsDetails />
      ) : (
        <DesktopGroupsDetails />
      )}
    </>
  );
};

export default ApartmentResponsesPage;