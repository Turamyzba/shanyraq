"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import styles from "./ResponseGroupsPage.module.scss";

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
  status: "accepted" as const,
};

// Sample groups data with all status types
const mockGroups = [
  // Accepted groups
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
  // Pending groups
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
  {
    id: 4,
    name: "Группа 4",
    status: "pending" as const,
    members: [
      {
        id: 11,
        name: "Нурсултан",
        email: "nursultan@gmail.com",
        age: 26,
        phone: "8700 444 55 66",
        date: "22/11/2024",
        avatar: "/avatars/user11.jpg",
        role: "superadmin" as const,
        isCurrentUser: true,
      },
      {
        id: 12,
        name: "Айгуль",
        email: "aigul@mail.ru",
        age: 23,
        phone: "8777 888 99 00",
        date: "22/11/2024",
        avatar: "/avatars/user12.jpg",
        role: "member" as const,
      },
    ],
    applicants: [],
    isUserMember: true,
    isUserAdmin: true,
    isUserSuperAdmin: true,
  },
  // Rejected groups
  {
    id: 5,
    name: "Группа 5",
    status: "rejected" as const,
    members: [
      {
        id: 13,
        name: "Саят",
        email: "sayat@gmail.com",
        age: 28,
        phone: "8707 111 22 33",
        date: "21/11/2024",
        avatar: "/avatars/user13.jpg",
        role: "superadmin" as const,
        isCurrentUser: true,
      },
      {
        id: 14,
        name: "Мадина",
        email: "madina@mail.ru",
        age: 25,
        phone: "8700 555 66 77",
        date: "21/11/2024",
        avatar: "/avatars/user14.jpg",
        role: "member" as const,
      },
    ],
    applicants: [],
    isUserMember: true,
    isUserAdmin: true,
    isUserSuperAdmin: true,
  },
  // Draft groups
  {
    id: 6,
    name: "Новая группа",
    status: "draft" as const,
    members: [
      {
        id: 15,
        name: "Ваше Имя",
        email: "your.email@gmail.com",
        age: 24,
        phone: "8700 111 22 33",
        date: "20/11/2024",
        avatar: "/avatars/user15.jpg",
        role: "superadmin" as const,
        isCurrentUser: true,
      },
      {
        id: 16,
        name: "Карина",
        email: "karina@mail.ru",
        age: 22,
        phone: "8777 123 45 67",
        date: "20/11/2024",
        avatar: "/avatars/user16.jpg",
        role: "invited" as const,
      },
      {
        id: 17,
        name: "Максат",
        email: "maksat@gmail.com",
        age: 25,
        phone: "8707 987 65 43",
        date: "20/11/2024",
        avatar: "/avatars/user17.jpg",
        role: "invited" as const,
      },
    ],
    applicants: [],
    isUserMember: true,
    isUserAdmin: true,
    isUserSuperAdmin: true,
    isDraft: true,
  },
];

type TabType = "all" | "accepted" | "pending" | "rejected" | "draft";

export default function ResponseGroupsPage() {
  const params = useParams();
  const router = useRouter();
  const responseId = params.id as string;
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [activeTab, setActiveTab] = useState<TabType>("all");

  useEffect(() => {
    setIsMounted(true);
  }, [responseId]);

  const filterGroupsByStatus = (): typeof mockGroups => {
    if (activeTab === "all") {
      return mockGroups;
    }
    return mockGroups.filter(group => group.status === activeTab);
  };

  const filteredGroups = filterGroupsByStatus();

  const tabItems = [
    { key: "all", label: "Все" },
    { key: "accepted", label: "Принятые" },
    { key: "pending", label: "В ожидании" },
    { key: "rejected", label: "Отклоненные" },
    { key: "draft", label: "Черновик" },
  ];

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={() => router.push("/my-responses")}
        >
          <BackIcon />
          <span>Назад</span>
        </button>
        <h1 className={styles.title}>Группы объявления</h1>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabItems.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.key as TabType)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isMobile ? (
        <MobileGroupDetails apartmentDetails={mockApartmentDetails} groups={filteredGroups} />
      ) : (
        <DesktopGroupDetails apartmentDetails={mockApartmentDetails} groups={filteredGroups} />
      )}
    </div>
  );
}

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 16.6L6.66666 10.7667L12.5 4.93335"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);