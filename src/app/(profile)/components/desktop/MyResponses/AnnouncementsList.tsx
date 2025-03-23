import React from "react";
import { Tabs } from "antd";
import AnnouncementCard from "./AnnouncementCard";
import styles from "./AnnouncementsList.module.scss";
import "./AnnouncementsList.scss";
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

const DesktopAnnouncementsList: React.FC<AnnouncementsListProps> = ({
  announcements,
  activeTab,
  onTabChange,
  onCancelResponse,
}) => {
  return (
    <div className={styles.container}>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => onTabChange(key as "all" | "pending" | "accepted" | "rejected")}
        className={styles.tabs}
        items={[
          {
            key: "all",
            label: "Все",
            children: (
              <div className={styles.announcementsList}>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      onCancel={() => onCancelResponse(announcement.id)}
                    />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>У вас нет откликов</p>
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "pending",
            label: "В ожидании",
            children: (
              <div className={styles.announcementsList}>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      onCancel={() => onCancelResponse(announcement.id)}
                    />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>У вас нет откликов в ожидании</p>
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "accepted",
            label: "Принятые",
            children: (
              <div className={styles.announcementsList}>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>У вас нет принятых откликов</p>
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "rejected",
            label: "Отклоненные",
            children: (
              <div className={styles.announcementsList}>
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <p>У вас нет отклоненных откликов</p>
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
