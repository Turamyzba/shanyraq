"use client";
import React from "react";
import AnnouncementCard from "../../common/AnnouncementCard/AnnouncementCard";
import styles from "./AnnouncementsList.module.scss";

interface Announcement {
  id: number;
  title: string;
  address: string;
  date: string;
  roomCount: number;
  genderRestriction: string;
  roommatesCount: number;
  price: number;
  image: string;
  applicationCount: number;
  animationClass?: string;
}

interface AnnouncementsListProps {
  announcements: Announcement[];
  activeTab: "active" | "archived";
  onTabChange: (tab: "active" | "archived") => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
}

const MobileAnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
  activeTab,
  onTabChange,
  onArchive,
  onRestore,
  onDelete,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "active" ? styles.activeTab : ""}`}
          onClick={() => onTabChange("active")}
        >
          Активные
        </button>
        <button
          className={`${styles.tab} ${activeTab === "archived" ? styles.activeTab : ""}`}
          onClick={() => onTabChange("archived")}
        >
          Архивированные
        </button>
      </div>

      <div className={styles.announcementsList}>
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`${styles.cardWrapper} ${announcement.animationClass ? styles[announcement.animationClass] : ""}`}
            >
              <AnnouncementCard
                announcement={announcement}
                isArchived={activeTab === "archived"}
                onArchive={() => onArchive(announcement.id)}
                onRestore={() => onRestore(announcement.id)}
                onDelete={() => onDelete(announcement.id)}
                isMobile={true}
              />
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>
              {activeTab === "active"
                ? "У вас нет активных объявлений"
                : "У вас нет архивированных объявлений"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileAnnouncementsList;