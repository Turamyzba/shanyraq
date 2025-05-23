import React, { useState } from "react";
import { Modal, RadioGroup, Radio } from "@heroui/react";
import styles from "./SettingsModal.module.scss";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState("russian");
  const [theme, setTheme] = useState("light");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom"
      classNames={{
        backdrop: styles.modalBackdrop,
        base: styles.modalBase,
        body: styles.modalBody,
        header: styles.modalHeader,
        footer: styles.modalFooter,
      }}
    >
      <div className={styles.container}>
        <div className={styles.handle}></div>
        <h3 className={styles.title}>Настройки</h3>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Язык</h4>
          <div className={styles.optionGroup}>
            <div
              className={`${styles.option} ${language === "russian" ? styles.selected : ""}`}
              onClick={() => setLanguage("russian")}
            >
              <span>Русский язык</span>
              <div className={styles.flagIcon}>🇷🇺</div>
            </div>
            <div
              className={`${styles.option} ${language === "kazakh" ? styles.selected : ""}`}
              onClick={() => setLanguage("kazakh")}
            >
              <span>Казахский язык</span>
              <div className={styles.flagIcon}>🇰🇿</div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Тема</h4>
          <div className={styles.optionGroup}>
            <div
              className={`${styles.option} ${theme === "light" ? styles.selected : ""}`}
              onClick={() => setTheme("light")}
            >
              <span>Светлый режим</span>
              <div className={styles.themeIcon}>☀️</div>
            </div>
            <div
              className={`${styles.option} ${theme === "dark" ? styles.selected : ""}`}
              onClick={() => setTheme("dark")}
            >
              <span>Темный режим</span>
              <div className={styles.themeIcon}>🌙</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
