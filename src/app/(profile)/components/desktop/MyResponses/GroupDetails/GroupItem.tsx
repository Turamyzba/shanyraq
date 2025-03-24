import React from "react";
import { Button } from "antd";
import { Group } from "./types";
import MembersList from "./MembersList";
import ApplicantsList from "./ApplicantsList";
import styles from "./GroupDetails.module.scss";

interface GroupItemProps {
  group: Group;
  onLeaveGroup?: (groupId: number) => void;
  onRemoveMember?: (groupId: number, memberId: number) => void;
  onAcceptApplicant?: (groupId: number, applicantId: number) => void;
  onRejectApplicant?: (groupId: number, applicantId: number) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  onLeaveGroup,
  onRemoveMember,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  const avatarLimit = 3;
  const displayedAvatars = group.members.slice(0, avatarLimit);
  const hasMoreAvatars = group.members.length > avatarLimit;
  const isPending = group.status === "pending";
  const isDraft = group.status === "draft";

  // Only admins and superadmins can remove members
  const canRemoveMembers = group.isUserAdmin || group.isUserSuperAdmin;

  // Only admins and superadmins can manage applicants
  const canManageApplicants = group.isUserAdmin || group.isUserSuperAdmin;

  // Users can leave groups if they're members but not superadmins
  const canLeaveGroup = group.isUserMember && !group.isUserSuperAdmin;

  // Get status text based on group status
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "В ожидании";
      case "accepted":
        return "Принята";
      case "rejected":
        return "Отклонена";
      case "draft":
        return "Черновик";
      default:
        return "";
    }
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupHeader}>
        <div className={styles.groupTitle}>
          <h3>{group.name}</h3>
          <div className={styles.avatarsRow}>
            {displayedAvatars.map((member, index) => (
              <div
                key={member.id}
                className={styles.avatar}
                style={{
                  backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})`,
                  zIndex: avatarLimit - index,
                }}
              />
            ))}
            {hasMoreAvatars && (
              <div className={styles.moreAvatars}>+{group.members.length - avatarLimit}</div>
            )}
          </div>
        </div>

        <div className={styles.groupStatusBadges}>
          {group.isUserMember && (
            <div
              className={`${styles.userStatusBadge} ${
                group.isUserSuperAdmin
                  ? styles.superAdminBadge
                  : group.isUserAdmin
                    ? styles.adminBadge
                    : styles.memberBadge
              }`}
            >
              {group.isUserSuperAdmin
                ? isDraft
                  ? "Вы создатель черновика"
                  : "Вы создатель группы"
                : group.isUserAdmin
                  ? "Вы администратор"
                  : "Вы участник группы"}
            </div>
          )}

          <div className={`${styles.groupStatusBadge} ${styles[group.status]}`}>
            {getStatusText(group.status)}
          </div>
        </div>
      </div>

      <MembersList
        members={group.members}
        isPending={isPending}
        isDraft={isDraft}
        canRemoveMembers={canRemoveMembers}
        onRemoveMember={(memberId) => onRemoveMember && onRemoveMember(group.id, memberId)}
      />

      {group.applicants.length > 0 && !isDraft && (
        <ApplicantsList
          applicants={group.applicants}
          isPending={isPending}
          canManageApplicants={canManageApplicants}
          onAcceptApplicant={(applicantId) =>
            onAcceptApplicant && onAcceptApplicant(group.id, applicantId)
          }
          onRejectApplicant={(applicantId) =>
            onRejectApplicant && onRejectApplicant(group.id, applicantId)
          }
        />
      )}

      {isDraft && (
        <div className={styles.draftActions}>
          <Button type="primary" className={styles.completeDraftButton}>
            Завершить черновик
          </Button>
          <Button className={styles.editDraftButton}>Редактировать</Button>
        </div>
      )}

      {canLeaveGroup && !isDraft && (
        <div className={styles.leaveGroupSection}>
          <Button
            onClick={() => onLeaveGroup && onLeaveGroup(group.id)}
            className={styles.leaveGroupButton}
            danger
          >
            Покинуть группу
          </Button>
        </div>
      )}
    </div>
  );
};

export default GroupItem;
