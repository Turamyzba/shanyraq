import React from "react";
import { Collapse } from "antd";
import { Member } from "./types";
import MemberItem from "./MemberItem";
import styles from "./GroupDetails.module.scss";

interface MembersListProps {
  members: Member[];
  isPending: boolean;
  isDraft?: boolean;
  canRemoveMembers: boolean;
  onRemoveMember?: (memberId: number) => void;
}

const { Panel } = Collapse;

const MembersList: React.FC<MembersListProps> = ({
  members,
  isPending,
  isDraft = false,
  canRemoveMembers,
  onRemoveMember,
}) => {
  if (!members.length) return null;

  // If this is a draft, show invited members separately
  const regularMembers = isDraft ? members.filter((member) => member.role !== "invited") : members;

  const invitedMembers = isDraft ? members.filter((member) => member.role === "invited") : [];

  return (
    <>
      <Collapse
        className={styles.collapse}
        expandIconPosition="end"
        bordered={false}
        defaultActiveKey={["members"]}
      >
        <Panel
          header={
            <span className={styles.panelHeader}>
              {isDraft ? "Создатели черновика" : "Участники группы"} ({regularMembers.length})
            </span>
          }
          key="members"
          className={styles.collapsePanel}
        >
          <div className={styles.membersList}>
            {regularMembers.map((member) => (
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

      {isDraft && invitedMembers.length > 0 && (
        <Collapse
          className={styles.collapse}
          expandIconPosition="end"
          bordered={false}
          defaultActiveKey={["invited"]}
        >
          <Panel
            header={
              <span className={styles.panelHeader}>
                Приглашенные участники ({invitedMembers.length})
              </span>
            }
            key="invited"
            className={styles.collapsePanel}
          >
            <div className={styles.membersList}>
              {invitedMembers.map((member) => (
                <MemberItem
                  key={member.id}
                  member={member}
                  isPending={true}
                  canRemove={canRemoveMembers}
                  onRemove={onRemoveMember}
                />
              ))}
            </div>
          </Panel>
        </Collapse>
      )}
    </>
  );
};

export default MembersList;
