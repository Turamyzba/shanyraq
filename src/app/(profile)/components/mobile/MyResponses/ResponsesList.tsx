import React from "react";
import ResponseCard from "./AnnouncementCard";
import styles from "./ResponsesList.module.scss";

interface Response {
  id: number;
  title: string;
  address: string;
  date: string;
  price: number;
  image: string;
  status: "pending" | "accepted" | "rejected";
  ownerName: string;
  ownerId: number;
  applicationDate: string;
  memberCount: number;
  isGroupCreator: boolean;
}

interface ResponsesListProps {
  responses: Response[];
  activeTab: "all" | "pending" | "accepted" | "rejected";
  onTabChange: (tab: "all" | "pending" | "accepted" | "rejected") => void;
  onCancelResponse: (id: number) => void;
  onLeaveGroup: (id: number) => void;
}

const MobileResponsesList: React.FC<ResponsesListProps> = ({
  responses,
  activeTab,
  onTabChange,
  onCancelResponse,
  onLeaveGroup,
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

      <div className={styles.responsesList}>
        {responses.length > 0 ? (
          responses.map((response) => (
            <ResponseCard
              key={response.id}
              response={response}
              onCancel={() => onCancelResponse(response.id)}
              onLeave={() => onLeaveGroup(response.id)}
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

export default MobileResponsesList;
