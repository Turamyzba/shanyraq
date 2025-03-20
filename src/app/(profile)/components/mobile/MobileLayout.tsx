"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button as HeroButton } from "@heroui/react";
import {
  UserOutlined,
  FormOutlined,
  SearchOutlined,
  SettingOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Container from "@/components/layouts/Container";
import styles from "./MobileLayout.module.scss";
import ProgressBar from "../common/ProgressBar";
import UserAvatar from "../common/UserAvatar";
import { StatusKey } from "../common/StatusLabels";

// Import modals
import MobileProfileMenu from "./Modals/MobileProfileMenu";
import StatusModal from "./Modals/StatusModal";
import PhotoEditModal from "./Modals/PhotoEditModal";
import PasswordModal from "./Modals/PasswordModal";
import SettingsModal from "./Modals/SettingsModal";
import SavedFilterModal from "./Modals/SavedFilterModal";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  // State for all modals
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [savedFilterModalOpen, setSavedFilterModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<StatusKey>("findingApartment");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Event handlers
  function handleOpenStatusModal() {
    setStatusModalOpen(true);
    setMobileMenuOpen(false);
  }

  function closeStatusModal() {
    setStatusModalOpen(false);
  }

  function handleOpenPhotoModal() {
    setPhotoModalOpen(true);
    setMobileMenuOpen(false);
  }

  function closePhotoModal() {
    setPhotoModalOpen(false);
  }

  function handleOpenPasswordModal() {
    setPasswordModalOpen(true);
    setMobileMenuOpen(false);
  }

  function closePasswordModal() {
    setPasswordModalOpen(false);
  }

  function handleOpenSettingsModal() {
    setSettingsModalOpen(true);
    setMobileMenuOpen(false);
  }

  function closeSettingsModal() {
    setSettingsModalOpen(false);
  }

  function handleOpenSavedFilterModal() {
    setSavedFilterModalOpen(true);
    setMobileMenuOpen(false);
  }

  function closeSavedFilterModal() {
    setSavedFilterModalOpen(false);
  }

  function handleAddPhoto() {
    if (fileInputRef.current) fileInputRef.current.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Выбрали файл:", file);
    }
  }

  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <Container>
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <div className={styles.warningBar}>
            <ProgressBar percent={25} compact />
          </div>

          <div className={styles.profileSection}>
            <div className={styles.profilePhoto} onClick={toggleMobileMenu}>
              <UserAvatar status={status} />
            </div>
            <h2 className={styles.userName}>Алихан Оспанов</h2>
            <div className={styles.statusButton} onClick={handleOpenStatusModal}>
              <div className={styles.statusIcon}>
                <HeroButton className={styles.statusIconButton}>
                  <CheckCircleIcon />
                </HeroButton>
              </div>
              <span className={styles.statusText}>Я ищу квартиру</span>
              <span className={styles.chevronIcon}>
                <ChevronDownIcon />
              </span>
            </div>
          </div>
        </div>

        <div className={styles.mobileMenuItems}>
          <div className={styles.menuItem} onClick={handleOpenSavedFilterModal}>
            <SearchOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Сохраненный фильтр</span>
          </div>

          <div className={styles.menuItem} onClick={() => router.push("/questionnaire")}>
            <FormOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Анкета</span>
          </div>

          <div className={styles.menuItem} onClick={toggleMobileMenu}>
            <UserOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Информация</span>
          </div>

          <div className={styles.menuItem} onClick={handleOpenPasswordModal}>
            <LockOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Пароль и безопастность</span>
          </div>

          <div className={styles.menuItem} onClick={handleOpenSettingsModal}>
            <SettingOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Настройки</span>
          </div>

          <div className={styles.menuItem}>
            <LogoutOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Выйти</span>
          </div>
        </div>

        {children}

        {/* Mobile Modals */}
        <MobileProfileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onEditPhoto={handleOpenPhotoModal}
          onDeletePhoto={() => console.log("Удалить фото")}
          onChangeStatus={handleOpenStatusModal}
        />

        <StatusModal
          isOpen={statusModalOpen}
          onClose={closeStatusModal}
          status={status}
          onStatusChange={(val) => setStatus(val as StatusKey)}
        />

        <PhotoEditModal
          isOpen={photoModalOpen}
          onClose={closePhotoModal}
          onAddPhoto={handleAddPhoto}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />

        <PasswordModal isOpen={passwordModalOpen} onClose={closePasswordModal} />

        <SettingsModal isOpen={settingsModalOpen} onClose={closeSettingsModal} />

        <SavedFilterModal isOpen={savedFilterModalOpen} onClose={closeSavedFilterModal} />
      </div>
    </Container>
  );
};

// Icons for mobile interface
function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
        fill="#1AA683"
        stroke="#1AA683"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.75 12L10.58 14.83L16.25 9.17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="#252525"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default MobileLayout;
