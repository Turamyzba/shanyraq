// components/desktop/MyAnnouncements/GroupsDetails/ApartmentCard.tsx

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
          <div className={styles.infoColumn}>
            <p>{apartment.address}</p>
            <p>{apartment.district}</p>
            <p>{apartment.city}</p>
            <p>{apartment.rooms}</p>
          </div>
          <div className={styles.infoColumn}>
            <p>Можно заехать с {apartment.moveInDate}</p>
            <p>Депозит {apartment.deposit}</p>
            <p>{apartment.description}</p>
            <p>Количество заявок - {apartment.applicationsCount}</p>
          </div>
        </div>
        <div className={styles.price}>{apartment.price.toLocaleString()} ₸</div>
      </div>
    </div>
  );
};

export default ApartmentCard;
