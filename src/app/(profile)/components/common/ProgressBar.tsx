import React from "react";
import { Progress } from "antd";
import { ExclamationOutlined } from "@ant-design/icons";
import styles from "../../layout.module.scss";

interface ProgressBarProps {
  percent: number;
  description?: string;
  compact?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percent, 
  description = 'Заполните полностью профиль и получите доступ к функции "Поделиться профилем"', 
  compact = false 
}) => {
  return (
    <div className={styles.topBar}>
      <div className={styles.iconCircle}>
        <ExclamationOutlined />
      </div>
      <div className={styles.progressInfo}>
        <div className={styles.infoRow}>
          <span className={styles.percent}>{percent}%</span>
          <span className={styles.description}>
            {compact ? "Заполните профиль" : description}
          </span>
        </div>
        <Progress
          percent={percent}
          showInfo={false}
          strokeColor={{
            "0%": "#1AA68380",
            "100%": "#33958D",
          }}
          className={styles.progressBar}
        />
      </div>
    </div>
  );
};

export default ProgressBar;