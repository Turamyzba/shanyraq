import React, { useState } from "react";
import { Button } from "antd";
import { Member } from "../../../desktop/MyResponses/GroupDetails/types";
import MemberItem from "./MemberItem";
import styles from "./GroupDetails.module.scss";

interface ApplicantsListProps {
  applicants: Member[];
  isPending: boolean;
  canManageApplicants: boolean;
  onAcceptApplicant?: (applicantId: number) => void;
  onRejectApplicant?: (applicantId: number) => void;
}

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  applicants,
  isPending,
  canManageApplicants,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!applicants.length) return null;

  // By default, show only 2 applicants in collapsed state
  const displayCount = expanded ? applicants.length : Math.min(applicants.length, 2);
  const displayApplicants = applicants.slice(0, displayCount);
  const hasMore = applicants.length > 2;

  return (
    <div className={styles.applicantsListContainer}>
      <div className={styles.sectionHeader}>
        <h3>Заявки на присоединение ({applicants.length})</h3>
      </div>

      <div className={styles.applicantsList}>
        {displayApplicants.map((applicant) => (
          <div key={applicant.id} className={styles.applicantContainer}>
            <MemberItem member={applicant} isPending={isPending} canRemove={false} />

            {canManageApplicants && (
              <div className={styles.applicantActions}>
                <Button
                  className={styles.acceptButton}
                  onClick={() => onAcceptApplicant && onAcceptApplicant(applicant.id)}
                  type="primary"
                >
                  <CheckIcon />
                  Принять
                </Button>
                <Button
                  className={styles.rejectButton}
                  onClick={() => onRejectApplicant && onRejectApplicant(applicant.id)}
                  danger
                >
                  <CloseIcon />
                  Отклонить
                </Button>
              </div>
            )}
          </div>
        ))}

        {hasMore && (
          <div className={styles.expandToggle} onClick={() => setExpanded(!expanded)}>
            {expanded ? "Свернуть список" : "Показать все заявки"}
            <span className={`${styles.expandIcon} ${expanded ? styles.expanded : ""}`}>▼</span>
          </div>
        )}
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default ApplicantsList;
