import React from "react";
import { Collapse, Table } from "antd";
import { Member, GroupStatus } from "./types";
import styles from "./GroupDetails.module.scss";
import Images from '@/components/common/Images'
interface MembersListProps {
  members: Member[];
  groupStatus: GroupStatus;
  isRejected: boolean;
  canRemoveMembers: boolean;
  canManageAdmins: boolean;
  onRemoveMember?: (memberId: number) => void;
  onPromoteToAdmin?: (memberId: number) => void;
  onDemoteFromAdmin?: (memberId: number) => void;
}

const { Panel } = Collapse;

const MembersList: React.FC<MembersListProps> = ({
  members,
  groupStatus,
  isRejected,
  canRemoveMembers,
  canManageAdmins,
  onRemoveMember,
  onPromoteToAdmin,
  onDemoteFromAdmin,
}) => {
  if (!members.length) return null;

  // Limited access for pending or rejected groups if not current user
  const limitedAccess = groupStatus !== "accepted";

  // Filter out current user for pending/rejected groups (they appear in applicants)
  const filteredMembers = members.filter(
    (member) => groupStatus === "accepted" || !member.isCurrentUser || member.role === "owner"
  );

  if (filteredMembers.length === 0) return null;

  const columns = [
    {
      title: "Пользователь",
      key: "user",
      fixed: "left" as const,
      width: 320,
      render: (member: Member) => (
        <div className={styles.tableUser}>
          <div
            className={styles.userAvatar}
            style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})` }}
          ></div>
          <div>
            <div className={styles.userName}>
              {member.isCurrentUser && <span className={styles.currentUserBadge}>Вы</span>}
              {member.name}

              {!limitedAccess && member.role === "admin" && (
                <span className={styles.adminBadge}>Админ группы</span>
              )}
              {!limitedAccess && member.role === "owner" && (
                <span className={styles.ownerBadge}>Создатель объявления</span>
              )}
            </div>
            <div className={styles.userEmail}>
              {limitedAccess && !member.isCurrentUser ? "******@***.***" : member.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Телеграм",
      key: "telegram",
      width: 100,
      render: (member: Member) =>
        limitedAccess && !member.isCurrentUser ? (
          <span>@********</span>
        ) : (
          <a
            href={`https://t.me/${member.telegram?.substring(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramLink}
          >
            {member.telegram}
          </a>
        ),
    },
    {
      title: "Возраст",
      dataIndex: "age",
      key: "age",
      width: 100,
      render: (age: number, member: Member) =>
        limitedAccess && !member.isCurrentUser ? "**" : age,
    },
    {
      title: "Контакты",
      dataIndex: "phone",
      key: "phone",
      width: 140,
      render: (phone: string, member: Member) =>
        limitedAccess && !member.isCurrentUser ? "*** *** ** **" : phone,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      width: 100,
      render: (date: string, member: Member) =>
        limitedAccess && !member.isCurrentUser ? "**/**/****" : date,
    },
    {
      title: "Действия",
      key: "actions",
      width: 260,
      render: (member: Member) => (
        <div className={styles.actionButtons}>
          <Button className={styles.actionButton}>Посмотреть анкету</Button>
          {(!limitedAccess || member.isCurrentUser) && (
            <Button className={styles.actionButton}>Сопроводительное письмо</Button>
          )}
        </div>
      ),
    },
    {
      title: "",
      key: "manage",
      fixed: "right" as const,
      width: 120,
      render: (member: Member) =>
        !limitedAccess && (
          <div className={styles.memberActions}>
            {canManageAdmins &&
              !member.isCurrentUser &&
              (member.role === "member" ? (
                <Button
                  className={styles.promoteButton}
                  onClick={() => onPromoteToAdmin && onPromoteToAdmin(member.id)}
                  icon={<Images.AddAdmin  size={15}/>}
                  title="Сделать администратором"
                />
              ) : (
                member.role === "admin" && (
                  <Button
                    className={styles.demoteButton}
                    onClick={() => onDemoteFromAdmin && onDemoteFromAdmin(member.id)}
                    icon={<Images.AddAdmin size={15} />}
                    title="Понизить до участника"
                  />
                )
              ))}
            {canRemoveMembers && member.role !== "owner" && !member.isCurrentUser && (
              <Button
                className={styles.removeButton}
                onClick={() => onRemoveMember && onRemoveMember(member.id)}
                danger
                icon={<TrashIcon />}
              />
            )}
          </div>
        ),
    },
  ];

  return (
    <>
      <Collapse
        defaultActiveKey={["members"]}
        ghost
        expandIconPosition="start"
        className={styles.newApplicationsCollapse}
      >
        <Panel
          header={
            <h2 className={styles.panelHeader}>Участники группы ({filteredMembers.length})</h2>
          }
          key="members"
        >
          <Table
            className={styles.table}
            columns={columns}
            dataSource={filteredMembers}
            pagination={false}
            rowKey="id"
            scroll={{ x: "max-content", y: 400 }}
          />
        </Panel>
      </Collapse>
    </>
  );
};

const Button = ({ className, onClick, icon, children, danger, title }: any) => (
  <button className={`${className} ${danger ? styles.danger : ""}`} onClick={onClick} title={title}>
    {icon}
    {children}
  </button>
);

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

const AdminIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.6667 5.83333L7.5 15L3.33333 10.8333L4.16667 10L7.5 13.3333L15.8333 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DemoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 10H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MembersList;
