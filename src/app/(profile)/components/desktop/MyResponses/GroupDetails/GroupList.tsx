import React from "react";
import { Group } from "./types";
import GroupItem from "./GroupItem";
import styles from "./GroupDetails.module.scss";

interface GroupListProps {
  groups: Group[];
  onLeaveGroup?: (groupId: number) => void;
  onRemoveMember?: (groupId: number, memberId: number) => void;
  onPromoteToAdmin?: (groupId: number, memberId: number) => void;
  onAcceptApplicant?: (groupId: number, applicantId: number) => void;
  onRejectApplicant?: (groupId: number, applicantId: number) => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  onLeaveGroup,
  onRemoveMember,
  onPromoteToAdmin,
  onAcceptApplicant,
  onRejectApplicant,
}) => {
  // Сортировка групп: сначала принятые, затем ожидающие, затем отклоненные
  const sortedGroups = [...groups].sort((a, b) => {
    const statusOrder = { accepted: 0, pending: 1, rejected: 2, draft: 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return (
    <div>
      <h2 className={styles.groupsTitle}>Количество групп: {groups.length}</h2>

      <div className={styles.groupsList}>
        {sortedGroups.map((group) => (
          <GroupItem
            key={group.id}
            group={group}
            onLeaveGroup={onLeaveGroup}
            onRemoveMember={onRemoveMember}
            onPromoteToAdmin={onPromoteToAdmin}
            onAcceptApplicant={onAcceptApplicant}
            onRejectApplicant={onRejectApplicant}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
