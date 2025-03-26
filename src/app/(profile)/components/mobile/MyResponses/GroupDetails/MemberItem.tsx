import React from "react";
import { Button } from "antd";
import { Member, MemberRole } from "../../../desktop/MyResponses/GroupDetails/types";
import styles from "./GroupDetails.module.scss";

interface MemberItemProps {
  member: Member;
  isPending: boolean;
  canRemove: boolean;
  onRemove?: (memberId: number) => void;
}

const MemberItem: React.FC<MemberItemProps> = ({ member, isPending, canRemove, onRemove }) => {
  const getRoleBadge = (role?: MemberRole) => {
    if (!role) return null;

    let badgeClass = styles.roleBadge;
    if (role === "owner") badgeClass = `${styles.roleBadge} ${styles.ownerBadge}`;
    if (role === "admin") badgeClass = `${styles.roleBadge} ${styles.adminBadge}`;
    if (role === "superadmin") badgeClass = `${styles.roleBadge} ${styles.superAdminBadge}`;

    const roleText = {
      owner: "Хозяин жилья",
      admin: "Администратор",
      superadmin: "Создатель группы",
      member: "Участник",
    };

    return <span className={badgeClass}>{roleText[role]}</span>;
  };

  return (
    <div className={styles.memberCard}>
      <div className={styles.memberHeader}>
        <div
          className={styles.memberAvatar}
          style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})` }}
        />
        <div className={styles.memberInfo}>
          <div className={styles.memberName}>
            {member.isCurrentUser && <span className={styles.currentUserBadge}>Вы</span>}
            {member.name}
          </div>
          {member.email && <div className={styles.memberEmail}>{member.email}</div>}
          {getRoleBadge(member.role)}
        </div>
      </div>

      {!isPending && (
        <div className={styles.memberDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Возраст:</span>
            <span className={styles.detailValue}>{member.age ?? "Н/Д"}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Телефон:</span>
            <span className={styles.detailValue}>{member.phone ?? "Н/Д"}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Дата:</span>
            <span className={styles.detailValue}>{member.date ?? "Н/Д"}</span>
          </div>
        </div>
      )}

      {canRemove &&
        member.role !== "owner" &&
        member.role !== "superadmin" &&
        !member.isCurrentUser && (
          <div className={styles.memberActions}>
            <Button
              className={styles.removeButton}
              onClick={() => onRemove && onRemove(member.id)}
              danger
            >
              <TrashIcon />
              Удалить
            </Button>
          </div>
        )}
    </div>
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

export default MemberItem;
