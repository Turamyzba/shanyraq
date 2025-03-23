"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const DesktopResponsesList = dynamic(
  () => import("../components/mobile/MyResponses/ResponsesList"),
  { ssr: false }
);
const MobileResponsesList = dynamic(
  () => import("../components/desktop/MyResponses/ResponsesList"),
  { ssr: false }
);

// Mock data for responses
const mockResponses = [
  {
    id: 1,
    title: "Ищем 2 девушек",
    address: "Республика 1/3а",
    date: "01/09/2024",
    price: 150000,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
    status: "pending", // pending, accepted, rejected
    ownerName: "Батырхан",
    ownerId: 1,
    applicationDate: "27/11/2024",
    memberCount: 3,
    isGroupCreator: false,
  },
  {
    id: 4,
    title: "Ищем 2 девушек",
    address: "Республика 1/3а",
    date: "01/09/2024",
    price: 150000,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
    status: "pending", // pending, accepted, rejected
    ownerName: "Батырхан",
    ownerId: 1,
    applicationDate: "27/11/2024",
    memberCount: 3,
    isGroupCreator: false,
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
    ownerId: 2,
    applicationDate: "25/11/2024",
    memberCount: 2,
    isGroupCreator: true,
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
    ownerId: 3,
    applicationDate: "20/11/2024",
    memberCount: 1,
    isGroupCreator: false,
  },
  {
    id: 5,
    title: "Ищем 1 парня",
    address: "Сатпаева 18/2",
    date: "15/09/2024",
    price: 120000,
    image: "https://i.pinimg.com/736x/a3/1f/b7/a31fb71819bd92f736b655b4411879c0.jpg",
    status: "accepted",
    ownerName: "Асхат",
    ownerId: 2,
    applicationDate: "25/11/2024",
    memberCount: 2,
    isGroupCreator: true,
  },
  {
    id: 6,
    title: "Ищем соседа",
    address: "Жандосова 34",
    date: "10/10/2024",
    price: 180000,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
    status: "rejected",
    ownerName: "Ерлан",
    ownerId: 3,
    applicationDate: "20/11/2024",
    memberCount: 1,
    isGroupCreator: false,
  },
];

export default function MyResponsesPage() {
  const [responses, setResponses] = useState(mockResponses);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCancelResponse = (id: number) => {
    setResponses(responses.filter((response) => response.id !== id));
  };

  const handleLeaveGroup = (id: number) => {
    setResponses(responses.filter((response) => response.id !== id));
  };

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  let filteredResponses = responses;
  if (activeTab !== "all") {
    filteredResponses = responses.filter((response) => response.status === activeTab);
  }

  return (
    <>
      {isMobile ? (
        <MobileResponsesList
          responses={filteredResponses}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCancelResponse={handleCancelResponse}
          onLeaveGroup={handleLeaveGroup}
        />
      ) : (
        <DesktopResponsesList
          responses={filteredResponses}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCancelResponse={handleCancelResponse}
          onLeaveGroup={handleLeaveGroup}
        />
      )}
    </>
  );
}
