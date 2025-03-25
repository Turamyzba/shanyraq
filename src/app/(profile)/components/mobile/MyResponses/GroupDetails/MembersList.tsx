import React, { useState } from "react";
import { Member } from "../../../desktop/MyResponses/GroupDetails/types";
import MemberItem from "./MemberItem";
import styles from "./GroupDetails.module.scss";

interface MembersListProps {
  members: Member[];
  isPending: boolean;
  canRemoveMembers: boolean;
  onRemoveMember?: (memberId: number) => void;
}

const MembersList: React.FC<MembersListProps> = ({
  members,
  isPending,
  canRemoveMembers,
  onRemoveMember,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!members.length) return null;

  // By default, show only 3 members in collapsed state
  const displayCount = expanded ? members.length : Math.min(members.length, 3);
  const displayMembers = members.slice(0, displayCount);
  const hasMore = members.length > 3;

  return (
    <div className={styles.membersListContainer}>
      <div className={styles.sectionHeader}>
        <h3>Участники группы ({members.length})</h3>
      </div>

      <div className={styles.membersList}>
        {displayMembers.map((member) => (
          <MemberItem
            key={member.id}
            member={member}
            isPending={isPending}
            canRemove={canRemoveMembers}
            onRemove={onRemoveMember}
          />
        ))}

        {hasMore && (
          <div className={styles.expandToggle} onClick={() => setExpanded(!expanded)}>
            {expanded ? "Свернуть список" : "Показать всех участников"}
            <span className={`${styles.expandIcon} ${expanded ? styles.expanded : ""}`}>▼</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;
