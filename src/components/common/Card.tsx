"use client";

import Image from "next/image";
import Images from "./Images";
import styles from "./Card.module.scss";
import { Carousel } from "antd";
import { Button, Snippet, addToast } from "@heroui/react";
import { Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CardProps {
  card?: {
    id: number;
    title: string;
    cost: string;
    image: string; // Updated to an array of images
    address: string;
    selectedGender: string;
    roomCount: number;
    roommates: number;
    arriveDate: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
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
        title: "Ссылка на обявление скопировано!",
        // description: "Ссылка на обявление скопировано",
        variant: "flat",
        radius: "sm",
        timeout: 2000,
        color: "success",
      });
    }, 1000);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        {/* Image Section */}
        <div className={styles.cardImage}>
          <Carousel autoplay style={{ width: "240px", height: "130px" }}>
            <Image
              src={"https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg"}
              alt={card?.title || "Room Image"}
              width={240}
              height={130}
              className={styles.image}
            />
            <Image
              src={"https://i.pinimg.com/736x/a3/1f/b7/a31fb71819bd92f736b655b4411879c0.jpg"}
              alt={card?.title || "Room Image"}
              width={240}
              height={130}
              className={styles.image}
            />
          </Carousel>
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

        {/* Card Content */}
        <div className={styles.cardContent}>
          {/* Title & Location */}
          <div className={styles.cardTitle}>
            <p>
              {(card?.title ?? "").length > 22 ? `${card?.title.substring(0, 22)}...` : card?.title}
            </p>
          </div>
          <div className={styles.cardLocation}>
            <Images.Map size={20} color={"#929292"} />
            <p>{card?.address || "Алматы, Казахстан"}</p>
          </div>

          {/* Room Information */}
          <div className={styles.roomInfo}>
            <div className={styles.infoItem}>
              <Images.Calendar size={20} />
              <p>{card?.arriveDate || "01.04.2024"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.Apartment size={20} />
              <p>{card?.roomCount ? `${card.roomCount} комната` : "2 комнаты"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.GenderBoth size={20} />
              <p>{card?.selectedGender || "Любой"}</p>
            </div>

            <div className={styles.infoItem}>
              <Images.People size={20} />
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

export default Card;
