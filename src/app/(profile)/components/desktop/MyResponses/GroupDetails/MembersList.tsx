import React from "react";
import { Collapse } from "antd";
import { Member } from "./types";
import MemberItem from "./MemberItem";
import styles from "./GroupDetails.module.scss";

interface MembersListProps {
  members: Member[];
  isPending: boolean;
  canRemoveMembers: boolean;
  onRemoveMember?: (memberId: number) => void;
}

const { Panel } = Collapse;

const MembersList: React.FC<MembersListProps> = ({
  members,
  isPending,
  canRemoveMembers,
  onRemoveMember,
}) => {
  if (!members.length) return null;

  return (
    <Collapse
      className={styles.collapse}
      expandIconPosition="end"
      bordered={false}
      defaultActiveKey={["members"]}
    >
      <Panel
        header={<span className={styles.panelHeader}>Участники группы ({members.length})</span>}
        key="members"
        className={styles.collapsePanel}
      >
        <div className={styles.membersList}>
          {members.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              isPending={isPending}
              canRemove={canRemoveMembers}
              onRemove={onRemoveMember}
            />
          ))}
        </div>
      </Panel>
    </Collapse>
  );
};

export default MembersList;
