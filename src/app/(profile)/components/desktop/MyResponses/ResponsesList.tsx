import React from "react";
import { Tabs } from "antd";
import ResponseCard from "./ResponseCard";
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

const DesktopResponsesList: React.FC<ResponsesListProps> = ({
  responses,
  activeTab,
  onTabChange,
  onCancelResponse,
  onLeaveGroup,
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

export default DesktopResponsesList;
