import React, { useState } from "react";
import { Button, Collapse } from "antd";
import ResponseCard from "./ResponseCard";
import styles from "./ResponseDetails.module.scss";

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
  onAcceptApplication: (applicationId: number) => void;
  onRejectApplication: (applicationId: number) => void;
  onRemoveMember: (memberId: number) => void;
}

const { Panel } = Collapse;

const ResponseGroup: React.FC<GroupProps> = ({
  group,
  onAcceptApplication,
  onRejectApplication,
  onRemoveMember,
}) => {
  const [membersExpanded, setMembersExpanded] = useState(false);
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
                  backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})`,
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

      <Collapse className={styles.collapse} expandIconPosition="end" bordered={false}>
        <Panel header="Участники группы" key="1" className={styles.collapsePanel}>
          <div className={styles.membersList}>
            {group.members.map((member) => (
              <ResponseCard
                key={member.id}
                user={member}
                onAction={member.isOwner ? undefined : () => onRemoveMember(member.id)}
                actionType="remove"
              />
            ))}
          </div>
        </Panel>
      </Collapse>

      {group.newApplications.length > 0 && (
        <div className={styles.newApplications}>
          <Button
            className={styles.newAppsButton}
            type="primary"
            onClick={() => setNewAppsExpanded(!newAppsExpanded)}
          >
            Новые заявки
          </Button>

          {newAppsExpanded && (
            <div className={styles.newAppsList}>
              {group.newApplications.map((application) => (
                <ResponseCard
                  key={application.id}
                  user={application}
                  onAccept={() => onAcceptApplication(application.id)}
                  onReject={() => onRejectApplication(application.id)}
                  actionType="application"
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
