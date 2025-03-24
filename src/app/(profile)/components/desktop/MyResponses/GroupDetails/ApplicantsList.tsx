import React from "react";
import { Collapse, Button } from "antd";
import { Member } from "./types";
import MemberItem from "./MemberItem";
import styles from "./GroupDetails.module.scss";

interface ApplicantsListProps {
  applicants: Member[];
  isPending: boolean;
  canManageApplicants: boolean;
  onAcceptApplicant?: (applicantId: number) => void;
  onRejectApplicant?: (applicantId: number) => void;
}

const { Panel } = Collapse;

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  applicants,
  isPending,
  canManageApplicants,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  if (!applicants.length) return null;

  return (
    <Collapse
      className={styles.collapse}
      expandIconPosition="end"
      bordered={false}
      defaultActiveKey={["applicants"]}
    >
      <Panel
        header={
          <span className={styles.panelHeader}>Заявки на присоединение ({applicants.length})</span>
        }
        key="applicants"
        className={styles.collapsePanel}
      >
        <div className={styles.applicantsList}>
          {applicants.map((applicant) => (
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
        </div>
      </Panel>
    </Collapse>
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
