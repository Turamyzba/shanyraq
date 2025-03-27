// src/app/(profile)/components/desktop/MyResponses/GroupDetails/GroupItem.tsx
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

  let displayMembers = [...group.members];
  let displayApplicants = [...(group.applicants || [])];

  if ((group.status === "pending" || group.status === "rejected") && group.isUserMember) {
    const currentUser = displayMembers.find((member) => member.isCurrentUser);
    if (currentUser && !group.isUserOwner) {
      displayMembers = displayMembers.filter((member) => !member.isCurrentUser);
      displayApplicants = [currentUser, ...displayApplicants];
    }
  }

  const displayedAvatars = displayMembers.slice(0, avatarLimit);
  const hasMoreAvatars = displayMembers.length > avatarLimit;
  const isPending = group.status === "pending";
  const isRejected = group.status === "rejected";
  const isAccepted = group.status === "accepted";
  const isResidents = group.status === "residents";

  const canRemoveMembers = group.isUserAdmin || group.isUserOwner;
  const canManageAdmins = group.isUserOwner && isAccepted;
  const canManageApplicants = group.isUserAdmin || group.isUserOwner;

  const canLeaveGroup = group.isUserMember && isAccepted;
  const canCancelApplication = group.isUserMember && isPending;

  const getGroupBorderClass = () => {
    if (group.status === "accepted") return styles.acceptedGroupBorder;
    if (group.status === "pending") return styles.pendingGroupBorder;
    if (group.status === "rejected") return styles.rejectedGroupBorder;
    if (group.status === "residents") return styles.residentGroupBorder;
    return "";
  };

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
              <div className={styles.moreAvatars}>+{displayMembers.length - avatarLimit}</div>
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
          {isResidents ? (
            <div className={`${styles.groupStatusBadge} ${styles.residentsStatus}`}>Жильцы</div>
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
        members={displayMembers}
        groupStatus={group.status}
        isRejected={isRejected}
        canRemoveMembers={canRemoveMembers}
        canManageAdmins={canManageAdmins}
        onRemoveMember={(memberId) => onRemoveMember && onRemoveMember(group.id, memberId)}
        onPromoteToAdmin={(memberId) => onPromoteToAdmin && onPromoteToAdmin(group.id, memberId)}
        onDemoteFromAdmin={(memberId) => onDemoteFromAdmin && onDemoteFromAdmin(group.id, memberId)}
      />

      {!isAccepted && !isResidents && displayApplicants.length > 0 && (
        <ApplicantsList
          applicants={displayApplicants}
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

      {canCancelApplication && (
        <div className={styles.leaveGroupSection}>
          <Button
            onClick={() => onCancelApplication && onCancelApplication(group.id)}
            className={styles.leaveGroupButton}
          >
            Отменить
          </Button>
        </div>
      )}

      {isRejected && (
        <div className={styles.leaveGroupSection}>
          <Button className={styles.cancelButton} disabled>
            Отменено
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
