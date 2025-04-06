"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button as HeroButton } from "@heroui/react";
import {
  UserOutlined,
  FormOutlined,
  FileTextOutlined,
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

// Modals and Drawers
import StatusDrawer from "./Drawers/StatusDrawer";
import PhotoEditDrawer from "./Drawers/PhotoEditDrawer";
import PasswordDrawer from "./Drawers/PasswordDrawer";
import SettingsDrawer from "./Drawers/SettingsDrawer";
import SavedFilterDrawer from "./Drawers/SavedFilterDrawer";
import ProfileInfoDrawer from "./Drawers/ProfileInfoDrawer";

const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  // State for all drawers
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false);
  const [photoDrawerOpen, setPhotoDrawerOpen] = useState(false);
  const [passwordDrawerOpen, setPasswordDrawerOpen] = useState(false);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const [savedFilterDrawerOpen, setSavedFilterDrawerOpen] = useState(false);
  const [profileInfoDrawerOpen, setProfileInfoDrawerOpen] = useState(false);
  const [status, setStatus] = useState<StatusKey>("findingApartment");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const goToPage = (path: string) => {
    router.push(path);
  };

  return (
    <Container>
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <div className={styles.warningBar}>
            <ProgressBar percent={25} compact />
          </div>

          <div className={styles.profileSection}>
            <div className={styles.profilePhoto}>
              <UserAvatar
                status={status}
                showEditIcon
                onEditClick={() => setPhotoDrawerOpen(true)}
              />
            </div>
            <h2 className={styles.userName}>Алихан Оспанов</h2>
            <div className={styles.statusButton} onClick={() => setStatusDrawerOpen(true)}>
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
          <div className={styles.menuItem} onClick={() => setSavedFilterDrawerOpen(true)}>
            <SearchOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Сохраненный фильтр</span>
          </div>

          <div className={styles.menuItem} onClick={() => goToPage("/questionnaire")}>
            <FormOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Анкета</span>
          </div>

          <div className={styles.menuItem} onClick={() => setProfileInfoDrawerOpen(true)}>
            <UserOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Информация</span>
          </div>

          <div className={styles.menuItem} onClick={() => setPasswordDrawerOpen(true)}>
            <LockOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Пароль и безопастность</span>
          </div>

          <div className={styles.menuItem} onClick={() => goToPage("/my-responses")}>
            <FileTextOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Мои отклики</span>
          </div>

          <div className={styles.menuItem} onClick={() => goToPage("/my-announcements")}>
            <FileTextOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Мои объявления</span>
          </div>

          <div className={styles.menuItem} onClick={() => setSettingsDrawerOpen(true)}>
            <SettingOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Настройки</span>
          </div>

          <div className={styles.menuItem}>
            <LogoutOutlined className={styles.menuIcon} />
            <span className={styles.menuText}>Выйти</span>
          </div>
        </div>

        {children}

        {/* Drawers */}
        <StatusDrawer
          isOpen={statusDrawerOpen}
          onClose={() => setStatusDrawerOpen(false)}
          status={status}
          onStatusChange={(val) => setStatus(val as StatusKey)}
        />

        <PhotoEditDrawer
          isOpen={photoDrawerOpen}
          onClose={() => setPhotoDrawerOpen(false)}
          onAddPhoto={() => fileInputRef.current?.click()}
          onDeletePhoto={() => console.log("Delete photo")}
        />

        <PasswordDrawer isOpen={passwordDrawerOpen} onClose={() => setPasswordDrawerOpen(false)} />

        <SettingsDrawer isOpen={settingsDrawerOpen} onClose={() => setSettingsDrawerOpen(false)} />

        <SavedFilterDrawer
          isOpen={savedFilterDrawerOpen}
          onClose={() => setSavedFilterDrawerOpen(false)}
        />

        <ProfileInfoDrawer
          isOpen={profileInfoDrawerOpen}
          onClose={() => setProfileInfoDrawerOpen(false)}
        />

        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.[0]) {
              console.log("File selected:", e.target.files[0]);
            }
          }}
          accept="image/*"
        />
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
