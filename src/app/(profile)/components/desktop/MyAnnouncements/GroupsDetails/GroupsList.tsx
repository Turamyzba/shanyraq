// components/desktop/MyAnnouncements/GroupsDetails/GroupsList.tsx

import React from "react";
import { Button, Collapse, Table } from "antd";
import { Group, User } from "./types";
import styles from "./GroupsDetails.module.scss";

interface GroupsListProps {
  groups: Group[];
  onRemoveMember: (groupId: number, memberId: number) => void;
  onShowQuestionnaire: (user: User) => void;
  onShowCoverLetter: (user: User) => void;
}

const GroupsList: React.FC<GroupsListProps> = ({
  groups,
  onRemoveMember,
  onShowQuestionnaire,
  onShowCoverLetter,
}) => {
  const userColumns = [
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
              {user.isAdmin && <span className={styles.adminBadge}>Админ группы</span>}
            </div>
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
    {
      title: "",
      key: "remove",
      fixed: "right" as const,
      width: 60,
      render: (user: User, record: any) => {
        return (
          <Button
            className={styles.removeButton}
            onClick={() => onRemoveMember(record.group.id, user.id)}
            icon={<TrashIcon />}
          />
        );
      },
    },
  ];

  const groupAppColumns = [
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

  return (
    <>
      <h2 className={styles.groupsTitle}>Количество групп: {groups.length}</h2>

      <div className={styles.groupsList}>
        {groups.map((group) => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <div className={styles.groupTitle}>
                <h3>{group.name}</h3>
                <div className={styles.avatarsRow}>
                  {group.members.slice(0, 3).map((member, index) => (
                    <div
                      key={member.id}
                      className={styles.avatar}
                      style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})` }}
                    />
                  ))}
                  {group.members.length > 3 && (
                    <div className={styles.moreAvatars}>+{group.members.length - 3}</div>
                  )}
                </div>
              </div>
            </div>

            <Collapse
              defaultActiveKey={["members"]}
              ghost
              expandIconPosition="start"
              items={[
                {
                  key: "members",
                  label: <div className={styles.collapseHeader}>Участники группы</div>,
                  children: (
                    <div>
                      <Table
                        className={styles.table}
                        columns={userColumns}
                        dataSource={group.members.map((member) => ({ ...member, group }))}
                        pagination={false}
                        rowKey="id"
                        scroll={{ x: "max-content", y: 400 }}
                      />
                      {group.newApplications && group.newApplications.length > 0 && (
                        <>
                          <h4 className={styles.applicationsSectionTitle}>Новые заявки</h4>
                          <div className={styles.groupNewApplications}>
                            <Table
                              className={styles.table}
                              columns={groupAppColumns}
                              dataSource={group.newApplications}
                              pagination={false}
                              rowKey="id"
                              scroll={{ x: "max-content", y: 400 }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        ))}
      </div>
    </>
  );
};

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 5H4.16667H17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66669 5.00008V3.33341C6.66669 2.89139 6.8423 2.46746 7.15486 2.1549C7.46742 1.84234 7.89135 1.66675 8.33335 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1578 2.46746 13.3334 2.89139 13.3334 3.33341V5.00008"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8333 5.00008V16.6667C15.8333 17.1088 15.6577 17.5327 15.3451 17.8453C15.0326 18.1578 14.6087 18.3334 14.1667 18.3334H5.83333C5.39131 18.3334 4.96738 18.1578 4.65482 17.8453C4.34226 17.5327 4.16667 17.1088 4.16667 16.6667V5.00008"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default GroupsList;
