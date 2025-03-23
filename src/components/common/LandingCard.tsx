"use client";

import Image from "next/image";
import Images from "./Images";
import styles from "./LandingCard.module.scss";
import { Button, addToast, Snippet } from "@heroui/react";
import { Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface CardProps {
  card?: {
    announcementId: number;
    image: string;
    title: string;
    address: string;
    arriveDate: string;
    roomCount: string;
    selectedGender: string;
    roommates: number;
    cost: number;
    coordsX: string;
    coordsY: string;
    isArchived: boolean;
    consideringOnlyNPeople: boolean;
  
  };
  isLast?: boolean;
}

const LandingCard: React.FC<CardProps> = ({ card, isLast }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });

  useEffect(() => {
    if (typeof window !== "undefined" && card?.announcementId) {
      setShareUrl(`${window.location.origin}/apartments/${card.announcementId}`);
    }
  }, [card?.announcementId]);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    // After copy, show a toast
    addToast({
      title: "Ссылка скопирована!",
      variant: "flat",
      radius: "sm",
      timeout: 2000,
      color: "success",
    });
    setIsModalOpen(false);
  };


  const truncatedTitle = (card?.title ?? "").length > 26 
    ? `${card?.title.substring(0, 26)}...`
    : card?.title;


  return (
    <div 
      className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.cardImage}>
            <Image
              src={card?.image ?? ''}
              alt={card?.title || "Room Image"}
              width={343}
              height={220}
              className={styles.image}
            />
          <Button className={styles.shareIcon} onPress={showModal} isIconOnly variant="bordered">
            <Images.Share color="white" size={isSmallMobile ? 18 : 20} />
          </Button>
          <Modal
            title="Поделиться объявлением"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <p className={styles.modalText}>Скопируйте ссылку и поделитесь с друзьями:</p>
            <Snippet symbol={null} variant="bordered" fullWidth onCopy={handleClose}>
              {shareUrl}
            </Snippet>
          </Modal>
        </div>

        {/* Card Content */}
        <div className={styles.cardContent}>
          {/* Title & Location */}
          <div className={styles.cardTitle}>
            <p>
              {truncatedTitle}
            </p>
          </div>
          <div className={styles.cardLocation}>
            <Images.Map size={isSmallMobile ? 18 : 20} color={"#929292"} />
            <p>{card?.address || "Алматы, Казахстан"}</p>
          </div>

          {/* Room Information */}
          <div className={styles.roomInfo}>
            <div className={styles.infoItem}>
              <Images.Calendar size={isSmallMobile ? 18 : 20} />
              <p>{card?.arriveDate || "01.04.2024"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.Apartment size={isSmallMobile ? 18 : 20} />
              <p>{card?.roomCount ? `${card.roomCount} комната` : "2 комнаты"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.GenderBoth size={isSmallMobile ? 18 : 20} />
              <p>{card?.selectedGender || "Любой"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.People size={isSmallMobile ? 18 : 20} />
              <p>{card?.roommates ? `${card.roommates} чел.` : "3 чел."}</p>
            </div>
          </div>

          {/* Price */}
          <p className={styles.price}>
            {card?.cost || "200 000"}
            <span className={styles.currency}>₸</span>
          </p>
        </div>

        {/* Learn More Button */}
        <div className={styles.learnMore}>
          <Link href={shareUrl || "/"}>Узнать больше</Link>
          <Images.ArrowRight size={isSmallMobile ? 12 : 14} color="#999999" />
        </div>
      </div>

      {/* If this is the last card, show full-screen button */}
      {isLast && (
        <div className={styles.lastOverlay}>
          <Button as={Link} href="/apartments" className={styles.viewAllButton}>
            Смотреть все квартиры
          </Button>
        </div>
      )}
    </div>
  );
};

export default LandingCard;