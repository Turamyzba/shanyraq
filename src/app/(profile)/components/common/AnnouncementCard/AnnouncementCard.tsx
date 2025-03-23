"use client";
import React from "react";
import { Button } from "antd";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import styles from "./AnnouncementCard.module.scss";

interface Announcement {
  id: number;
  title: string;
  address: string;
  date: string;
  roomCount: number;
  genderRestriction: string;
  roommatesCount: number;
  price: number;
  image: string;
  applicationCount: number;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  onArchive: () => void;
  isMobile?: boolean;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onArchive,
  isMobile = false,
}) => {
  return (
    <div className={`${styles.card} ${isMobile ? styles.mobile : ""}`}>
      <div className={styles.imageContainer}>
        <div>
          <div className={styles.imageWrapper}>
            <Image
              src="https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg"
              alt={announcement.title}
              width={240}
              height={130}
              className={styles.image}
            />
          </div>
        </div>

        <Link href={`/edit-apartment/${announcement.id}`} className={styles.editButton}>
          <EditIcon />
        </Link>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{announcement.title}</h3>
        <div className={styles.location}>
          <LocationIcon />
          <span>{announcement.address}</span>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <CalendarIcon />
            <span>{announcement.date}</span>
          </div>
          <div className={styles.detailItem}>
            <RoomIcon />
            <span>{announcement.roomCount} комната</span>
          </div>
          <div className={styles.detailItem}>
            <GenderIcon />
            <span>{announcement.genderRestriction}</span>
          </div>
          <div className={styles.detailItem}>
            <PeopleIcon />
            <span>{announcement.roommatesCount} сожителя</span>
          </div>
        </div>

        <p className={styles.price}>
          {announcement.price.toLocaleString()} <span className={styles.currency}>₸</span>
        </p>

        <div className={styles.actions}>
          <Button onClick={onArchive} className={styles.archiveButton}>
            Архивировать
          </Button>
          <Link href={`/my-announcements/${announcement.id}`} className={styles.applicationsLink}>
            <Button className={styles.applicationsButton}>
              Заявки{" "}
              <span className={styles.applicationCount}>{announcement.applicationCount}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Icon components
const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const RoomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 8.33333V17.5H2.5V8.33333"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.1666 3.33337H0.833313V8.33337H19.1666V3.33337Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GenderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const PeopleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.1666 17.5V15.8333C14.1666 14.9493 13.8155 14.1014 13.1903 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H4.16665C3.2826 12.5 2.43475 12.8512 1.80962 13.4763C1.1845 14.1014 0.833313 14.9493 0.833313 15.8333V17.5"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.49999 9.16667C9.34094 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34094 2.5 7.49999 2.5C5.65904 2.5 4.16666 3.99238 4.16666 5.83333C4.16666 7.67428 5.65904 9.16667 7.49999 9.16667Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.1667 17.5001V15.8334C19.1662 15.0948 18.9204 14.3774 18.4679 13.7936C18.0154 13.2098 17.3819 12.793 16.6667 12.6084"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 2.6084C14.0503 2.79198 14.6858 3.20898 15.1396 3.79366C15.5935 4.37833 15.8398 5.09742 15.8398 5.83757C15.8398 6.57771 15.5935 7.2968 15.1396 7.88147C14.6858 8.46615 14.0503 8.88315 13.3333 9.06673"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default AnnouncementCard;
