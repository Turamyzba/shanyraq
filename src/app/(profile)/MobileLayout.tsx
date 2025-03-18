"use client";
import React, { useState, useRef } from "react";
import { Badge, Progress } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FormOutlined,
  EditOutlined,
  ExclamationOutlined,
  HomeFilled,
  SearchOutlined,
  SettingOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button as HeroButton, useDisclosure } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./layout.module.scss";
import Container from "@/components/layouts/Container";
import MobileProfileMenu from "./components/MobileProfileMenu";
import StatusModal from "./components/StatusModal";
import PhotoEditModal from "./components/PhotoEditModal";
import SettingsModal from "./components/SettingsModal";
import PasswordModal from "./components/PasswordModal";
import SavedFilterModal from "./components/SavedFilterModal";

type StatusKey =
  | "findingApartment"
  | "notFindingApartment"
  | "findingRoommate"
  | "notFindingRoommate";

const statusLabels: Record<StatusKey, string> = {
  findingApartment: "#ИЩУ КВАРТИРУ",
  notFindingApartment: "#НЕ ИЩУ КВАРТИРУ",
  findingRoommate: "#ИЩУ СОЖИТЕЛЯ",
  notFindingRoommate: "#НЕ ИЩУ СОЖИТЕЛЯ",
};

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [savedFilterModalOpen, setSavedFilterModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<StatusKey>("findingApartment");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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
            <div className={styles.iconCircle}>
              <ExclamationOutlined />
            </div>
            <div className={styles.progressInfo}>
              <div className={styles.infoRow}>
                <span className={styles.percent}>25%</span>
                <span className={styles.description}>Заполните профиль</span>
              </div>
              <Progress
                percent={25}
                showInfo={false}
                strokeColor={{
                  "0%": "#1AA68380",
                  "100%": "#33958D",
                }}
                className={styles.progressBar}
              />
            </div>
          </div>

          <div className={styles.profileSection}>
            <div className={styles.profilePhoto} onClick={toggleMobileMenu}>
              <div className={styles.photoCircle}>
                <img src="/avatar/image.png" alt="Profile Photo" />
                <svg
                  viewBox="0 0 200 200"
                  className={styles.circleSvg}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1aa683" />
                      <stop offset="100%" stopColor="#28a745" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="none"
                    stroke="url(#ringGradient)"
                    strokeWidth="5"
                  />
                  <path
                    id="circlePath"
                    fill="none"
                    d="M 100,100 m -70,0 a 70,70 0 1,0 140,0 a 70,70 0 1,0 -140,0"
                  />
                  <text
                    fill="#fff"
                    fontSize="18"
                    fontWeight="bold"
                    stroke="#000"
                    strokeWidth="3"
                    paintOrder="stroke"
                  >
                    <textPath href="#circlePath" startOffset="110" textAnchor="middle">
                      {statusLabels[status]}
                    </textPath>
                  </text>
                </svg>
              </div>
              <EditOutlined
                className={styles.editIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
              />
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

        {/* Мобильное меню при нажатии на аватар */}
        <MobileProfileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onEditPhoto={handleOpenPhotoModal}
          onDeletePhoto={() => console.log("Удалить фото")}
          onChangeStatus={handleOpenStatusModal}
        />

        {/* Модальные окна */}
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

// Дополнительные иконки для мобильного интерфейса
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
