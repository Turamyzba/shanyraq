import React from "react";
import GroupCard from "./GroupCard";
import styles from "./GroupDetails.module.scss";

interface Member {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  date: string;
  avatar: string;
  isOwner?: boolean;
}

interface Group {
  id: number;
  name: string;
  members: Member[];
  isUserMember: boolean;
  isUserGroupCreator: boolean;
}

interface GroupListProps {
  groups: Group[];
  onLeaveGroup: (groupId: number) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onLeaveGroup }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.groupsTitle}>Количество групп: {groups.length}</h2>

      <div className={styles.groupsList}>
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onLeaveGroup={
              group.isUserMember && !group.isUserGroupCreator
                ? () => onLeaveGroup(group.id)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
