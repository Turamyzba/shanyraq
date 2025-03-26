import React from "react";
import { Collapse, Table } from "antd";
import { Member, GroupStatus } from "./types";
import styles from "./GroupDetails.module.scss";

interface ApplicantsListProps {
  applicants: Member[];
  groupStatus: GroupStatus;
  canManageApplicants: boolean;
  onAcceptApplicant?: (applicantId: number) => void;
  onRejectApplicant?: (applicantId: number) => void;
}

const { Panel } = Collapse;

const ApplicantsList: React.FC<ApplicantsListProps> = ({
  applicants,
  groupStatus,
  canManageApplicants,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  if (!applicants.length) return null;

  // Limited access for pending or rejected groups
  const limitedAccess = groupStatus !== "accepted";

  const columns = [
    {
      title: "Пользователь",
      key: "user",
      fixed: "left" as const,
      width: 320,
      render: (applicant: Member) => (
        <div className={styles.tableUser}>
          <div
            className={styles.userAvatar}
            style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${applicant.id})` }}
          ></div>
          <div>
            <div className={styles.userName}>{applicant.name}</div>
            <div className={styles.userEmail}>
              {limitedAccess ? "******@***.***" : applicant.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Телеграм",
      key: "telegram",
      width: 100,
      render: (applicant: Member) =>
        limitedAccess ? (
          <span>@********</span>
        ) : (
          <a
            href={`https://t.me/${applicant.telegram?.substring(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramLink}
          >
            {applicant.telegram}
          </a>
        ),
    },
    {
      title: "Возраст",
      dataIndex: "age",
      key: "age",
      width: 100,
      render: (age: number) => (limitedAccess ? "**" : age),
    },
    {
      title: "Контакты",
      dataIndex: "phone",
      key: "phone",
      width: 140,
      render: (phone: string) => (limitedAccess ? "*** *** ** **" : phone),
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (date: string) => (limitedAccess ? "**/**/****" : date),
    },
    {
      title: "Действия",
      key: "actions",
      width: 260,
      render: (applicant: Member) => (
        <div className={styles.actionButtons}>
          <Button className={styles.actionButton}>Посмотреть анкету</Button>
          <Button className={styles.actionButton}>Сопроводительное письмо</Button>
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      fixed: "right" as const,
      width: 100,
      render: (applicant: Member) =>
        canManageApplicants && (
          <div className={styles.actions}>
            <Button
              className={styles.acceptButton}
              onClick={() => onAcceptApplicant && onAcceptApplicant(applicant.id)}
              type="primary"
              icon={<CheckIcon />}
            />
            <Button
              className={styles.rejectButton}
              onClick={() => onRejectApplicant && onRejectApplicant(applicant.id)}
              danger
              icon={<CloseIcon />}
            />
          </div>
        ),
    },
  ];

  return (
    <Collapse
      defaultActiveKey={["applicants"]}
      ghost
      expandIconPosition="start"
      className={styles.newApplicationsCollapse}
    >
      <Panel
        header={
          <h4 className={styles.applicationsSectionTitle}>
            Новые заявки <span>{applicants.length}</span>
          </h4>
        }
        key="applicants"
      >
        <Table
          className={styles.table}
          columns={columns}
          dataSource={applicants}
          pagination={false}
          rowKey="id"
          scroll={{ x: "max-content", y: 400 }}
        />
      </Panel>
    </Collapse>
  );
};

const Button = ({ className, onClick, icon, children, type, danger }: any) => (
  <button
    className={`${className} ${danger ? styles.danger : ""} ${type === "primary" ? styles.primary : ""}`}
    onClick={onClick}
  >
    {icon}
    {children}
  </button>
);

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

export default ApplicantsList;
