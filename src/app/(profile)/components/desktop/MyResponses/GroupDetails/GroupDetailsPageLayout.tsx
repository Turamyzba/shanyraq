import React, { ReactNode } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { Button } from "antd";
import { ApartmentDetails } from "./types";
import ApartmentDetailsComponent from "./ApartmentDetails";
import styles from "./GroupDetails.module.scss";
import "./GroupDetails.scss";

interface GroupDetailsPageLayoutProps {
  children: ReactNode;
  router: AppRouterInstance;
  activeTab: string;
  onTabChange: (tab: string) => void;
  apartmentDetails: ApartmentDetails;
}

const GroupDetailsPageLayout: React.FC<GroupDetailsPageLayoutProps> = ({
  children,
  router,
  activeTab,
  onTabChange,
  apartmentDetails,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          type="text"
          icon={<BackIcon />}
          className={styles.backButton}
          onClick={() => router.push("/my-responses")}
        />
        <h1 className={styles.title}>Группы объявления</h1>
      </div>

      <ApartmentDetailsComponent details={apartmentDetails} />

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "all" ? styles.activeTab : ""}`}
            onClick={() => onTabChange("all")}
          >
            Все
          </button>
          <button
            className={`${styles.tab} ${activeTab === "accepted" ? styles.activeTab : ""}`}
            onClick={() => onTabChange("accepted")}
          >
            Принятые
          </button>
          <button
            className={`${styles.tab} ${activeTab === "pending" ? styles.activeTab : ""}`}
            onClick={() => onTabChange("pending")}
          >
            В ожидании
          </button>
          <button
            className={`${styles.tab} ${activeTab === "rejected" ? styles.activeTab : ""}`}
            onClick={() => onTabChange("rejected")}
          >
            Отклоненные
          </button>
        </div>
      </div>

      {children}
    </div>
  );
};

export default GroupDetailsPageLayout;

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
