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
            <p>{details.address}</p>
            <p>{details.district}</p>
            <p>{details.city}</p>
            <p>{details.roomDetails}</p>
          </div>
          <div className={styles.infoRight}>
            <p>Можно заехать с {details.moveInDate}</p>
            <p>Депозит {details.deposit}</p>
            <p>{details.description}</p>
            <p>
              Статус:
              <span className={`${styles.statusText} ${styles[details.status]}`}>
                {details.status === "pending" && " В ожидании"}
                {details.status === "accepted" && " Принята"}
                {details.status === "rejected" && " Отклонена"}
              </span>
            </p>
          </div>
        </div>
        <div className={styles.price}>{details.price.toLocaleString()} ₸</div>
      </div>
    </div>
  );
};

export default ApartmentDetailsComponent;
