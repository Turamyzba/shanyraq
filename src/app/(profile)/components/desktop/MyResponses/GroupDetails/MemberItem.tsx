import React from "react";
import { Button } from "antd";
import { Member, MemberRole, GroupStatus } from "./types";
import styles from "./GroupDetails.module.scss";

interface MemberItemProps {
  member: Member;
  groupStatus: GroupStatus;
  canRemove: boolean;
  canManageAdmins: boolean;
  onRemove?: (memberId: number) => void;
  onPromoteToAdmin?: (memberId: number) => void;
  onDemoteFromAdmin?: (memberId: number) => void;
}

const MemberItem: React.FC<MemberItemProps> = ({
  member,
  groupStatus,
  canRemove,
  canManageAdmins,
  onRemove,
  onPromoteToAdmin,
  onDemoteFromAdmin,
}) => {
  const isAccepted = groupStatus === "accepted";
  const limitedAccess = groupStatus !== "accepted";

  const getRoleBadge = (role?: MemberRole) => {
    if (!role) return null;

    let badgeClass = "";
    if (role === "owner") badgeClass = styles.ownerBadge;
    if (role === "admin") badgeClass = styles.adminBadge;
    if (role === "member") badgeClass = styles.memberBadge;

    const roleText = {
      owner: "Хозяин жилья",
      admin: "Админ группы",
      member: "Участник",
      invited: "Приглашен",
    };

    return <span className={badgeClass}>{roleText[role]}</span>;
  };

  const showManageButton = canManageAdmins && isAccepted && !member.isCurrentUser;
  const showPromoteButton = showManageButton && member.role === "member";
  const showDemoteButton = showManageButton && member.role === "admin";
  const showRemoveButton =
    canRemove && member.role !== "owner" && !member.isCurrentUser && isAccepted;

  return (
    <div className={styles.memberCard}>
      <div className={styles.memberInfo}>
        <div className={styles.tableUser}>
          <div
            className={styles.userAvatar}
            style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})` }}
          ></div>
          <div>
            <div className={styles.userName}>
              {member.isCurrentUser && <span className={styles.currentUserBadge}>Вы</span>}
              {member.name}

              {getRoleBadge(member.role)}
            </div>
            <div className={styles.userEmail}>
              {limitedAccess ? "******@***.***" : member.email}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.memberDetail}>
        {limitedAccess ? (
          <span className={styles.detailValue}>**</span>
        ) : (
          <span className={styles.detailValue}>{member.age ?? "Н/Д"}</span>
        )}
      </div>

      <div className={styles.memberDetail}>
        {limitedAccess ? (
          <span className={styles.detailValue}>*** *** ** **</span>
        ) : (
          <span className={styles.detailValue}>{member.phone ?? "Н/Д"}</span>
        )}
      </div>

      <div className={styles.memberDetail}>
        {limitedAccess ? (
          <span className={styles.detailValue}>**/**/****</span>
        ) : (
          <span className={styles.detailValue}>{member.date ?? "Н/Д"}</span>
        )}
      </div>

      <div className={styles.actionButtons}>
        <Button className={styles.actionButton}>Посмотреть анкету</Button>
        {!limitedAccess && <Button className={styles.actionButton}>Сопроводительное письмо</Button>}
      </div>

      <div className={styles.memberActions}>
        {showPromoteButton && (
          <Button
            className={styles.promoteButton}
            onClick={() => onPromoteToAdmin && onPromoteToAdmin(member.id)}
            icon={<AdminIcon />}
            title="Сделать администратором"
          />
        )}

        {showDemoteButton && (
          <Button
            className={styles.demoteButton}
            onClick={() => onDemoteFromAdmin && onDemoteFromAdmin(member.id)}
            icon={<DemoteIcon />}
            title="Понизить до участника"
          />
        )}

        {showRemoveButton && (
          <Button
            className={styles.removeButton}
            onClick={() => onRemove && onRemove(member.id)}
            danger
            icon={<TrashIcon />}
          />
        )}
      </div>
    </div>
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

export default MemberItem;
