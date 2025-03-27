// src/app/(profile)/my-announcements/[responseToAparmentId]/page.tsx

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { useGetAnnouncementResponsesQuery } from "@/store/features/myAnnouncements/myAnnouncementResponces/myAnnouncementResponceApi";

const DesktopGroupsDetails = dynamic(
  () => import("../../components/desktop/MyAnnouncements/GroupsDetails"),
  { ssr: false }
);

const MobileGroupsDetails = dynamic(
  () => import("../../components/mobile/MyAnnouncements/GroupsDetails"),
  { ssr: false }
);

const ApartmentResponsesPage: React.FC = () => {
  const params = useParams();
  const responseToApartmentId = parseInt(params.responseToAparmentId as string, 10);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  const { data: responsesData, isLoading, error } = useGetAnnouncementResponsesQuery(responseToApartmentId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  if (error || !responsesData) {
    return <div className="error-placeholder">Ошибка при загрузке данных</div>;
  }

  return (
    <>
      {isMobile ? (
        <MobileGroupsDetails responseData={responsesData} />
      ) : (
        <DesktopGroupsDetails responseData={responsesData} />
      )}
    </>
  );
};

export default ApartmentResponsesPage;