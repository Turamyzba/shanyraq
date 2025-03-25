import React from "react";
import { Collapse, Table } from "antd";
import { Member } from "./types";
import MemberItem from "./MemberItem";
import styles from "./GroupDetails.module.scss";

interface MembersListProps {
  members: Member[];
  isPending: boolean;
  isDraft?: boolean;
  canRemoveMembers: boolean;
  canPromoteToAdmin: boolean;
  onRemoveMember?: (memberId: number) => void;
  onPromoteToAdmin?: (memberId: number) => void;
}

const { Panel } = Collapse;

const MembersList: React.FC<MembersListProps> = ({
  members,
  isPending,
  isDraft = false,
  canRemoveMembers,
  canPromoteToAdmin,
  onRemoveMember,
  onPromoteToAdmin,
}) => {
  if (!members.length) return null;

  // Если это черновик, показываем приглашенных участников отдельно
  const regularMembers = isDraft ? members.filter((member) => member.role !== "invited") : members;
  const invitedMembers = isDraft ? members.filter((member) => member.role === "invited") : [];

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
              {member.name}
              {member.isCurrentUser && <span className={styles.currentUserBadge}>Вы</span>}
              {member.role === "admin" && <span className={styles.adminBadge}>Админ группы</span>}
              {member.role === "owner" && <span className={styles.ownerBadge}>Хозяин жилья</span>}
            </div>
            <div className={styles.userEmail}>{member.email}</div>
          </div>
        </div>
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
      render: (member: Member) => (
        <div className={styles.actionButtons}>
          <Button className={styles.actionButton}>Посмотреть анкету</Button>
          <Button className={styles.actionButton}>Сопроводительное письмо</Button>
        </div>
      ),
    },
    {
      title: "",
      key: "manage",
      fixed: "right" as const,
      width: 100,
      render: (member: Member) => (
        <div className={styles.memberActions}>
          {canPromoteToAdmin && member.role === "member" && !member.isCurrentUser && (
            <Button
              className={styles.promoteButton}
              onClick={() => onPromoteToAdmin && onPromoteToAdmin(member.id)}
              icon={<AdminIcon />}
            />
          )}
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
            <h2 className={styles.panelHeader}>
              {isDraft ? "Создатели черновика" : "Участники группы"} ({regularMembers.length})
            </h2>
          }
          key="members"
        >
          <Table
            className={styles.table}
            columns={columns}
            dataSource={regularMembers}
            pagination={false}
            rowKey="id"
            scroll={{ x: "max-content", y: 400 }}
          />
        </Panel>
      </Collapse>

      {isDraft && invitedMembers.length > 0 && (
        <Collapse
          defaultActiveKey={["invited"]}
          ghost
          expandIconPosition="end"
          className={styles.newApplicationsCollapse}
        >
          <Panel
            header={
              <h2 className={styles.panelHeader}>
                Приглашенные участники ({invitedMembers.length})
              </h2>
            }
            key="invited"
          >
            <Table
              className={styles.table}
              columns={columns}
              dataSource={invitedMembers}
              pagination={false}
              rowKey="id"
              scroll={{ x: "max-content", y: 400 }}
            />
          </Panel>
        </Collapse>
      )}
    </>
  );
};

const Button = ({ className, onClick, icon, children, danger }: any) => (
  <button className={`${className} ${danger ? styles.danger : ""}`} onClick={onClick}>
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

export default MembersList;
