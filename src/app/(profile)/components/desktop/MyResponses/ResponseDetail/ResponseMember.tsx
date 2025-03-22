import React from "react";
import { Button } from "antd";
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

interface ResponseMemberProps {
  member: Member;
  isApplication?: boolean;
  onRemove?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

const ResponseMember: React.FC<ResponseMemberProps> = ({
  member,
  isApplication = false,
  onRemove,
  onAccept,
  onReject,
}) => {
  return (
    <div className={styles.memberCard}>
      <div className={styles.memberInfo}>
        <div className={styles.memberAvatar} style={{ backgroundImage: `url(${member.avatar})` }} />
        <div className={styles.memberData}>
          <div className={styles.memberName}>
            {member.name}
            {member.isOwner && <span className={styles.ownerBadge}>Хозяин жилья</span>}
          </div>
          <div className={styles.memberEmail}>{member.email}</div>
        </div>
      </div>

      <div className={styles.memberDetails}>
        <div className={styles.memberDetail}>
          <span className={styles.detailLabel}>Возраст</span>
          <span className={styles.detailValue}>{member.age}</span>
        </div>
        <div className={styles.memberDetail}>
          <span className={styles.detailLabel}>Контакты</span>
          <span className={styles.detailValue}>{member.phone}</span>
        </div>
        <div className={styles.memberDetail}>
          <span className={styles.detailLabel}>Дата</span>
          <span className={styles.detailValue}>{member.date}</span>
        </div>
      </div>

      <div className={styles.memberActions}>
        {isApplication ? (
          <>
            <Button
              className={styles.acceptButton}
              onClick={onAccept}
              type="primary"
              icon={<CheckIcon />}
            />
            <Button
              className={styles.rejectButton}
              onClick={onReject}
              danger
              icon={<CloseIcon />}
            />
          </>
        ) : (
          onRemove && (
            <Button className={styles.removeButton} onClick={onRemove} icon={<TrashIcon />} />
          )
        )}
      </div>
    </div>
  );
};

// Icons
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.6667 5L7.50001 14.1667L3.33334 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5L15 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 5H4.16667H17.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66669 5.00008V3.33341C6.66669 2.89139 6.8423 2.46746 7.15486 2.1549C7.46742 1.84234 7.89135 1.66675 8.33335 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1578 2.46746 13.3334 2.89139 13.3334 3.33341V5.00008"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.8333 5.00008V16.6667C15.8333 17.1088 15.6577 17.5327 15.3451 17.8453C15.0326 18.1578 14.6087 18.3334 14.1667 18.3334H5.83333C5.39131 18.3334 4.96738 18.1578 4.65482 17.8453C4.34226 17.5327 4.16667 17.1088 4.16667 16.6667V5.00008"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ResponseMember;
