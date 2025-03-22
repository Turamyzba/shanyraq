import React from "react";
import { Tabs } from "antd";
import AnnouncementCard from "../../common/AnnouncementCard/AnnouncementCard";
import styles from "./AnnouncementsList.module.scss";
import './AnnouncementsList.scss'
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
}

interface AnnouncementsListProps {
  announcements: Announcement[];
  activeTab: "active" | "archived";
  onTabChange: (tab: "active" | "archived") => void;
  onArchive: (id: number) => void;
  onUnarchive: (id: number) => void;
}

const DesktopAnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
  activeTab,
  onTabChange,
  onArchive,
  onUnarchive,
}) => {
  return (
    <div className={styles.container}>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => onTabChange(key as "active" | "archived")}
        className={styles.tabs}
        items={[
          {
            key: "active",
            label: "Активные",
            children: (
              <div className={styles.announcementsGrid}>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      onArchive={() => onArchive(announcement.id)}
                    />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>У вас нет активных объявлений</p>
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "archived",
            label: "Архивированные",
            children: (
              <div className={styles.announcementsGrid}>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      onArchive={() => onUnarchive(announcement.id)}
                    />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>У вас нет архивированных объявлений</p>
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default DesktopAnnouncementsList;
