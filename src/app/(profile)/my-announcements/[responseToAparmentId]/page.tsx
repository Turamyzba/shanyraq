"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { Button } from "antd";
import styles from "./styles.module.scss";

// Dynamically import components based on device type
const DesktopResponseList = dynamic(
  () => import("../../components/desktop/MyAnnouncements/ResponseDetails/ResponseList"),
  { ssr: false }
);
const MobileResponseList = dynamic(
  () => import("../../components/mobile/MyAnnouncements/ResponseDetails/ResponseList"),
  { ssr: false }
);

// Sample data for responses/applications
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
  applicationCount: 12,
  price: 150000,
  image: "/apartments/apartment1.jpg",
};

// Sample group data
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
    newApplications: [
      {
        id: 4,
        name: "Батырхан",
        email: "amantay11@gmail.com",
        age: 24,
        phone: "8777 777 77 77",
        date: "27/11/2024",
        avatar: "/avatars/user1.jpg",
      },
      {
        id: 5,
        name: "Ерасыл",
        email: "erasyl.m@mail.ru",
        age: 18,
        phone: "8777 545 74 78",
        date: "27/11/2024",
        avatar: "/avatars/user2.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Группа 2",
    members: [
      {
        id: 6,
        name: "Батырхан",
        email: "amantay11@gmail.com",
        age: 24,
        phone: "8777 777 77 77",
        date: "27/11/2024",
        avatar: "/avatars/user1.jpg",
        isOwner: true,
      },
      {
        id: 7,
        name: "Ерасыл",
        email: "erasyl.m@mail.ru",
        age: 18,
        phone: "8777 545 74 78",
        date: "27/11/2024",
        avatar: "/avatars/user2.jpg",
      },
      {
        id: 8,
        name: "Айбол",
        email: "aibol.qazaq@gmail.com",
        age: 19,
        phone: "8701 577 77 78",
        date: "27/11/2024",
        avatar: "/avatars/user3.jpg",
      },
    ],
    newApplications: [
      {
        id: 9,
        name: "Батырхан",
        email: "amantay11@gmail.com",
        age: 24,
        phone: "8777 777 77 77",
        date: "27/11/2024",
        avatar: "/avatars/user1.jpg",
      },
      {
        id: 10,
        name: "Ерасыл",
        email: "erasyl.m@mail.ru",
        age: 18,
        phone: "8777 545 74 78",
        date: "27/11/2024",
        avatar: "/avatars/user2.jpg",
      },
    ],
  },
];

export default function ApartmentResponsesPage() {
  const params = useParams();
  const router = useRouter();
  const apartmentId = params.apartmentId as string;
  const [groups, setGroups] = useState(mockGroups);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
    // In a real app, you would fetch the data here based on apartmentId
  }, [apartmentId]);

  const handleAcceptApplication = (groupId: number, applicationId: number) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          const application = group.newApplications.find((app) => app.id === applicationId);
          if (application) {
            return {
              ...group,
              members: [...group.members, application],
              newApplications: group.newApplications.filter((app) => app.id !== applicationId),
            };
          }
        }
        return group;
      })
    );
  };

  const handleRejectApplication = (groupId: number, applicationId: number) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            newApplications: group.newApplications.filter((app) => app.id !== applicationId),
          };
        }
        return group;
      })
    );
  };

  const handleRemoveMember = (groupId: number, memberId: number) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter((member) => member.id !== memberId),
          };
        }
        return group;
      })
    );
  };

  if (!isMounted) {
    return <div className="loading-placeholder">Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          className={styles.backButton}
          onClick={() => router.push("/my-announcements")}
          icon={<BackIcon />}
        >
          Назад
        </Button>
        <h1 className={styles.title}>Заявки на объявление</h1>
      </div>

      <div className={styles.apartmentDetails}>
        <div className={styles.apartmentImage}>
          <img
            src="https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg"
            alt={mockApartmentDetails.title}
          />
        </div>
        <div className={styles.apartmentInfo}>
          <div className={styles.infoMain}>
            <div className={styles.infoLeft}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Ул. Раймбека 181/23</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Мкр. Акцент 14</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Алматы г.</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>2 комнаты - 30 кв. м - 2/13 этаж</span>
              </div>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Можно заехать с 21.11.2024</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Депозит 50.000тг</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Ищем 2 девушек на подселение</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Количество заявок - 12</span>
              </div>
            </div>
          </div>
          <div className={styles.price}>{mockApartmentDetails.price.toLocaleString()} ₸</div>
        </div>
      </div>

      {isMobile ? (
        <MobileResponseList
          groups={groups}
          onAcceptApplication={handleAcceptApplication}
          onRejectApplication={handleRejectApplication}
          onRemoveMember={handleRemoveMember}
        />
      ) : (
        <DesktopResponseList
          groups={groups}
          onAcceptApplication={handleAcceptApplication}
          onRejectApplication={handleRejectApplication}
          onRemoveMember={handleRemoveMember}
        />
      )}
    </div>
  );
}

// Back icon component
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
