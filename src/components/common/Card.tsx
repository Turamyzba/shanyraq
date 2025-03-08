"use client";
import Images from "./Images";

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
  isLast?: boolean;
}

const Card: React.FC<CardProps> = ({ card, isLast }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image src={card?.image} alt={card?.title} width={343} height={220} />
        <div className={styles.shareIcon}>
          <Images.Share />
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3>{card?.title?.length > 26 ? card?.title?.substring(0, 26) + "..." : card?.title}</h3>
        <p className={styles.location}>
          <Images.Location w={"20"} h={"20"} color={"#929292"} />
          {card?.address}
        </p>

        <div className={styles.cardDetails}>
          <div><Images.CalendarCard /><p>{card?.arriveDate}</p></div>
          <div><Images.Apartment /><p>{card?.roomCount} комната</p></div>
          <div><Images.GenderBoth /><p>{card?.selectedGender}</p></div>
          <div><Images.People /><p>{card?.roommates}</p></div>
        </div>

        <p className={styles.price}>
          {card?.cost} <span>₸</span>
        </p>

        <span className={styles.more}>
          <p>Узнать больше</p>
          <Images.ArrowRight w={"14"} h={"14"} color={"#999999"} />
        </span>
      </div>

      {isLast && (
        <div className={styles.overlay}>
          <button className={styles.viewMore}>Смотреть все квартиры</button>
        </div>
      )}
    </div>
  );
};

export default Card;
