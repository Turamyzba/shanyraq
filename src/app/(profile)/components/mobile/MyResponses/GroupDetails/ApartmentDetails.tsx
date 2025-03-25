import React from "react";
import { ApartmentDetails } from "../../../desktop/MyResponses/GroupDetails/types";
import styles from "./GroupDetails.module.scss";

interface ApartmentDetailsProps {
  details: ApartmentDetails;
}

const ApartmentDetailsComponent: React.FC<ApartmentDetailsProps> = ({ details }) => {
  return (
    <div className={styles.apartmentDetails}>
      <div className={styles.apartmentImage}>
        <img src={details.image} alt={details.title} />
      </div>
      <div className={styles.apartmentInfo}>
        <div className={styles.infoContent}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Адрес:</span>
            <span className={styles.infoValue}>{details.address}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Район:</span>
            <span className={styles.infoValue}>{details.district}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Город:</span>
            <span className={styles.infoValue}>{details.city}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Детали:</span>
            <span className={styles.infoValue}>{details.roomDetails}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Дата заезда:</span>
            <span className={styles.infoValue}>{details.moveInDate}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Депозит:</span>
            <span className={styles.infoValue}>{details.deposit}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Описание:</span>
            <span className={styles.infoValue}>{details.description}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Статус:</span>
            <span className={`${styles.infoValue} ${styles.statusValue} ${styles[details.status]}`}>
              {details.status === "pending" && "В ожидании"}
              {details.status === "accepted" && "Принята"}
              {details.status === "rejected" && "Отклонена"}
            </span>
          </div>
        </div>
        <div className={styles.price}>{details.price.toLocaleString()} ₸</div>
      </div>
    </div>
  );
};

export default ApartmentDetailsComponent;
