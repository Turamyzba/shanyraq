// components/mobile/MyAnnouncements/GroupsDetails/GroupsList.tsx

import React, { useState } from "react";
import { Button } from "antd";
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
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({});

  const toggleGroupExpanded = (groupId: number) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  if (groups.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className={styles.sectionHeader}>Группы ({groups.length})</h3>

      {groups.map((group) => (
        <div key={group.id} className={styles.groupCard}>
          <div className={styles.groupHeader}>
            <div className={styles.groupTitle}>
              <h3 className={styles.groupName}>{group.name}</h3>
              <div className={styles.avatarsRow}>
                {group.members.slice(0, 3).map((member) => (
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

            <div className={styles.expandToggle} onClick={() => toggleGroupExpanded(group.id)}>
              {expandedGroups[group.id] ? "Скрыть участников" : "Показать участников"}
              <span
                className={`${styles.expandIcon} ${expandedGroups[group.id] ? styles.expandIconRotated : ""}`}
              >
                ▼
              </span>
            </div>
          </div>

          {expandedGroups[group.id] && (
            <div className={styles.groupMembersList}>
              {group.members.map((member) => (
                <div key={member.id} className={styles.memberCard}>
                  <div className={styles.memberHeader}>
                    <div
                      className={styles.userAvatar}
                      style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})` }}
                    />
                    <div className={styles.memberHeaderInfo}>
                      <div className={styles.memberName}>
                        {member.username}
                        {member.isAdmin && <span className={styles.adminBadge}>Админ группы</span>}
                      </div>
                      <div className={styles.userEmail}>{member.email}</div>
                    </div>
                  </div>

                  <div className={styles.applicationContent}>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Телеграм</span>
                      <a
                        href={`https://t.me/${member.telegram.substring(1)}`}
                        className={styles.detailValue}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {member.telegram}
                      </a>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Возраст</span>
                      <span className={styles.detailValue}>{member.age}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Телефон</span>
                      <span className={styles.detailValue}>{member.phone}</span>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Дата</span>
                      <span className={styles.detailValue}>{member.date}</span>
                    </div>
                  </div>

                  <div className={styles.memberActions}>
                    <Button
                      className={styles.actionButton}
                      onClick={() => onShowQuestionnaire(member)}
                    >
                      Анкета
                    </Button>
                    <Button
                      className={styles.actionButton}
                      onClick={() => onShowCoverLetter(member)}
                    >
                      Письмо
                    </Button>
                    {!member.isAdmin && (
                      <button
                        className={styles.removeButton}
                        onClick={() => onRemoveMember(group.id, member.id)}
                      >
                        <TrashIcon />
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {group.newApplications.length > 0 && (
                <>
                  <h4 className={styles.groupApplicantsTitle}>Новые заявки в группу:</h4>
                  {group.newApplications.map((application) => (
                    <div key={application.id} className={styles.memberCard}>
                      <div className={styles.memberHeader}>
                        <div
                          className={styles.userAvatar}
                          style={{
                            backgroundImage: `url(https://i.pravatar.cc/150?u=${application.id})`,
                          }}
                        />
                        <div className={styles.memberHeaderInfo}>
                          <div className={styles.memberName}>{application.username}</div>
                          <div className={styles.userEmail}>{application.email}</div>
                        </div>
                      </div>

                      <div className={styles.applicationContent}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Телеграм</span>
                          <a
                            href={`https://t.me/${application.telegram.substring(1)}`}
                            className={styles.detailValue}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {application.telegram}
                          </a>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Возраст</span>
                          <span className={styles.detailValue}>{application.age}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Телефон</span>
                          <span className={styles.detailValue}>{application.phone}</span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Дата</span>
                          <span className={styles.detailValue}>{application.date}</span>
                        </div>
                      </div>

                      <div className={styles.memberActions}>
                        <Button
                          className={styles.actionButton}
                          onClick={() => onShowQuestionnaire(application)}
                        >
                          Анкета
                        </Button>
                        <Button
                          className={styles.actionButton}
                          onClick={() => onShowCoverLetter(application)}
                        >
                          Письмо
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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