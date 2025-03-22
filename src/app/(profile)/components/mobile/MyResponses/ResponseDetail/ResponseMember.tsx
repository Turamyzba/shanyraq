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
      <div className={styles.memberHeader}>
        <div className={styles.memberAvatar} style={{ backgroundImage: `url(${member.avatar})` }} />
        <div className={styles.memberInfo}>
          <div className={styles.memberName}>
            {member.name}
            {member.isOwner && <span className={styles.ownerBadge}>Хозяин жилья</span>}
          </div>
          <div className={styles.memberEmail}>{member.email}</div>
        </div>
      </div>

      <div className={styles.memberDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Возраст</span>
          <span className={styles.detailValue}>{member.age}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Контакты</span>
          <span className={styles.detailValue}>{member.phone}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Дата</span>
          <span className={styles.detailValue}>{member.date}</span>
        </div>
      </div>

      {(isApplication || onRemove) && (
        <div className={styles.memberActions}>
          {isApplication ? (
            <>
              <Button className={styles.acceptButton} onClick={onAccept} type="primary">
                Принять
              </Button>
              <Button className={styles.rejectButton} onClick={onReject} danger>
                Отклонить
              </Button>
            </>
          ) : (
            onRemove && (
              <Button className={styles.removeButton} onClick={onRemove} danger>
                Удалить
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ResponseMember;
