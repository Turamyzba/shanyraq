import React from "react";
import { Drawer } from "@heroui/react";
import { MapPin, DollarSign, Users, Home } from "lucide-react";
import styles from "./Drawers.module.scss";

interface SavedFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavedFilterDrawer: React.FC<SavedFilterDrawerProps> = ({ isOpen, onClose }) => {
  const mockFilter = {
    city: "Астана",
    district: "Алматинский район",
    microdistrict: "Мкр. Чубары",
    priceRange: "150 000 - 200 000тг",
    roomCount: "До 3 комнат",
    roommatesCount: "2",
    gender: "Мужской пол",
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" isDismissable={true}>
      <div className={styles.drawerContainer}>
        <div className={styles.handle}></div>
        <h3 className={styles.drawerTitle}>Сохраненный фильтр</h3>

        <div className={styles.filterItems}>
          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <MapPin size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Город</div>
              <div className={styles.filterValue}>{mockFilter.city}</div>
            </div>
          </div>

          <div className={styles.filterItem}>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Район</div>
              <div className={styles.filterValue}>{mockFilter.district}</div>
            </div>
          </div>

          <div className={styles.filterItem}>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Микрорайон</div>
              <div className={styles.filterValue}>{mockFilter.microdistrict}</div>
            </div>
          </div>

          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <DollarSign size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Цена</div>
              <div className={styles.filterValue}>{mockFilter.priceRange}</div>
            </div>
          </div>

          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <Home size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Количество комнат</div>
              <div className={styles.filterValue}>{mockFilter.roomCount}</div>
            </div>
          </div>

          <div className={styles.filterItem}>
            <div className={styles.filterIcon}>
              <Users size={20} className={styles.icon} />
            </div>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Количество сожителей</div>
              <div className={styles.filterValue}>{mockFilter.roommatesCount}</div>
            </div>
          </div>

          <div className={styles.filterItem}>
            <div className={styles.filterContent}>
              <div className={styles.filterLabel}>Гендер</div>
              <div className={styles.filterValue}>{mockFilter.gender}</div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default SavedFilterDrawer;
