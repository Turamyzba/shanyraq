import React, { useState } from "react";
import { Button } from "antd";
import { Group } from "../../../desktop/MyResponses/GroupDetails/types";
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
  const [expanded, setExpanded] = useState(false);

  const isPending = group.status === "pending";

  // Only admins and superadmins can remove members
  const canRemoveMembers = group.isUserAdmin || group.isUserSuperAdmin;

  // Only admins and superadmins can manage applicants
  const canManageApplicants = group.isUserAdmin || group.isUserSuperAdmin;

  // Users can leave groups if they're members but not superadmins
  const canLeaveGroup = group.isUserMember && !group.isUserSuperAdmin;

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupHeader} onClick={() => setExpanded(!expanded)}>
        <div className={styles.groupHeaderContent}>
          <h3 className={styles.groupName}>{group.name}</h3>

          <div className={styles.groupBadges}>
            <div className={`${styles.groupStatusBadge} ${styles[group.status]}`}>
              {group.status === "pending" && "В ожидании"}
              {group.status === "accepted" && "Принята"}
              {group.status === "rejected" && "Отклонена"}
            </div>

            {group.isUserMember && (
              <div
                className={`${styles.userRoleBadge} ${
                  group.isUserSuperAdmin
                    ? styles.superAdminBadge
                    : group.isUserAdmin
                      ? styles.adminBadge
                      : styles.memberBadge
                }`}
              >
                {group.isUserSuperAdmin ? "Создатель" : group.isUserAdmin ? "Админ" : "Участник"}
              </div>
            )}
          </div>
        </div>

        <div className={styles.groupInfo}>
          <span className={styles.memberCount}>{group.members.length} участников</span>
          <span className={`${styles.expandIcon} ${expanded ? styles.expanded : ""}`}>▼</span>
        </div>
      </div>

      {expanded && (
        <div className={styles.groupContent}>
          <MembersList
            members={group.members}
            isPending={isPending}
            canRemoveMembers={canRemoveMembers}
            onRemoveMember={(memberId) => onRemoveMember && onRemoveMember(group.id, memberId)}
          />

          {group.applicants.length > 0 && (
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
      )}
    </div>
  );
};

export default GroupItem;
