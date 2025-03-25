// components/desktop/MyAnnouncements/GroupsDetails/ApplicationsList.tsx

import React from "react";
import { Button, Collapse, Table } from "antd";
import { User } from "./types";
import styles from "./GroupsDetails.module.scss";

interface ApplicationsListProps {
  applications: User[];
  onAcceptApplication: (applicationId: number) => void;
  onRejectApplication: (applicationId: number) => void;
  onShowQuestionnaire: (user: User) => void;
  onShowCoverLetter: (user: User) => void;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  applications,
  onAcceptApplication,
  onRejectApplication,
  onShowQuestionnaire,
  onShowCoverLetter,
}) => {
  const applicantColumns = [
    {
      title: "Пользователь",
      key: "user",
      fixed: "left" as const,
      width: 320,
      render: (user: User) => (
        <div className={styles.tableUser}>
          <div
            className={styles.userAvatar}
            style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${user.id})` }}
          ></div>
          <div>
            <div className={styles.userName}>{user.username}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Телеграм",
      key: "telegram",
      width: 100,
      render: (user: User) => (
        <a
          href={`https://t.me/${user.telegram.substring(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.telegramLink}
        >
          {user.telegram}
        </a>
      ),
    },
    {
      title: "Возраст",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Контакты",
      dataIndex: "phone",
      key: "phone",
      width: 140,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "Действия",
      key: "actions",
      width: 260,
      render: (user: User) => (
        <div className={styles.actionButtons}>
          <Button onClick={() => onShowQuestionnaire(user)} className={styles.actionButton}>
            Посмотреть анкету
          </Button>
          <Button onClick={() => onShowCoverLetter(user)} className={styles.actionButton}>
            Сопроводительное письмо
          </Button>
        </div>
      ),
    },
  ];

  const newAppColumns = [
    {
      title: "Пользователь",
      key: "user",
      fixed: "left" as const,
      width: 320,
      render: (user: User) => (
        <div className={styles.tableUser}>
          <div
            className={styles.userAvatar}
            style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${user.id})` }}
          ></div>
          <div>
            <div className={styles.userName}>
              {user.username}
              {user.groupApplicants && user.groupApplicants.length > 0 && (
                <span className={styles.groupBadge}>
                  Группа ({user.groupApplicants.length + 1})
                </span>
              )}
            </div>
            <div className={styles.userEmail}>{user.email}</div>
            {user.wantsToCreateNewGroup ? (
              <div className={styles.groupRequest}>Хочет создать новую группу</div>
            ) : (
              <div className={styles.groupRequest}>Хочет присоединиться к Группе 1</div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Телеграм",
      key: "telegram",
      width: 100,
      render: (user: User) => (
        <a
          href={`https://t.me/${user.telegram.substring(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.telegramLink}
        >
          {user.telegram}
        </a>
      ),
    },
    {
      title: "Возраст",
      dataIndex: "age",
      key: "age",
      width: 100,
    },
    {
      title: "Контакты",
      dataIndex: "phone",
      key: "phone",
      width: 140,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 100,
    },
    {
      title: "Действия",
      key: "actions",
      width: 260,
      render: (user: User) => (
        <div className={styles.actionButtons}>
          <Button onClick={() => onShowQuestionnaire(user)} className={styles.actionButton}>
            Посмотреть анкету
          </Button>
          <Button onClick={() => onShowCoverLetter(user)} className={styles.actionButton}>
            Сопроводительное письмо
          </Button>
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      fixed: "right" as const,
      width: 100,
      render: (app: User) => (
        <div className={styles.actions}>
          <Button
            className={styles.acceptButton}
            onClick={() => onAcceptApplication(app.id)}
            type="primary"
            icon={<CheckIcon />}
          />
          <Button
            className={styles.rejectButton}
            onClick={() => onRejectApplication(app.id)}
            danger
            icon={<CloseIcon />}
          />
        </div>
      ),
    },
  ];

  return (
    <Collapse
      defaultActiveKey={["newApps"]}
      ghost
      expandIconPosition="start"
      className={styles.newApplicationsCollapse}
      items={[
        {
          key: "newApps",
          label: <h2 className={styles.sectionTitle}>Новые заявки</h2>,
          children: (
            <div className={styles.newApplicationsSection}>
              <Table
                className={styles.table}
                columns={newAppColumns}
                dataSource={applications}
                pagination={false}
                rowKey="id"
                scroll={{ x: "max-content", y: 400 }}
                expandable={{
                  expandedRowRender: (record) =>
                    record.groupApplicants && record.groupApplicants.length > 0 ? (
                      <div className={styles.groupApplicantsContainer}>
                        <h4 className={styles.groupApplicantsTitle}>Соседи по группе:</h4>
                        <Table
                          className={styles.nestedTable}
                          columns={applicantColumns}
                          dataSource={record.groupApplicants}
                          pagination={false}
                          rowKey="id"
                          scroll={{ x: "max-content", y: 400 }}
                        />
                      </div>
                    ) : null,
                  rowExpandable: (record) => record.groupApplicants?.length > 0,
                }}
              />
            </div>
          ),
        },
      ]}
    />
  );
};

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.6667 5L7.50001 14.1667L3.33334 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5L15 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ApplicationsList;