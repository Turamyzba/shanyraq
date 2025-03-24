"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const DesktopGroupDetails = dynamic(
  () => import("../../components/desktop/MyResponses/GroupDetails/GroupDetails"),
  { ssr: false }
);

const MobileGroupDetails = dynamic(
  () => import("../../components/mobile/MyResponses/GroupDetails/GroupDetails"),
  { ssr: false }
);

// Sample data for mocking
const mockApartmentDetails = {
  id: 1,
  title: "Ищем 2 девушек",
  address: "Ул. Раймбека 181/23",
  district: "Мкр. Акцент 14",
  city: "Алматы г.",
  roomDetails: "2 комнаты - 30 кв. м - 2/13 этаж",
  moveInDate: "21.11.2024",
  deposit: "50.000тг",
  description: "Ищем 2 девушек на подселение",
  price: 150000,
  image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
  status: "accepted" as const, // pending, accepted, rejected
};

// Sample groups data
const mockGroups = [
  {
    id: 1,
    name: "Группа 1",
    status: "accepted" as const,
    members: [
      {
        id: 1,
        name: "Батырхан",
        email: "amantay11@gmail.com",
        age: 24,
        phone: "8777 777 77 77",
        date: "27/11/2024",
        avatar: "/avatars/user1.jpg",
        role: "owner" as const,
      },
      {
        id: 2,
        name: "Ерасыл",
        email: "erasyl.m@mail.ru",
        age: 18,
        phone: "8777 545 74 78",
        date: "27/11/2024",
        avatar: "/avatars/user2.jpg",
        role: "member" as const,
      },
      {
        id: 3,
        name: "Айбол",
        email: "aibol.qazaq@gmail.com",
        age: 19,
        phone: "8701 577 77 78",
        date: "27/11/2024",
        avatar: "/avatars/user3.jpg",
        role: "member" as const,
        isCurrentUser: true,
      },
    ],
    applicants: [],
    isUserMember: true,
    isUserAdmin: false,
    isUserSuperAdmin: false,
  },
  {
    id: 2,
    name: "Группа 2",
    status: "accepted" as const,
    members: [
      {
        id: 4,
        name: "Марат",
        email: "marat@gmail.com",
        age: 25,
        phone: "8700 123 45 67",
        date: "26/11/2024",
        avatar: "/avatars/user4.jpg",
        role: "superadmin" as const,
        isCurrentUser: true,
      },
      {
        id: 5,
        name: "Алишер",
        email: "alisher@mail.ru",
        age: 22,
        phone: "8707 987 65 43",
        date: "26/11/2024",
        avatar: "/avatars/user5.jpg",
        role: "member" as const,
      },
    ],
    applicants: [
      {
        id: 6,
        name: "Жанар",
        email: "zhanar@gmail.com",
        age: 23,
        phone: "8700 222 33 44",
        date: "25/11/2024",
        avatar: "/avatars/user6.jpg",
      },
      {
        id: 7,
        name: "Асет",
        email: "aset@mail.ru",
        age: 27,
        phone: "8701 333 44 55",
        date: "24/11/2024",
        avatar: "/avatars/user7.jpg",
      },
    ],
    isUserMember: true,
    isUserAdmin: true,
    isUserSuperAdmin: true,
  },
  {
    id: 3,
    name: "Группа 3",
    status: "pending" as const,
    members: [
      {
        id: 8,
        name: "Дина",
        email: null,
        age: null,
        phone: null,
        date: null,
        avatar: "/avatars/user8.jpg",
        role: "owner" as const,
      },
      {
        id: 9,
        name: "Айдос",
        email: null,
        age: null,
        phone: null,
        date: null,
        avatar: "/avatars/user9.jpg",
        role: "admin" as const,
      },
      {
        id: 10,
        name: "Ваше Имя",
        email: "your.email@gmail.com",
        age: 24,
        phone: "8700 111 22 33",
        date: "23/11/2024",
        avatar: "/avatars/user10.jpg",
        role: "member" as const,
        isCurrentUser: true,
      },
    ],
    applicants: [],
    isUserMember: true,
    isUserAdmin: false,
    isUserSuperAdmin: false,
  },
];

export default function ResponseGroupsPage() {
  const params = useParams();
  const responseId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
  }, [responseId]);

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  return (
    <>
      {isMobile ? (
        <MobileGroupDetails apartmentDetails={mockApartmentDetails} groups={mockGroups} />
      ) : (
        <DesktopGroupDetails apartmentDetails={mockApartmentDetails} groups={mockGroups} />
      )}
    </>
  );
}
