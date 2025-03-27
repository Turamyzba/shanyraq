// components/mobile/MyAnnouncements/GroupsDetails/ApartmentCard.tsx

import React from "react";
import { ApartmentDetails } from "./types";
import styles from "./GroupsDetails.module.scss";

interface ApartmentCardProps {
  apartment: ApartmentDetails;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  return (
    <div className={styles.apartmentCard}>
      <div className={styles.apartmentImage}>
        <img src={apartment.image} alt="Квартира" />
      </div>
      <div className={styles.apartmentInfo}>
        <div className={styles.infoContent}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Адрес</span>
            <span className={styles.infoValue}>{apartment.address}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Район</span>
            <span className={styles.infoValue}>{apartment.district}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Город</span>
            <span className={styles.infoValue}>{apartment.city}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Комнаты</span>
            <span className={styles.infoValue}>{apartment.rooms}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Заезд с</span>
            <span className={styles.infoValue}>{apartment.moveInDate}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Депозит</span>
            <span className={styles.infoValue}>{apartment.deposit}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Описание</span>
            <span className={styles.infoValue}>{apartment.description}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Заявки</span>
            <span className={styles.infoValue}>{apartment.applicationsCount}</span>
          </div>
        </div>
        <div className={styles.price}>{apartment.price.toLocaleString()} ₸</div>
      </div>
    </div>
  );
};

export default ApartmentCard;