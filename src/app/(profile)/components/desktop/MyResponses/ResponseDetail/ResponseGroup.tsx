import React, { useState } from "react";
import { Button, Collapse } from "antd";
import ResponseMember from "./ResponseMember";
import styles from "./ResponseDetail.module.scss";

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

interface GroupProps {
  group: {
    id: number;
    name: string;
    members: Member[];
    newApplications: Member[];
  };
  canManage: boolean;
  onAcceptApplication: (applicationId: number) => void;
  onRejectApplication: (applicationId: number) => void;
  onRemoveMember: (memberId: number) => void;
}

const { Panel } = Collapse;

const ResponseGroup: React.FC<GroupProps> = ({
  group,
  canManage,
  onAcceptApplication,
  onRejectApplication,
  onRemoveMember,
}) => {
  const [membersExpanded, setMembersExpanded] = useState(true);
  const [newAppsExpanded, setNewAppsExpanded] = useState(false);

  const avatarLimit = 3;
  const displayedAvatars = group.members.slice(0, avatarLimit);
  const hasMoreAvatars = group.members.length > avatarLimit;

  return (
    <div className={styles.groupCard}>
      <div className={styles.groupHeader}>
        <div className={styles.groupTitle}>
          <h3>{group.name}</h3>
          <div className={styles.avatarsRow}>
            {displayedAvatars.map((member, index) => (
              <div
                key={member.id}
                className={styles.avatar}
                style={{
                  backgroundImage: `url(${member.avatar})`,
                  zIndex: avatarLimit - index,
                }}
              />
            ))}
            {hasMoreAvatars && (
              <div className={styles.moreAvatars}>+{group.members.length - avatarLimit}</div>
            )}
          </div>
        </div>
      </div>

      <Collapse
        defaultActiveKey={["1"]}
        className={styles.collapse}
        expandIconPosition="end"
        bordered={false}
      >
        <Panel header="Участники группы" key="1" className={styles.collapsePanel}>
          <div className={styles.membersList}>
            {group.members.map((member) => (
              <ResponseMember
                key={member.id}
                member={member}
                onRemove={
                  canManage && !member.isOwner ? () => onRemoveMember(member.id) : undefined
                }
              />
            ))}
          </div>
        </Panel>
      </Collapse>

      {canManage && group.newApplications.length > 0 && (
        <div className={styles.newApplications}>
          <Button
            className={styles.newAppsButton}
            type="primary"
            onClick={() => setNewAppsExpanded(!newAppsExpanded)}
          >
            Новые заявки ({group.newApplications.length})
          </Button>

          {newAppsExpanded && (
            <div className={styles.newAppsList}>
              {group.newApplications.map((application) => (
                <ResponseMember
                  key={application.id}
                  member={application}
                  isApplication
                  onAccept={() => onAcceptApplication(application.id)}
                  onReject={() => onRejectApplication(application.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseGroup;
