"use client";
import React, { useState, useRef } from "react";
import { Badge } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  FormOutlined,
  ExclamationOutlined,
  CameraOutlined,
  DeleteOutlined,
  HomeFilled,
} from "@ant-design/icons";
import {
  Modal as HeroModal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button as HeroButton,
  useDisclosure,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./DesktopLayout.module.scss";
import Container from "@/components/layouts/Container";
import ProgressBar from "../common/ProgressBar";
import UserAvatar from "../common/UserAvatar";
import { StatusKey } from "../common/StatusLabels";
import StatusModal from "./Modals/StatusModal";

// Moved outside component to prevent unnecessary recreations
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
    ),
  },
  {
    key: "my-announcements",
    icon: <FileTextOutlined />,
    label: (
      <div className={styles.menuBadgeItem}>
        <span>Мои объявления</span>
        <Badge count={1} style={{ backgroundColor: "#1AA683", color: "#fff" }} />
      </div>
    ),
  },
  { key: "questionnaire", icon: <FormOutlined />, label: "Анкета" },
];

function CustomMenu({
  currentTab,
  onMenuClick,
}: {
  currentTab: string;
  onMenuClick: (e: { key: string }) => void;
}) {
  return (
    <ul className={styles.customMenu}>
      {menuItems.map((item) => (
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

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [status, setStatus] = useState<StatusKey>("findingApartment");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Determine current tab based on pathname
  let currentTab = "profile";
  if (pathname.includes("/my-responses")) currentTab = "my-responses";
  else if (pathname.includes("/my-announcements")) currentTab = "my-announcements";
  else if (pathname.includes("/questionnaire")) currentTab = "questionnaire";

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

  return (
    <Container>
      <div className={styles.container}>
        <ProgressBar percent={25} />
        <div className={styles.mainWrapper}>
          <div className={styles.navbar}>
            <div className={styles.profileBlock}>
              <UserAvatar status={status} showEditIcon onEditClick={onOpen} size="normal" />
              <div className={styles.userName}>Алихан Оспанов</div>
            </div>
            <CustomMenu currentTab={currentTab} onMenuClick={handleMenuClick} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>

      {/* Photo Edit Modal */}
      <HeroModal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent className={styles.darkModalContent}>
          {() => (
            <>
              <ModalBody className={styles.darkModalBody}>
                <UserAvatar status={status} size="large" />
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

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModalOpen}
        onClose={closeStatusModal}
        status={status}
        onStatusChange={setStatus}
      />
    </Container>
  );
};

export default DesktopLayout;
