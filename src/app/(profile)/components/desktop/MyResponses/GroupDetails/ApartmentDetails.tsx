import React from "react";
import { ApartmentDetails } from "./types";
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
        <div className={styles.infoMain}>
          <div className={styles.infoLeft}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{details.address}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{details.district}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{details.city}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{details.roomDetails}</span>
            </div>
          </div>
          <div className={styles.infoRight}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Можно заехать с {details.moveInDate}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Депозит {details.deposit}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>{details.description}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoStatus}>
                Статус:
                <span className={`${styles.statusText} ${styles[details.status]}`}>
                  {details.status === "pending" && "В ожидании"}
                  {details.status === "accepted" && "Принята"}
                  {details.status === "rejected" && "Отклонена"}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.price}>{details.price.toLocaleString()} ₸</div>
      </div>
    </div>
  );
};

export default ApartmentDetailsComponent;
