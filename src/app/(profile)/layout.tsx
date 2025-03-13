"use client";
import React, { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";
import { Menu, Badge, Progress, Modal as AntModal, Spin } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FormOutlined,
  EditOutlined,
  ExclamationOutlined,
  CameraOutlined,
  DeleteOutlined,
  HomeFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Modal as HeroModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button as HeroButton,
  Avatar,
  useDisclosure,
  RadioGroup,
  Radio,
} from "@heroui/react";
import styles from "./layout.module.scss";
import Container from "@/components/layouts/Container";

// Тип для статуса
type StatusKey =
  | "findingApartment"
  | "notFindingApartment"
  | "findingRoommate"
  | "notFindingRoommate";

const statusLabels: Record<StatusKey, string> = {
  findingApartment: "Ищу квартиру",
  notFindingApartment: "Не ищу квартиру",
  findingRoommate: "Ищу сожителя",
  notFindingRoommate: "Не ищу сожителя",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<StatusKey>("findingApartment");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pageLoaded, setPageLoaded] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: "#1AA683" }} spin />;

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

  const menuItems = [
    { key: "profile", icon: <UserOutlined />, label: "Профиль" },
    {
      key: "responses",
      icon: <FormOutlined />,
      label: (
        <div className={styles.menuBadgeItem}>
          <span>Мои отклики</span>
          <Badge count={28} style={{ backgroundColor: "#9dd6c6", color: "#111" }} />
        </div>
      ),
    },
    {
      key: "announcements",
      icon: <FileTextOutlined />,
      label: (
        <div className={styles.menuBadgeItem}>
          <span>Мои объявления</span>
          <Badge count={1} style={{ backgroundColor: "#9dd6c6", color: "#111" }} />
        </div>
      ),
    },
    { key: "questionnaire", icon: <FormOutlined />, label: "Анкета" },
  ];

  function handleOpenStatusModal() {
    setStatusModalOpen(true);
  }

  function closeStatusModal() {
    setStatusModalOpen(false);
  }

  return (
    <Container>
      <div className={styles.container}>
        {/* Верхняя часть страницы */}
        <div className={styles.topBar}>
          <div className={styles.iconCircle}>
            <ExclamationOutlined />
          </div>
          <div className={styles.progressInfo}>
            <div className={styles.infoRow}>
              <span className={styles.percent}>25%</span>
              <span className={styles.description}>
                Заполните полностью профиль и получите доступ к функции “Поделиться профилем”
              </span>
            </div>
            <Progress
              percent={25}
              showInfo={false}
              strokeColor="#1aa683"
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
                      d="
                        M 100,100
                        m -70,0
                        a 70,70 0 1,0 140,0
                        a 70,70 0 1,0 -140,0
                      "
                    />

                    
                    <text
                      fill="#fff"
                      fontSize="20"
                      fontWeight="bold"
                      stroke="#000000"
                      strokeWidth="4"
                      paintOrder="stroke"
                      
                    >
                      <textPath href="#circlePath" startOffset="100" textAnchor="middle">
                        #ИЩУ КВАРТИРУ
                      </textPath>
                    </text>
                  </svg>
                </div>
                <EditOutlined className={styles.editIcon} onClick={onOpen} />
              </div>

              <div className={styles.userName}>Алихан Оспанов</div>
            </div>

            <Menu mode="vertical" defaultSelectedKeys={["profile"]} items={menuItems} />
          </div>

          <div className={styles.content}>{children}</div>
        </div>
      </div>

      <HeroModal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent className={styles.darkModalContent}>
          {(onClose) => (
            <>
              <ModalBody className={styles.darkModalBody}>
                <Avatar src="/avatar/image.png" className="w-40 h-40 rounded-full" />
              </ModalBody>
              <div className={styles.modalDivider} />
              <ModalFooter className={styles.darkModalFooter}>
                <HeroButton
                  variant="ghost"
                  className={styles.footerButton}
                  onPress={handleOpenStatusModal}
                >
                  <HomeFilled style={{ fontSize: 20 }} />
                  {statusLabels[statusValue]}
                </HeroButton>
                <div className={styles.footerButton__edit}>
                  <HeroButton variant="ghost" className={styles.footerButton}>
                    <CameraOutlined style={{ fontSize: 20 }} />
                    Добавить фото
                  </HeroButton>
                  <HeroButton variant="ghost" className={styles.footerButton} color="danger">
                    <DeleteOutlined style={{ fontSize: 20 }} />
                    Удалить
                  </HeroButton>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </HeroModal>

      {/* Модальное окно выбора статуса (AntDesign) */}
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
        <p className={styles.statusModalSubhead}>
          Укажите ваш статус для поиска квартиры или сожителя
        </p>
        <RadioGroup
          label=""
          orientation="vertical"
          color="primary"
          value={statusValue}
          onValueChange={(val) => setStatusValue(val as StatusKey)}
          className={styles.heroRadioGroup}
        >
          <Radio value="findingApartment">Я ищу квартиру</Radio>
          <Radio value="notFindingApartment">Я не ищу квартиру</Radio>
          <Radio value="findingRoommate">Я ищу сожителя</Radio>
          <Radio value="notFindingRoommate">Я не ищу сожителя</Radio>
        </RadioGroup>
      </AntModal>
    </Container>
  );
}
