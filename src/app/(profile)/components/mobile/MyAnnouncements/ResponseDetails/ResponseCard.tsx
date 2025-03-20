import React from "react";
import { Button } from "antd";
import styles from "./ResponseDetails.module.scss";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  date: string;
  avatar: string;
  isOwner?: boolean;
}

interface ResponseCardProps {
  user: User;
  actionType: "application" | "remove";
  onAction?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

const ResponseCard: React.FC<ResponseCardProps> = ({
  user,
  actionType,
  onAction,
  onAccept,
  onReject,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div
          className={styles.cardAvatar}
          style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${user.id})` }}
        />
        <div className={styles.cardUserInfo}>
          <div className={styles.cardUserName}>
            {user.name}
            {user.isOwner && <span className={styles.cardUserBadge}>Хозяин жилья</span>}
          </div>
          <div className={styles.cardUserEmail}>{user.email}</div>
        </div>
      </div>

      <div className={styles.cardDetails}>
        <div className={styles.cardDetailRow}>
          <span className={styles.cardDetailLabel}>Возраст</span>
          <span className={styles.cardDetailValue}>{user.age}</span>
        </div>
        <div className={styles.cardDetailRow}>
          <span className={styles.cardDetailLabel}>Контакты</span>
          <span className={styles.cardDetailValue}>{user.phone}</span>
        </div>
        <div className={styles.cardDetailRow}>
          <span className={styles.cardDetailLabel}>Дата</span>
          <span className={styles.cardDetailValue}>{user.date}</span>
        </div>
      </div>

      <div className={styles.cardActions}>
        {actionType === "application" ? (
          <>
            <Button className={styles.cardAcceptButton} type="primary" onClick={onAccept}>
              Принять
            </Button>
            <Button className={styles.cardRejectButton} danger onClick={onReject}>
              Отклонить
            </Button>
          </>
        ) : (
          !user.isOwner && (
            <Button className={styles.cardRemoveButton} danger onClick={onAction}>
              Удалить
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default ResponseCard;
