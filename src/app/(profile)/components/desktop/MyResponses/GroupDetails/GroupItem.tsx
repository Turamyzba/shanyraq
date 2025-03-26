import React from "react";
import { Button, Collapse, Tooltip } from "antd";
import { Group } from "./types";
import MembersList from "./MembersList";
import ApplicantsList from "./ApplicantsList";
import styles from "./GroupDetails.module.scss";

interface GroupItemProps {
  group: Group;
  onLeaveGroup?: (groupId: number) => void;
  onCancelApplication?: (groupId: number) => void;
  onRemoveMember?: (groupId: number, memberId: number) => void;
  onPromoteToAdmin?: (groupId: number, memberId: number) => void;
  onDemoteFromAdmin?: (groupId: number, memberId: number) => void;
  onAcceptApplicant?: (groupId: number, applicantId: number) => void;
  onRejectApplicant?: (groupId: number, applicantId: number) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  onLeaveGroup,
  onCancelApplication,
  onRemoveMember,
  onPromoteToAdmin,
  onDemoteFromAdmin,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  const avatarLimit = 3;
  const displayedAvatars = group.members.slice(0, avatarLimit);
  const hasMoreAvatars = group.members.length > avatarLimit;
  const isPending = group.status === "pending";
  const isRejected = group.status === "rejected";
  const isAccepted = group.status === "accepted";

  // Only admins and creators can remove members
  const canRemoveMembers = group.isUserAdmin || group.isUserOwner;

  // Only creators can promote to admin or demote from admin
  const canManageAdmins = group.isUserOwner && isAccepted;

  // Only admins and creators can manage applicants
  const canManageApplicants = group.isUserAdmin || group.isUserOwner;

  // Users can leave groups if they are members but not the creator
  const canLeaveGroup = group.isUserMember && !group.isUserOwner && isAccepted;

  // Users can cancel their application if the status is pending
  const canCancelApplication = group.isUserMember && isPending;

  const getGroupBorderClass = () => {
    if (group.status === "accepted") return styles.acceptedGroupBorder;
    if (group.status === "pending") return styles.pendingGroupBorder;
    if (group.status === "rejected") return styles.rejectedGroupBorder;
    return "";
  };

  const isJointApplication = group.isJointApplication && isPending;

  return (
    <div className={`${styles.groupCard} ${getGroupBorderClass()}`}>
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
          {group.isUserMember && !isRejected && (
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
                ? "Вы создатель объявления"
                : group.isUserAdmin
                  ? "Вы администратор"
                  : isAccepted
                    ? "Вы участник группы"
                    : ""}
            </div>
          )}
          {isJointApplication ? (
            <Tooltip title="Заявка ещё не отправлена. Чтобы отправить заявку, ваши друзья должны заполнить анкету">
              <div className={`${styles.groupStatusBadge} ${styles.jointApplicationBadge}`}>
                Черновик
              </div>
            </Tooltip>
          ) : (
            <div className={`${styles.groupStatusBadge} ${styles[group.status]}`}>
              {group.status === "pending" && "В ожидании"}
              {group.status === "accepted" && "Принята"}
              {group.status === "rejected" && "Отклонена"}
            </div>
          )}
        </div>
      </div>

      <MembersList
        members={group.members}
        groupStatus={group.status}
        isRejected={isRejected}
        canRemoveMembers={canRemoveMembers}
        canManageAdmins={canManageAdmins}
        onRemoveMember={(memberId) => onRemoveMember && onRemoveMember(group.id, memberId)}
        onPromoteToAdmin={(memberId) => onPromoteToAdmin && onPromoteToAdmin(group.id, memberId)}
        onDemoteFromAdmin={(memberId) => onDemoteFromAdmin && onDemoteFromAdmin(group.id, memberId)}
      />

      {group.applicants && group.applicants.length > 0 && !isJointApplication && (
        <ApplicantsList
          applicants={group.applicants}
          groupStatus={group.status}
          canManageApplicants={canManageApplicants}
          onAcceptApplicant={(applicantId) =>
            onAcceptApplicant && onAcceptApplicant(group.id, applicantId)
          }
          onRejectApplicant={(applicantId) =>
            onRejectApplicant && onRejectApplicant(group.id, applicantId)
          }
        />
      )}

      {isJointApplication && (
        <div className={styles.jointApplicationActions}>
          <Button type="primary" className={styles.completeApplicationButton}>
            Завершить заявку
          </Button>
          <Button className={styles.editApplicationButton}>Редактировать</Button>
        </div>
      )}

      {canCancelApplication && (
        <div className={styles.leaveGroupSection}>
          <Button
            onClick={() => onCancelApplication && onCancelApplication(group.id)}
            className={styles.cancelButton}
            danger
          >
            Отменить
          </Button>
        </div>
      )}

      {isRejected && (
        <div className={styles.leaveGroupSection}>
          <Button className={styles.cancelButton} danger disabled>
            Отменить
          </Button>
        </div>
      )}

      {canLeaveGroup && (
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
