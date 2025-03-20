"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const DesktopAnnouncementsList = dynamic(
  () => import("../components/desktop/MyAnnouncements/AnnouncementsList"),
  { ssr: false }
);
const MobileAnnouncementsList = dynamic(
  () => import("../components/mobile/MyAnnouncements/AnnouncementsList"),
  { ssr: false }
);

const mockAnnouncements = [
  {
    id: 1,
    title: "Ищем 2 девушек",
    address: "Республика 1/3а",
    date: "01/09/2024",
    roomCount: 1,
    genderRestriction: "Любой",
    roommatesCount: 2,
    price: 150000,
    image: "/apartments/apartment1.jpg",
    applicationCount: 50,
  },
  {
    id: 2,
    title: "Ищем 2 девушек",
    address: "Республика 1/3а",
    date: "01/09/2024",
    roomCount: 1,
    genderRestriction: "Любой",
    roommatesCount: 2,
    price: 150000,
    image: "/apartments/apartment2.jpg",
    applicationCount: 50,
  },
  {
    id: 3,
    title: "Ищем 2 девушек",
    address: "Республика 1/3а",
    date: "01/09/2024",
    roomCount: 1,
    genderRestriction: "Любой",
    roommatesCount: 2,
    price: 150000,
    image: "/apartments/apartment3.jpg",
    applicationCount: 50,
  },
];

export default function MyAnnouncementsPage() {
  const [activeAnnouncements, setActiveAnnouncements] = useState(mockAnnouncements);
  const [archivedAnnouncements, setArchivedAnnouncements] = useState<typeof mockAnnouncements>([]);
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleArchive = (id: number) => {
    const announcement = activeAnnouncements.find((item) => item.id === id);
    if (announcement) {
      setActiveAnnouncements(activeAnnouncements.filter((item) => item.id !== id));
      setArchivedAnnouncements([...archivedAnnouncements, announcement]);
    }
  };

  const handleUnarchive = (id: number) => {
    const announcement = archivedAnnouncements.find((item) => item.id === id);
    if (announcement) {
      setArchivedAnnouncements(archivedAnnouncements.filter((item) => item.id !== id));
      setActiveAnnouncements([...activeAnnouncements, announcement]);
    }
  };

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  const currentAnnouncements = activeTab === "active" ? activeAnnouncements : archivedAnnouncements;

  return (
    <>
      {isMobile ? (
        <MobileAnnouncementsList
          announcements={currentAnnouncements}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
        />
      ) : (
        <DesktopAnnouncementsList
          announcements={currentAnnouncements}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
        />
      )}
    </>
  );
}
