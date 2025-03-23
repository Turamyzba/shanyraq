"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { Button } from "antd";
import styles from "./styles.module.scss";

// Dynamically import components based on device type
const DesktopGroupList = dynamic(
  () => import("../../components/desktop/MyResponses/GroupDetails/GroupList"),
  { ssr: false }
);
const MobileGroupList = dynamic(
  () => import("../../components/mobile/MyResponses/GroupDetails/GroupList"),
  { ssr: false }
);

// Sample data for the announcement detail
const mockAnnouncementDetail = {
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
  status: "accepted", // pending, accepted, rejected
};

// Sample groups data
const mockGroups = [
  {
    id: 1,
    name: "Группа 1",
    members: [
      {
        id: 1,
        name: "Батырхан",
        email: "amantay11@gmail.com",
        age: 24,
        phone: "8777 777 77 77",
        date: "27/11/2024",
        avatar: "/avatars/user1.jpg",
        isOwner: true,
      },
      {
        id: 2,
        name: "Ерасыл",
        email: "erasyl.m@mail.ru",
        age: 18,
        phone: "8777 545 74 78",
        date: "27/11/2024",
        avatar: "/avatars/user2.jpg",
      },
      {
        id: 3,
        name: "Айбол",
        email: "aibol.qazaq@gmail.com",
        age: 19,
        phone: "8701 577 77 78",
        date: "27/11/2024",
        avatar: "/avatars/user3.jpg",
      },
    ],
    isUserMember: true,
    isUserGroupCreator: false,
  },
  {
    id: 2,
    name: "Группа 2",
    members: [
      {
        id: 4,
        name: "Марат",
        email: "marat@gmail.com",
        age: 25,
        phone: "8700 123 45 67",
        date: "26/11/2024",
        avatar: "/avatars/user4.jpg",
        isOwner: true,
      },
      {
        id: 5,
        name: "Алишер",
        email: "alisher@mail.ru",
        age: 22,
        phone: "8707 987 65 43",
        date: "26/11/2024",
        avatar: "/avatars/user5.jpg",
      },
    ],
    isUserMember: true,
    isUserGroupCreator: true,
  },
];

export default function ResponseGroupsPage() {
  const params = useParams();
  const router = useRouter();
  const announcementId = params.id as string;
  const [announcementDetail, setAnnouncementDetail] = useState(mockAnnouncementDetail);
  const [groups, setGroups] = useState(mockGroups);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
    // In a real app, you would fetch the data here based on announcementId
  }, [announcementId]);

  const handleLeaveGroup = (groupId: number) => {
    // In a real app, you would call an API to leave the group
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          className={styles.backButton}
          onClick={() => router.push("/my-responses")}
          icon={<BackIcon />}
        >
          Назад
        </Button>
        <h1 className={styles.title}>Группы объявления</h1>
      </div>

      <div className={styles.apartmentDetails}>
        <div className={styles.apartmentImage}>
          <img src={announcementDetail.image} alt={announcementDetail.title} />
        </div>
        <div className={styles.apartmentInfo}>
          <div className={styles.infoMain}>
            <div className={styles.infoLeft}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{announcementDetail.address}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{announcementDetail.district}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{announcementDetail.city}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{announcementDetail.roomDetails}</span>
              </div>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  Можно заехать с {announcementDetail.moveInDate}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Депозит {announcementDetail.deposit}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{announcementDetail.description}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoStatus}>
                  Статус:
                  <span className={`${styles.statusText} ${styles[announcementDetail.status]}`}>
                    {announcementDetail.status === "pending" && "В ожидании"}
                    {announcementDetail.status === "accepted" && "Принята"}
                    {announcementDetail.status === "rejected" && "Отклонена"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.price}>{announcementDetail.price.toLocaleString()} ₸</div>
        </div>
      </div>

      {isMobile ? (
        <MobileGroupList groups={groups} onLeaveGroup={handleLeaveGroup} />
      ) : (
        <DesktopGroupList groups={groups} onLeaveGroup={handleLeaveGroup} />
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
