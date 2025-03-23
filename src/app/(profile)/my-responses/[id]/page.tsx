"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { Button } from "antd";
import styles from "./styles.module.scss";

// Dynamically import components based on device type
const DesktopResponseDetail = dynamic(
  () => import("../../components/mobile/MyResponses/ResponseDetail/ResponseDetail"),
  { ssr: false }
);
const MobileResponseDetail = dynamic(
  () => import("../../components/desktop/MyResponses/ResponseDetail/ResponseDetail"),
  { ssr: false }
);

// Sample data for the response detail
const mockResponseDetail = {
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
  image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
  status: "accepted", // pending, accepted, rejected
  ownerName: "Батырхан",
  ownerId: 1,
  applicationDate: "27/11/2024",
  isGroupCreator: true,
};

// Sample group data with members and status
const mockGroup = {
  id: 1,
  name: "Группа 1",
  status: "accepted", // pending, accepted, rejected
  members: [
    {
      id: 1,
      name: "Батырхан",
      email: "amantay11@gmail.com",
      age: 24,
      phone: "8777 777 77 77",
      date: "27/11/2024",
      avatar: "https://i.pravatar.cc/150?u=1",
      isOwner: true,
    },
    {
      id: 2,
      name: "Ерасыл",
      email: "erasyl.m@mail.ru",
      age: 18,
      phone: "8777 545 74 78",
      date: "27/11/2024",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Айбол",
      email: "aibol.qazaq@gmail.com",
      age: 19,
      phone: "8701 577 77 78",
      date: "27/11/2024",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
  ],
  newApplications: [
    {
      id: 4,
      name: "Алмас",
      email: "almas@gmail.com",
      age: 22,
      phone: "8707 123 45 67",
      date: "29/11/2024",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
  ],
};

export default function ResponseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const responseId = params.id as string;
  const [responseDetail, setResponseDetail] = useState(mockResponseDetail);
  const [group, setGroup] = useState(mockGroup);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsMounted(true);
    // In a real app, you would fetch the data here based on responseId
  }, [responseId]);

  const handleAcceptApplication = (applicationId: number) => {
    setGroup((prev) => {
      const application = prev.newApplications.find((app) => app.id === applicationId);
      if (!application) return prev;

      return {
        ...prev,
        members: [...prev.members, application],
        newApplications: prev.newApplications.filter((app) => app.id !== applicationId),
      };
    });
  };

  const handleRejectApplication = (applicationId: number) => {
    setGroup((prev) => ({
      ...prev,
      newApplications: prev.newApplications.filter((app) => app.id !== applicationId),
    }));
  };

  const handleRemoveMember = (memberId: number) => {
    setGroup((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.id !== memberId),
    }));
  };

  const handleLeaveGroup = () => {
    // In a real app, you would make an API call
    router.push("/my-responses");
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
        <h1 className={styles.title}>
          {responseDetail.isGroupCreator ? "Ваша группа" : "Информация о заявке"}
        </h1>
      </div>

      <div className={styles.apartmentDetails}>
        <div className={styles.apartmentImage}>
          <img src={responseDetail.image} alt={responseDetail.title} />
        </div>
        <div className={styles.apartmentInfo}>
          <div className={styles.infoMain}>
            <div className={styles.infoLeft}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{responseDetail.address}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{responseDetail.district}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{responseDetail.city}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{responseDetail.roomDetails}</span>
              </div>
            </div>
            <div className={styles.infoRight}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>
                  Можно заехать с {responseDetail.moveInDate}
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Депозит {responseDetail.deposit}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>{responseDetail.description}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoStatus}>
                  Статус:
                  <span className={`${styles.statusText} ${styles[responseDetail.status]}`}>
                    {responseDetail.status === "pending" && "В ожидании"}
                    {responseDetail.status === "accepted" && "Принята"}
                    {responseDetail.status === "rejected" && "Отклонена"}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.price}>{responseDetail.price.toLocaleString()} ₸</div>
        </div>
      </div>

      {isMobile ? (
        <MobileResponseDetail
          group={group}
          responseDetail={responseDetail}
          onAcceptApplication={handleAcceptApplication}
          onRejectApplication={handleRejectApplication}
          onRemoveMember={handleRemoveMember}
          onLeaveGroup={handleLeaveGroup}
        />
      ) : (
        <DesktopResponseDetail
          group={group}
          responseDetail={responseDetail}
          onAcceptApplication={handleAcceptApplication}
          onRejectApplication={handleRejectApplication}
          onRemoveMember={handleRemoveMember}
          onLeaveGroup={handleLeaveGroup}
        />
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
