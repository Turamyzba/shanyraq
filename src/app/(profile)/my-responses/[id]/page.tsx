// src/app/(profile)/my-responses/[id]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import GroupDetailsPageLayout from "../../components/desktop/MyResponses/GroupDetails/GroupDetailsPageLayout";

const DesktopGroupDetails = dynamic(
  () => import("../../components/desktop/MyResponses/GroupDetails/GroupDetails"),
  { ssr: false }
);

const MobileGroupDetails = dynamic(
  () => import("../../components/mobile/MyResponses/GroupDetails/GroupDetails"),
  { ssr: false }
);

const mockApartmentDetails = {
  id: 1,
  title: "Просторная квартира в центре",
  address: "Ул. Раймбека 181/23",
  district: "Мкр. Акцент 14",
  city: "Алматы г.",
  roomDetails: "2 комнаты - 30 кв. м - 2/13 этаж",
  moveInDate: "21.11.2024",
  deposit: "50.000тг",
  description: "Ищем 2 девушек на подселение",
  price: 150000,
  image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
  status: "accepted",
};

export const mockGroupsData = {
  accepted: [
    {
      id: 1,
      name: "Группа соседей",
      status: "accepted",
      members: [
        {
          id: 1,
          name: "Батырхан",
          email: "amantay11@gmail.com",
          telegram: "@batyr_k",
          age: 24,
          phone: "8777 777 77 77",
          date: "27/11/2024",
          avatar: "/avatars/user1.jpg",
          role: "owner",
        },
        {
          id: 2,
          name: "Ерасыл",
          email: "erasyl.m@mail.ru",
          telegram: "@erasyl",
          age: 18,
          phone: "8777 545 74 78",
          date: "27/11/2024",
          avatar: "/avatars/user2.jpg",
          role: "member",
        },
        {
          id: 3,
          name: "Айбол",
          email: "aibol.qazaq@gmail.com",
          telegram: "@aibol",
          age: 19,
          phone: "8701 577 77 78",
          date: "27/11/2024",
          avatar: "/avatars/user3.jpg",
          role: "member",
          isCurrentUser: true,
        },
      ],
      applicants: [],
      isUserMember: true,
      isUserAdmin: false,
      isUserSuperAdmin: false,
      isUserOwner: false,
    },
    {
      id: 2,
      name: "Компания друзей",
      status: "accepted",
      members: [
        {
          id: 4,
          name: "Марат",
          email: "marat@gmail.com",
          telegram: "@marat",
          age: 25,
          phone: "8700 123 45 67",
          date: "26/11/2024",
          avatar: "/avatars/user4.jpg",
          role: "owner",
          isCurrentUser: true,
        },
        {
          id: 5,
          name: "Алишер",
          email: "alisher@mail.ru",
          telegram: "@alisher",
          age: 22,
          phone: "8707 987 65 43",
          date: "26/11/2024",
          avatar: "/avatars/user5.jpg",
          role: "admin",
        },
        {
          id: 21,
          name: "Даурен",
          email: "dauren@mail.ru",
          telegram: "@dauren",
          age: 23,
          phone: "8777 888 99 00",
          date: "26/11/2024",
          avatar: "/avatars/user21.jpg",
          role: "member",
        },
      ],
      applicants: [],
      isUserMember: true,
      isUserAdmin: false,
      isUserSuperAdmin: true,
      isUserOwner: true,
    },
  ],
  pending: [
    {
      id: 3,
      name: "Новые соседи",
      status: "pending",
      members: [
        {
          id: 8,
          name: "Дина",
          email: "dina@gmail.com",
          telegram: "@dina",
          age: 26,
          phone: "8705 111 22 33",
          date: "23/11/2024",
          avatar: "/avatars/user8.jpg",
          role: "owner",
        },
        {
          id: 9,
          name: "Айдос",
          email: "aidos@gmail.com",
          telegram: "@aidos",
          age: 28,
          phone: "8777 333 44 55",
          date: "23/11/2024",
          avatar: "/avatars/user9.jpg",
          role: "admin",
        },
      ],
      applicants: [
        {
          id: 10,
          name: "Асем",
          email: "asem@gmail.com",
          telegram: "@asem",
          age: 24,
          phone: "8700 111 22 33",
          date: "23/11/2024",
          avatar: "/avatars/user10.jpg",
          role: "member",
          isCurrentUser: true,
        },
      ],
      isUserMember: true,
      isUserAdmin: false,
      isUserSuperAdmin: false,
      isUserOwner: false,
    },
    {
      id: 4,
      name: "Студенческая группа",
      status: "pending",
      members: [
        {
          id: 11,
          name: "Нурсултан",
          email: "nursultan@gmail.com",
          telegram: "@nursultan",
          age: 26,
          phone: "8700 444 55 66",
          date: "22/11/2024",
          avatar: "/avatars/user11.jpg",
          role: "owner",
          isCurrentUser: true,
        },
      ],
      applicants: [
        {
          id: 12,
          name: "Салтанат",
          email: "saltanat@mail.ru",
          telegram: "@saltanat",
          phone: "8700 444 55 66",
          date: "22/11/2024",
          avatar: "/avatars/user12.jpg",
          age: 23,
          groupApplicants: [
            {
              id: 13,
              name: "Дарига",
              email: "dariga@mail.ru",
              telegram: "@dariga",
              phone: "8701 555 66 77",
              date: "22/11/2024",
              avatar: "/avatars/user13.jpg",
              age: 24,
            },
          ],
        },
        {
          id: 13,
          name: "Алмас",
          email: "almas@gmail.com",
          telegram: "@almas",
          age: 22,
          phone: "8701 999 88 77",
          date: "20/11/2024",
          avatar: "/avatars/user13.jpg",
        },
      ],
      isUserMember: true,
      isUserAdmin: false,
      isUserSuperAdmin: false,
      isUserOwner: true,
    },
  ],
  rejected: [
    {
      id: 5,
      name: "Отклоненная группа",
      status: "rejected",
      members: [
        {
          id: 14,
          name: "Саят",
          email: "sayat@gmail.com",
          telegram: "@sayat",
          age: 28,
          phone: "8707 111 22 33",
          date: "21/11/2024",
          avatar: "/avatars/user14.jpg",
          role: "owner",
        },
      ],
      applicants: [
        {
          id: 15,
          name: "Мадина",
          email: "madina@mail.ru",
          telegram: "@madina",
          age: 25,
          phone: "8700 555 66 77",
          date: "21/11/2024",
          avatar: "/avatars/user15.jpg",
          role: "member",
          isCurrentUser: true,
        },
      ],
      isUserMember: true,
      isUserAdmin: false,
      isUserSuperAdmin: false,
      isUserOwner: false,
    },
  ],
  residents: [
    {
      id: 6,
      name: "Постоянные жильцы",
      status: "residents",
      members: [
        {
          id: 16,
          name: "Ержан",
          email: "yerzhan@gmail.com",
          telegram: "@yerzhan",
          age: 30,
          phone: "8707 888 99 00",
          date: "10/10/2024",
          avatar: "/avatars/user16.jpg",
          role: "owner",
        },
        {
          id: 17,
          name: "Алия",
          email: "aliya@mail.ru",
          telegram: "@aliya",
          age: 27,
          phone: "8700 777 88 99",
          date: "10/10/2024",
          avatar: "/avatars/user17.jpg",
          role: "member",
        },
      ],
      applicants: [],
      isUserMember: false,
      isUserAdmin: false,
      isUserSuperAdmin: false,
      isUserOwner: false,
    },
  ],
};

export default function ResponseGroupsPage() {
  const params = useParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getGroupsByTab = () => {
    switch (activeTab) {
      case "all":
        return [
          ...mockGroupsData.accepted,
          ...mockGroupsData.pending,
          ...mockGroupsData.rejected,
          ...mockGroupsData.residents,
        ];
      case "accepted":
        return mockGroupsData.accepted;
      case "pending":
        return mockGroupsData.pending;
      case "rejected":
        return mockGroupsData.rejected;
      case "residents":
        return mockGroupsData.residents;
      default:
        return [
          ...mockGroupsData.accepted,
          ...mockGroupsData.pending,
          ...mockGroupsData.rejected,
          ...mockGroupsData.residents,
        ];
    }
  };

  const filteredGroups = getGroupsByTab();

  if (!isMounted) {
    return <div>Загрузка...</div>;
  }

  return (
    <GroupDetailsPageLayout
      router={router}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      apartmentDetails={mockApartmentDetails}
    >
      {isMobile ? (
        <MobileGroupDetails apartmentDetails={mockApartmentDetails} groups={filteredGroups} />
      ) : (
        <DesktopGroupDetails apartmentDetails={mockApartmentDetails} groups={filteredGroups} />
      )}
    </GroupDetailsPageLayout>
  );
}
