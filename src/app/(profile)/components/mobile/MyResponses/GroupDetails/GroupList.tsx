import React from "react";
import { Group } from "../../../desktop/MyResponses/GroupDetails/types";
import GroupItem from "./GroupItem";
import styles from "./GroupDetails.module.scss";

interface GroupListProps {
  groups: Group[];
  onLeaveGroup?: (groupId: number) => void;
  onRemoveMember?: (groupId: number, memberId: number) => void;
  onAcceptApplicant?: (groupId: number, applicantId: number) => void;
  onRejectApplicant?: (groupId: number, applicantId: number) => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  onLeaveGroup,
  onRemoveMember,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  // Sort groups: first accepted, then pending, then rejected
  const sortedGroups = [...groups].sort((a, b) => {
    const statusOrder = { accepted: 0, pending: 1, rejected: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div className={styles.groupsContainer}>
      <h3 className={styles.groupsTitle}>Группы ({groups.length})</h3>

      <div className={styles.groupsList}>
        {sortedGroups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            onLeaveGroup={onLeaveGroup}
            onRemoveMember={onRemoveMember}
            onAcceptApplicant={onAcceptApplicant}
            onRejectApplicant={onRejectApplicant}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
