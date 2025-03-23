import React from "react";
import { Button } from "antd";
import ResponseGroup from "./ResponseGroup";
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

interface Group {
  id: number;
  name: string;
  status: string;
  members: Member[];
  newApplications: Member[];
}

interface Response {
  id: number;
  title: string;
  address: string;
  status: string;
  isGroupCreator: boolean;
  price: number;
}

interface ResponseDetailProps {
  group: Group;
  responseDetail: Response;
  onAcceptApplication: (applicationId: number) => void;
  onRejectApplication: (applicationId: number) => void;
  onRemoveMember: (memberId: number) => void;
  onLeaveGroup: () => void;
}

const ResponseDetail: React.FC<ResponseDetailProps> = ({
  group,
  responseDetail,
  onAcceptApplication,
  onRejectApplication,
  onRemoveMember,
  onLeaveGroup,
}) => {
  // Determine if the user can manage the group
  const canManageGroup = responseDetail.isGroupCreator && responseDetail.status === "accepted";

  // Determine if the user can leave the group
  const canLeaveGroup = !responseDetail.isGroupCreator && responseDetail.status === "accepted";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.groupTitle}>
          {group.name} <span className={styles.badge}>{group.members.length} участников</span>
        </h2>

        {/* Action buttons based on user's role and response status */}
        {responseDetail.status === "pending" && (
          <div className={styles.statusMessage}>
            Ваша заявка рассматривается владельцем объявления
          </div>
        )}

        {canLeaveGroup && (
          <Button className={styles.leaveButton} onClick={onLeaveGroup}>
            Покинуть группу
          </Button>
        )}
      </div>

      <div className={styles.membersSection}>
        <h3 className={styles.sectionTitle}>Участники группы</h3>
        <div className={styles.membersList}>
          {group.members.map((member) => (
            <ResponseMember
              key={member.id}
              member={member}
              onRemove={
                canManageGroup && !member.isOwner ? () => onRemoveMember(member.id) : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Show new applications section only if user is group creator and status is accepted */}
      {canManageGroup && group.newApplications.length > 0 && (
        <div className={styles.applicationsSection}>
          <h3 className={styles.sectionTitle}>Новые заявки</h3>
          <div className={styles.applicationsList}>
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
        </div>
      )}
    </div>
  );
};

export default ResponseDetail;
