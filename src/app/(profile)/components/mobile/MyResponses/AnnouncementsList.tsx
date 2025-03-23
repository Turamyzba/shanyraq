import React from "react";
import AnnouncementCard from "./AnnouncementCard";
import styles from "./AnnouncementsList.module.scss";

interface Announcement {
  id: number;
  title: string;
  address: string;
  date: string;
  price: number;
  image: string;
  status: "pending" | "accepted" | "rejected";
  ownerName: string;
  groupCount: number;
  applicationDate: string;
}

interface AnnouncementsListProps {
  announcements: Announcement[];
  activeTab: "all" | "pending" | "accepted" | "rejected";
  onTabChange: (tab: "all" | "pending" | "accepted" | "rejected") => void;
  onCancelResponse: (id: number) => void;
}

const MobileAnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
  activeTab,
  onTabChange,
  onCancelResponse,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "all" ? styles.activeTab : ""}`}
          onClick={() => onTabChange("all")}
        >
          Все
        </button>
        <button
          className={`${styles.tab} ${activeTab === "pending" ? styles.activeTab : ""}`}
          onClick={() => onTabChange("pending")}
        >
          В ожидании
        </button>
        <button
          className={`${styles.tab} ${activeTab === "accepted" ? styles.activeTab : ""}`}
          onClick={() => onTabChange("accepted")}
        >
          Принятые
        </button>
        <button
          className={`${styles.tab} ${activeTab === "rejected" ? styles.activeTab : ""}`}
          onClick={() => onTabChange("rejected")}
        >
          Отклоненные
        </button>
      </div>

      <div className={styles.announcementsList}>
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onCancel={
                announcement.status === "pending"
                  ? () => onCancelResponse(announcement.id)
                  : undefined
              }
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>
              {activeTab === "all"
                ? "У вас нет откликов"
                : activeTab === "pending"
                  ? "У вас нет откликов в ожидании"
                  : activeTab === "accepted"
                    ? "У вас нет принятых откликов"
                    : "У вас нет отклоненных откликов"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAnnouncementsList;
