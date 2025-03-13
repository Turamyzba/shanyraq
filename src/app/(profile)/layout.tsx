"use client";
import React, { useEffect, useState, useRef } from "react";
import "@ant-design/v5-patch-for-react-19";
import { Badge, Progress, Modal as AntModal, Spin } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FormOutlined,
  EditOutlined,
  ExclamationOutlined,
  CameraOutlined,
  DeleteOutlined,
  HomeFilled,
  LoadingOutlined
} from "@ant-design/icons";
import {
  Modal as HeroModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button as HeroButton,
  useDisclosure,
  RadioGroup,
  Radio
} from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./layout.module.scss";
import Container from "@/components/layouts/Container";
import "./layout.scss";

type StatusKey =
  | "findingApartment"
  | "notFindingApartment"
  | "findingRoommate"
  | "notFindingRoommate";

const statusLabels: Record<StatusKey, string> = {
  findingApartment: "#ИЩУ КВАРТИРУ",
  notFindingApartment: "#НЕ ИЩУ КВАРТИРУ",
  findingRoommate: "#ИЩУ СОЖИТЕЛЯ",
  notFindingRoommate: "#НЕ ИЩУ СОЖИТЕЛЯ"
};

const menuItems = [
  { key: "profile", icon: <UserOutlined />, label: "Профиль" },
  {
    key: "my-responses",
    icon: <FormOutlined />,
    label: (
      <div className={styles.menuBadgeItem}>
        <span>Мои отклики</span>
        <Badge count={28} style={{ backgroundColor: "#1AA683", color: "#fff" }} />
      </div>
    )
  },
  {
    key: "my-announcements",
    icon: <FileTextOutlined />,
    label: (
      <div className={styles.menuBadgeItem}>
        <span>Мои объявления</span>
        <Badge count={1} style={{ backgroundColor: "#1AA683", color: "#fff" }} />
      </div>
    )
  },
  { key: "questionnaire", icon: <FormOutlined />, label: "Анкета" }
];

interface CustomMenuProps {
  currentTab: string;
  onMenuClick: (e: { key: string }) => void;
}

function CustomMenu({ currentTab, onMenuClick }: CustomMenuProps) {
  return (
    <ul className={styles.customMenu}>
      {menuItems.map(item => (
        <li
          key={item.key}
          className={`${styles.customMenuItem} ${item.key === currentTab ? styles.customMenuItemSelected : ""}`}
          onClick={() => onMenuClick({ key: item.key })}
        >
          <span className={styles.customMenuIcon}>{item.icon}</span>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [status, setStatus] = useState<StatusKey>("findingApartment");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pageLoaded, setPageLoaded] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: "#1AA683" }} spin />;
  const currentTab = searchParams.get("tab") || "profile";

  function handleMenuClick(e: { key: string }) {
    router.push(`/${e.key}`);
  }

  function handleOpenStatusModal() {
    setStatusModalOpen(true);
  }

  function closeStatusModal() {
    setStatusModalOpen(false);
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

  useEffect(() => {
    const handleLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!pageLoaded) {
    return (
      <div className={styles.loadingScreen}>
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.iconCircle}>
            <ExclamationOutlined />
          </div>
          <div className={styles.progressInfo}>
            <div className={styles.infoRow}>
              <span className={styles.percent}>25%</span>
              <span className={styles.description}>Заполните полностью профиль и получите доступ к функции “Поделиться профилем”</span>
            </div>
            <Progress
              percent={25}
              showInfo={false}
              strokeColor={{
                "0%": "#1AA68380",
                "100%": "#33958D"
              }}
              className={styles.progressBar}
            />
          </div>
        </div>
        <div className={styles.mainWrapper}>
          <div className={styles.navbar}>
            <div className={styles.profileBlock}>
              <div className={styles.avatarWrapper}>
                <div className={styles.photoCircle}>
                  <img src="/avatar/image.png" alt="Profile Photo" />
                  <svg viewBox="0 0 200 200" className={styles.circleSvg} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1aa683" />
                        <stop offset="100%" stopColor="#28a745" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="82" fill="none" stroke="url(#ringGradient)" strokeWidth="5" />
                    <path
                      id="circlePath"
                      fill="none"
                      d="M 100,100 m -70,0 a 70,70 0 1,0 140,0 a 70,70 0 1,0 -140,0"
                    />
                    <text fill="#fff" fontSize="20" fontWeight="bold" stroke="#000" strokeWidth="4" paintOrder="stroke">
                      <textPath href="#circlePath" startOffset="110" textAnchor="middle">
                        {statusLabels[status]}
                      </textPath>
                    </text>
                  </svg>
                </div>
                <EditOutlined className={styles.editIcon} onClick={onOpen} />
              </div>
              <div className={styles.userName}>Алихан Оспанов</div>
            </div>
            <CustomMenu currentTab={currentTab} onMenuClick={handleMenuClick} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
      <HeroModal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent className={styles.darkModalContent}>
          {(onClose) => (
            <>
              <ModalBody className={styles.darkModalBody}>
                <div className={styles.photoCircle}>
                  <img src="/avatar/image.png" alt="Profile Photo" />
                  <svg viewBox="0 0 200 200" className={styles.circleSvg} xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1aa683" />
                        <stop offset="100%" stopColor="#28a745" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="82" fill="none" stroke="url(#ringGradient)" strokeWidth="5" />
                    <path
                      id="circlePath"
                      fill="none"
                      d="M 100,100 m -70,0 a 70,70 0 1,0 140,0 a 70,70 0 1,0 -140,0"
                    />
                    <text fill="#fff" fontSize="20" fontWeight="bold" stroke="#000" strokeWidth="4" paintOrder="stroke">
                      <textPath href="#circlePath" startOffset="110" textAnchor="middle">
                        {statusLabels[status]}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </ModalBody>
              <div className={styles.modalDivider} />
              <ModalFooter className={styles.darkModalFooter}>
                <HeroButton className={styles.footerButton} onPress={handleOpenStatusModal}>
                  <HomeFilled style={{ fontSize: 20 }} />
                  Поменять статус
                </HeroButton>
                <div className={styles.footerButtonEdit}>
                  <HeroButton className={styles.footerButton} onPress={handleAddPhoto}>
                    <CameraOutlined style={{ fontSize: 20 }} />
                    Добавить фото
                  </HeroButton>
                  <HeroButton className={styles.footerButtonDelete}>
                    <DeleteOutlined style={{ fontSize: 20 }} />
                    Удалить
                  </HeroButton>
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HeroModal>
      <AntModal
        open={statusModalOpen}
        footer={null}
        title="Твой статус"
        closable
        maskClosable={false}
        mask
        className={styles.statusModal}
        onCancel={closeStatusModal}
        centered
      >
        <p className={styles.statusModalSubhead}>Укажите ваш статус для поиска квартиры или сожителя</p>
        <div className={styles.statusModalDivider} />
        <RadioGroup
          label=""
          orientation="vertical"
          color="primary"
          value={status}
          onValueChange={(val) => setStatus(val as StatusKey)}
          className={styles.heroRadioGroup}
        >
          <Radio value="findingApartment">Ищу квартиру</Radio>
          <Radio value="notFindingApartment">Не ищу квартиру</Radio>
          <Radio value="findingRoommate">Ищу сожителя</Radio>
          <Radio value="notFindingRoommate">Не ищу сожителя</Radio>
        </RadioGroup>
      </AntModal>
    </Container>
  );
}
