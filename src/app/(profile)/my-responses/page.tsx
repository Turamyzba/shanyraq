"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const DesktopAnnouncementsList = dynamic(
  () => import("../components/desktop/MyResponses/AnnouncementsList"),
  { ssr: false }
);
const MobileAnnouncementsList = dynamic(
  () => import("../components/mobile/MyResponses/AnnouncementsList"),
  { ssr: false }
);

const mockAnnouncements = [
  {
    id: 1,
    title: "Ищем 2 девушек",
    address: "Республика 1/3а",
    date: "01/09/2024",
    price: 150000,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
    status: "pending", // pending, accepted, rejected
    ownerName: "Батырхан",
    groupCount: 2,
    applicationDate: "27/11/2024",
    genderRestriction: "female",
  },
  {
    id: 2,
    title: "Ищем 1 парня",
    address: "Сатпаева 18/2",
    date: "15/09/2024",
    price: 120000,
    image: "https://i.pinimg.com/736x/a3/1f/b7/a31fb71819bd92f736b655b4411879c0.jpg",
    status: "accepted",
    ownerName: "Асхат",
    groupCount: 1,
    applicationDate: "25/11/2024",
    genderRestriction: "male",
  },
  {
    id: 3,
    title: "Ищем соседа",
    address: "Жандосова 34",
    date: "10/10/2024",
    price: 180000,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
    status: "rejected",
    ownerName: "Ерлан",
    groupCount: 0,
    applicationDate: "20/11/2024",
    genderRestriction: "male",
  },
  {
    id: 4,
    title: "Сдаётся комната",
    address: "Абая 48",
    date: "05/09/2024",
    price: 95000,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
    status: "pending",
    ownerName: "Марат",
    groupCount: 1,
    applicationDate: "22/11/2024",
    genderRestriction: "female",
  },
  {
    id: 5,
    title: "2-комнатная квартира",
    address: "Достык 12",
    date: "12/10/2024",
    price: 200000,
    image: "https://i.pinimg.com/736x/a3/1f/b7/a31fb71819bd92f736b655b4411879c0.jpg",
    status: "accepted",
    ownerName: "Дина",
    groupCount: 3,
    applicationDate: "18/11/2024",
    genderRestriction: "female",
  },
  {
    id: 6,
    title: "Квартира в центре",
    address: "Тимирязева 15",
    date: "20/09/2024",
    price: 160000,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
    status: "pending",
    ownerName: "Алмаз",
    groupCount: 2,
    applicationDate: "15/11/2024",
    genderRestriction: "female",
  },
];

export default function MyResponsesPage() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCancelResponse = (id: number) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
  };

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  let filteredAnnouncements = announcements;
  if (activeTab !== "all") {
    filteredAnnouncements = announcements.filter(
      (announcement) => announcement.status === activeTab
    );
  }

  return (
    <>
      {isMobile ? (
        <MobileAnnouncementsList
          announcements={filteredAnnouncements}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCancelResponse={handleCancelResponse}
        />
      ) : (
        <DesktopAnnouncementsList
          announcements={filteredAnnouncements}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCancelResponse={handleCancelResponse}
        />
      )}
    </>
  );
}
