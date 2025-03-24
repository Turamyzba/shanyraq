"use client";

import Image from "next/image";
import Images from "./Images";
import styles from "./Card.module.scss";
import { Button, Snippet, addToast } from "@heroui/react";
import { Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface CardProps {
  card?: {
    id: number;
    title: string;
    cost: string;
    image: string;
    address: string;
    selectedGender: string;
    roomCount: number;
    roommates: number;
    arriveDate: string;
  };
  mini?: boolean;
}

const Card: React.FC<CardProps> = ({ card, mini = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isSmallMobile = useMediaQuery({ maxWidth: 480 });
  
  useEffect(() => {
    if (typeof window !== "undefined" && card?.id) {
      setShareUrl(`${window.location.origin}/apartments/${card?.id}`);
    }
  }, [card?.id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setTimeout(() => {
      setIsModalOpen(false);
      addToast({
        title: "Ссылка на объявление скопирована!",
        variant: "flat",
        radius: "sm",
        timeout: 2000,
        color: "success",
      });
    }, 1000);
  };

  // Format cost with space as thousand separator
  const formatCost = (cost: string) => {
    if (!cost) return "0";
    // Remove any existing spaces first
    const cleanCost = cost.replace(/\s+/g, "");
    // Add space as thousand separator
    return cleanCost.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Fixed sizes for image based on card type
  const imageWidth = mini ? 240 : 280;
  const imageHeight = mini ? 120 : 180;

  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.card} ${mini ? styles.miniCard : ''}`}>
        <div className={styles.cardImage}>
          <Image
            src={card?.image || "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg"}
            alt={card?.title || "Room Image"}
            width={imageWidth}
            height={imageHeight}
            className={styles.image}
          />
          <Button className={styles.shareIcon} onPress={showModal} isIconOnly variant="bordered">
            <Images.Share color="white" />
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

        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>
            <p>
              {(card?.title ?? "").length > (mini ? 18 : 22) 
                ? `${card?.title.substring(0, mini ? 18 : 22)}...` 
                : card?.title}
            </p>
          </div>
          <div className={styles.cardLocation}>
            <Images.Map size={mini ? 16 : 20} color={"#929292"} />
            <p>{card?.address || "Алматы, Казахстан"}</p>
          </div>

          <div className={styles.roomInfo}>
            <div className={styles.infoItem}>
              <Images.Calendar size={mini ? 16 : 20} />
              <p>{card?.arriveDate || "01.04.2024"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.Apartment size={mini ? 16 : 20} />
              <p>{card?.roomCount 
                ? `${card.roomCount} ${getRoomWord(card.roomCount)}` 
                : "2 комнаты"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.GenderBoth size={mini ? 16 : 20} />
              <p>{card?.selectedGender || "Любой"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.People size={mini ? 16 : 20} />
              <p>{card?.roommates ? `${card.roommates} чел.` : "3 чел."}</p>
            </div>
          </div>

          <p className={styles.price}>
            {formatCost(card?.cost || "200 000")}
            <span className={styles.currency}>₸</span>
          </p>
        </div>

        <div className={styles.learnMore}>
          <Button
            variant="light"
            as={Link}
            href={shareUrl}
            endContent={<Images.ArrowRight size={14} color="#999999" />}
          >
            Узнать больше
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get the correct word form for rooms
function getRoomWord(count: number): string {
  if (count === 1) return "комната";
  if (count >= 2 && count <= 4) return "комнаты";
  return "комнат";
}

export default Card;