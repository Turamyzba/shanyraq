import React from "react";
import { Button, Collapse } from "antd";
import { Group } from "./types";
import MembersList from "./MembersList";
import ApplicantsList from "./ApplicantsList";
import styles from "./GroupDetails.module.scss";

interface GroupItemProps {
  group: Group;
  onLeaveGroup?: (groupId: number) => void;
  onRemoveMember?: (groupId: number, memberId: number) => void;
  onPromoteToAdmin?: (groupId: number, memberId: number) => void;
  onAcceptApplicant?: (groupId: number, applicantId: number) => void;
  onRejectApplicant?: (groupId: number, applicantId: number) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  onLeaveGroup,
  onRemoveMember,
  onPromoteToAdmin,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  const avatarLimit = 3;
  const displayedAvatars = group.members.slice(0, avatarLimit);
  const hasMoreAvatars = group.members.length > avatarLimit;
  const isPending = group.status === "pending";
  const isDraft = group.status === "draft";

  // Только админы и владельцы могут удалять участников
  const canRemoveMembers = group.isUserAdmin || group.isUserOwner;

  // Только владельцы могут повышать до админа
  const canPromoteToAdmin = group.isUserOwner;

  // Только админы и владельцы могут управлять заявками
  const canManageApplicants = group.isUserAdmin || group.isUserOwner;

  // Пользователи могут покинуть группы, если они участники, но не владельцы
  const canLeaveGroup = group.isUserMember && !group.isUserOwner;

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupHeader}>
        <div className={styles.groupTitle}>
          <h3>{group.name}</h3>
          <div className={styles.avatarsRow}>
            {displayedAvatars.map((member) => (
              <div
                key={member.id}
                className={styles.avatar}
                style={{
                  backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})`,
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
                group.isUserOwner
                  ? styles.ownerBadge
                  : group.isUserAdmin
                    ? styles.adminBadge
                    : styles.memberBadge
              }`}
            >
              {group.isUserOwner
                ? "Вы хозяин группы"
                : group.isUserAdmin
                  ? "Вы администратор"
                  : "Вы участник группы"}
            </div>
          )}
          <div className={`${styles.groupStatusBadge} ${styles[group.status]}`}>
            {group.status === "pending" && "В ожидании"}
            {group.status === "accepted" && "Принята"}
            {group.status === "rejected" && "Отклонена"}
            {group.status === "draft" && "Черновик"}
          </div>
        </div>
      </div>

      <MembersList
        members={group.members}
        isPending={isPending}
        isDraft={isDraft}
        canRemoveMembers={canRemoveMembers}
        canPromoteToAdmin={canPromoteToAdmin}
        onRemoveMember={(memberId) => onRemoveMember && onRemoveMember(group.id, memberId)}
        onPromoteToAdmin={(memberId) => onPromoteToAdmin && onPromoteToAdmin(group.id, memberId)}
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
