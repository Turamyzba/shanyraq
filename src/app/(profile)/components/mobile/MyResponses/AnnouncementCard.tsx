import React from "react";
import { Button } from "antd";
import Link from "next/link";
import styles from "./AnnouncementsList.module.scss";

interface Announcement {
  id: number;
  title: string;
  address: string;
  date: string;
  price: number;
  image: string;
  status: "pending" | "accepted" | "rejected";
  ownerName: string;
  groupCount: number;
  applicationDate: string;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  onCancel?: () => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, onCancel }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.imageWrapper}>
          <img src={announcement.image} alt={announcement.title} className={styles.image} />
        </div>
        <div className={styles.headerInfo}>
          <h3 className={styles.title}>{announcement.title}</h3>
          <div className={styles.location}>
            <LocationIcon />
            <span>{announcement.address}</span>
          </div>
          <p className={styles.price}>
            {announcement.price.toLocaleString()} <span className={styles.currency}>₸</span>
          </p>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.statusRow}>
          <span className={styles.statusLabel}>Статус:</span>
          <span
            className={`${styles.statusValue} ${
              announcement.status === "pending"
                ? styles.pending
                : announcement.status === "accepted"
                  ? styles.accepted
                  : styles.rejected
            }`}
          >
            {announcement.status === "pending" && "В ожидании"}
            {announcement.status === "accepted" && "Принята"}
            {announcement.status === "rejected" && "Отклонена"}
          </span>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.detailIcon}>
            <CalendarIcon />
          </div>
          <span className={styles.detailText}>Дата заявки: {announcement.applicationDate}</span>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.detailIcon}>
            <UserIcon />
          </div>
          <span className={styles.detailText}>Владелец: {announcement.ownerName}</span>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.detailIcon}>
            <GroupIcon />
          </div>
          <span className={styles.detailText}>Количество групп: {announcement.groupCount}</span>
        </div>
      </div>

      <div className={styles.cardActions}>
        {announcement.status === "pending" && onCancel && (
          <Button onClick={onCancel} className={styles.cancelButton}>
            Отменить заявку
          </Button>
        )}
        <Link href={`/my-responses/${announcement.id}`} className={styles.detailsLink}>
          <Button className={styles.detailsButton} disabled={announcement.status === "rejected"}>
            Посмотреть группы
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Icon components
const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 10.8333C11.3807 10.8333 12.5 9.71404 12.5 8.33333C12.5 6.95262 11.3807 5.83333 10 5.83333C8.61929 5.83333 7.5 6.95262 7.5 8.33333C7.5 9.71404 8.61929 10.8333 10 10.8333Z"
      stroke="#929292"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 18.3333C12.5 15.8333 16.6667 12.9106 16.6667 8.33329C16.6667 4.65139 13.6819 1.66663 10 1.66663C6.31811 1.66663 3.33334 4.65139 3.33334 8.33329C3.33334 12.9106 7.5 15.8333 10 18.3333Z"
      stroke="#929292"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8333 3.33337H4.16667C3.24619 3.33337 2.5 4.07957 2.5 5.00004V16.6667C2.5 17.5872 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5872 17.5 16.6667V5.00004C17.5 4.07957 16.7538 3.33337 15.8333 3.33337Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 1.66663V4.99996"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.66669 1.66663V4.99996"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 8.33337H17.5"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 9.16667C11.7259 9.16667 13.125 7.76751 13.125 6.04167C13.125 4.31583 11.7259 2.91667 10 2.91667C8.27417 2.91667 6.875 4.31583 6.875 6.04167C6.875 7.76751 8.27417 9.16667 10 9.16667Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 17.0833V15.4167C5 14.6141 5.31875 13.8442 5.88509 13.2779C6.45143 12.7115 7.22125 12.3927 8.02381 12.3927H11.9762C12.7788 12.3927 13.5486 12.7115 14.1149 13.2779C14.6812 13.8442 15 14.6141 15 15.4167V17.0833"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GroupIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 11.6667C11.8409 11.6667 13.3333 10.1743 13.3333 8.33333C13.3333 6.49238 11.8409 5 10 5C8.15905 5 6.66666 6.49238 6.66666 8.33333C6.66666 10.1743 8.15905 11.6667 10 11.6667Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 18.3334V16.6667C2.5 15.7827 2.85119 14.9348 3.47631 14.3096C4.10143 13.6845 4.94928 13.3334 5.83333 13.3334H14.1667C15.0507 13.3334 15.8986 13.6845 16.5237 14.3096C17.1488 14.9348 17.5 15.7827 17.5 16.6667V18.3334"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AnnouncementCard;
