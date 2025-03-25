// components/mobile/MyAnnouncements/GroupsDetails/ApplicationsList.tsx

import React, { useState } from "react";
import { Button } from "antd";
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
  const [expandedApplicants, setExpandedApplicants] = useState<Record<number, boolean>>({});

  const toggleApplicantsExpanded = (userId: number) => {
    setExpandedApplicants((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  if (applications.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className={styles.sectionHeader}>Новые заявки</h3>

      {applications.map((application) => (
        <div key={application.id} className={styles.applicationCard}>
          <div className={styles.applicationHeader}>
            <div
              className={styles.userAvatar}
              style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${application.id})` }}
            />
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {application.username}
                {application.groupApplicants && (
                  <span className={styles.applicationBadge}>
                    Группа ({application.groupApplicants.length + 1})
                  </span>
                )}
              </div>
              <div className={styles.userEmail}>{application.email}</div>
              <div className={styles.userRequest}>
                {application.wantsToCreateNewGroup
                  ? "Хочет создать новую группу"
                  : "Хочет присоединиться к Группе 1"}
              </div>
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

          {application.groupApplicants && application.groupApplicants.length > 0 && (
            <>
              <div
                className={styles.expandToggle}
                onClick={() => toggleApplicantsExpanded(application.id)}
              >
                {expandedApplicants[application.id] ? "Скрыть соседей" : "Показать соседей"}
                <span
                  className={`${styles.expandIcon} ${expandedApplicants[application.id] ? styles.expandIconRotated : ""}`}
                >
                  ▼
                </span>
              </div>

              {expandedApplicants[application.id] && (
                <div className={styles.groupApplicants}>
                  <h4 className={styles.groupApplicantsTitle}>Соседи по группе:</h4>
                  {application.groupApplicants.map((applicant) => (
                    <div key={applicant.id} className={styles.applicantItem}>
                      <div
                        className={styles.userAvatar}
                        style={{
                          backgroundImage: `url(https://i.pravatar.cc/150?u=${applicant.id})`,
                        }}
                      />
                      <div className={styles.userInfo}>
                        <div className={styles.userName}>{applicant.username}</div>
                        <div className={styles.userEmail}>{applicant.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div className={styles.applicationActions}>
            <Button
              className={styles.actionButton}
              onClick={() => onShowQuestionnaire(application)}
            >
              Анкета
            </Button>
            <Button className={styles.actionButton} onClick={() => onShowCoverLetter(application)}>
              Письмо
            </Button>
          </div>

          <div className={styles.applicationActions}>
            <Button
              className={styles.acceptButton}
              onClick={() => onAcceptApplication(application.id)}
              type="primary"
            >
              Принять
            </Button>
            <Button
              className={styles.rejectButton}
              onClick={() => onRejectApplication(application.id)}
              danger
            >
              Отклонить
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApplicationsList;
