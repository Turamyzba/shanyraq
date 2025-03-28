"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { useGetAnnouncementResponsesQuery } from "@/store/features/myAnnouncements/announcementApi";

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
  const responseToApartmentId = parseInt(params.responseToAparmentId as string);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  const { data: responseData, isLoading } = useGetAnnouncementResponsesQuery(responseToApartmentId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  return (
    <>
      {isMobile ? 
        <MobileGroupsDetails data={responseData?.data} /> :
        <DesktopGroupsDetails data={responseData?.data} />
      }
    </>
  );
};

export default ApartmentResponsesPage;