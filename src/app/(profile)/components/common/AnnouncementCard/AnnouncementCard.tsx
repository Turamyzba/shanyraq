"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import styles from "./AnnouncementCard.module.scss";
import Images from "@/components/common/Images";

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
  isArchived: boolean;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
  isMobile?: boolean;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  isArchived,
  onArchive,
  onRestore,
  onDelete,
  isMobile = false,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const handleArchiveClick = () => {
    setIsArchiveModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmArchive = () => {
    onArchive();
    setIsArchiveModalOpen(false);
  };

  const confirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={`${styles.card} ${isArchived ? styles.archivedCard : ""} ${isMobile ? styles.mobile : ""}`}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={announcement.image || "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg"}
            alt={announcement.title}
            width={240}
            height={130}
            className={styles.image}
          />
        </div>

        <Link href={`/edit-apartment/${announcement.id}`} className={styles.editButton}>
          <Images.Edit />
        </Link>
        
        {isArchived && (
          <div className={styles.archivedBadge}>
            Архивировано
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{announcement.title}</h3>
        <div className={styles.location}>
          <Images.Map />
          <span>{announcement.address}</span>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <Images.Calendar />
            <span>{announcement.date}</span>
          </div>
          <div className={styles.detailItem}>
            <Images.Rooms />
            <span>{announcement.roomCount} комната</span>
          </div>
          <div className={styles.detailItem}>
            {getGenderIcon(announcement.genderRestriction)}
            <span>{getGenderText(announcement.genderRestriction)}</span>
          </div>
          <div className={styles.detailItem}>
            <Images.People />
            <span>{announcement.roommatesCount} сожителя</span>
          </div>
        </div>

        <p className={styles.price}>
          {announcement.price.toLocaleString()} <span className={styles.currency}>₸</span>
        </p>

        <div className={styles.actions}>
          {isArchived ? (
            <>
              <Button onClick={onRestore} className={styles.archiveButton}>
                Восстановить
              </Button>
              <Button onClick={handleDeleteClick} className={styles.applicationsButton}>
                Удалить
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleArchiveClick} className={styles.archiveButton}>
                Архивировать
              </Button>
              <Link href={`/my-announcements/${announcement.id}`} className={styles.applicationsLink}>
                <Button className={styles.applicationsButton}>
                  Заявки{" "}
                  <span className={styles.applicationCount}>{announcement.applicationCount}</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Удалить объявление"
        open={isDeleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Да"
        cancelText="Нет"
        okButtonProps={{ danger: true }}
      >
        <p>Вы уверены, что хотите удалить это объявление? Это действие нельзя отменить.</p>
      </Modal>

      {/* Archive Confirmation Modal */}
      <Modal
        title="Архивировать объявление"
        open={isArchiveModalOpen}
        onOk={confirmArchive}
        onCancel={() => setIsArchiveModalOpen(false)}
        okText="Да"
        cancelText="Нет"
      >
        <p>Вы уверены, что хотите архивировать это объявление?</p>
      </Modal>
    </div>
  );
};

const getGenderText = (gender: string) => {
  switch (gender) {
    case "MALE":
      return "Только мужчины";
    case "FEMALE":
      return "Только женщины";
    default:
      return "Любой пол";
  }
};

const getGenderIcon = (gender: string) => {
  switch (gender) {
    case "MALE":
      return <Images.GenderMale />;
    case "FEMALE":
      return <Images.GenderFemale />;
    default:
      return <Images.GenderBoth />;
  }
};

export default AnnouncementCard;