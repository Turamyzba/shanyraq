import React from "react";
import { Collapse } from "antd";
import ResponseGroup from "./ResponseGroup";
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

interface Group {
  id: number;
  name: string;
  members: Member[];
  newApplications: Member[];
}

interface ResponseListProps {
  groups: Group[];
  onAcceptApplication: (groupId: number, applicationId: number) => void;
  onRejectApplication: (groupId: number, applicationId: number) => void;
  onRemoveMember: (groupId: number, memberId: number) => void;
}

const { Panel } = Collapse;

const MobileResponseList: React.FC<ResponseListProps> = ({
  groups,
  onAcceptApplication,
  onRejectApplication,
  onRemoveMember,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.groupsHeader}>
        <h2 className={styles.groupsTitle}>
          Количество групп: <span className={styles.groupsCount}>{groups.length}</span>
        </h2>
      </div>

      {groups.map((group) => (
        <ResponseGroup
          key={group.id}
          group={group}
          onAcceptApplication={(applicationId) => onAcceptApplication(group.id, applicationId)}
          onRejectApplication={(applicationId) => onRejectApplication(group.id, applicationId)}
          onRemoveMember={(memberId) => onRemoveMember(group.id, memberId)}
        />
      ))}
    </div>
  );
};

export default MobileResponseList;
