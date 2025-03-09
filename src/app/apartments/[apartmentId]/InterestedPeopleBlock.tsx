"use client";

import React, { useState } from "react";
import {
  Button,
  Avatar,
  AvatarGroup,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  User,
} from "@heroui/react";
import Images from "@/components/common/Images"; // Adjust to your actual import
import styles from "./InterestedPeopleBlock.module.scss";
import MyButton from "@/components/ui/MyButton";

/** Example interface for the user object */
interface User {
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

/** Example interface for a group */
interface Group {
  name: string;
  people: User[];
  maxSize?: string; // e.g. "7/7"
  isFull?: boolean;
}

/** Example interface for your main data object */
interface MockApartmentData {
  interestedPeopleCount: number;
  interestedGroupCount: number;
  groups?: Group[];
}

/** Example props interface for your component */
interface InterestedPeopleBlockProps {
  mockApartmentData: MockApartmentData;
}

export default function InterestedPeopleBlock({
  mockApartmentData,
}: InterestedPeopleBlockProps) {
  // Track which groups are expanded
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

  // "New Group" modal
  const {
    isOpen: isNewGroupModalOpen,
    onOpen: onOpenNewGroupModal,
    onOpenChange: onCloseNewGroupModal,
  } = useDisclosure();

  // "Profile" (Анкета) modal
  const {
    isOpen: isProfileModalOpen,
    onOpen: openProfileModal,
    onOpenChange: onCloseProfileModal,
  } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // For counters in the "New Group" modal
  const [howManyYouAre, setHowManyYouAre] = useState<number>(3);
  const [howManyYouNeed, setHowManyYouNeed] = useState<number>(3);

  const handleOpenProfileModal = (user: User) => {
    setSelectedUser(user);
    openProfileModal();
  };

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups((prev) =>
      prev.includes(groupIndex)
        ? prev.filter((idx) => idx !== groupIndex)
        : [...prev, groupIndex]
    );
  };

  return (
    <div className={styles.interestedPeopleBlock}>
      {/* Header: "Заинтересованы в объявлении: X человек" + "Количество групп: Y" */}
      <div className={styles.interestedHeader}>
        <p className={styles.interestedText}>
          Заинтересованы в объявлении:{" "}
          <br />
          <strong className={styles.interestedCount}>
            {mockApartmentData.interestedPeopleCount} человек
          </strong>
        </p>
        <span className={styles.viewGroupsLink}>
          Количество групп: {mockApartmentData.interestedGroupCount}
        </span>
      </div>

      {/* If no groups yet */}
      {mockApartmentData.interestedGroupCount === 0 && (
        <div className={styles.noGroups}>
          <p className={styles.noGroupsText}>
            Пока нет групп. Создайте свою группу!
          </p>
        </div>
      )}

      {/* If we have existing groups */}
      {mockApartmentData.interestedGroupCount > 0 && mockApartmentData.groups && (
        <div className={styles.groupsWrapper}>
          {mockApartmentData.groups.map((group, idx) => {
            const isExpanded = expandedGroups.includes(idx);
            return (
              <div key={idx} className={styles.groupContainer}>
                {/* Group Header */}
                <div className={styles.groupHeader}>
                  <div className={styles.groupLeft}>
                    <div className={styles.groupLeftFirst}>
                        <p className={styles.groupName}>{group.name}</p>
                        <AvatarGroup
                        isBordered
                        max={4}
                        total={group.people.length}
                        className={styles.avatarGroup}
                        >
                        {group.people.map((person, pIdx) => (
                            <Avatar
                            key={pIdx}
                            size="sm"
                            src={person.avatar || "https://i.pravatar.cc/150"}
                            />
                        ))}
                        </AvatarGroup>
                    </div>
                    {group.maxSize && (
                      <span className={styles.maxPeople}>
                        Количество людей {group.maxSize}
                      </span>
                    )}
                  </div>

                  <div className={styles.groupActions}>
                    <Button
                      variant="light"
                      className={`${styles.expandButton} ${
                        isExpanded ? styles.rotated : ""
                      }`}
                      endContent={isExpanded ? <Images.ChevronUp size={20} /> : <Images.ChevronDown size={20} />}
                      onPress={() => toggleGroup(idx)}
                    >
                        Узнать больше
                      
                    </Button>
                    <Button
                      color="primary"
                      className={styles.applyButton}
                    //   onPress={() => alert(`Подать заявку в ${group.name}`)}
                    >
                      Подать заявку
                    </Button>
                  </div>
                </div>

                {/* Expanded Group Details */}
                {isExpanded && (
                  <div className={styles.groupDetails}>
                    <div className={styles.tableWrapper}>
                      <Table removeWrapper  aria-label="Group Members Table">
                        <TableHeader>
                          <TableColumn>Имя</TableColumn>
                          <TableColumn>Роль</TableColumn>
                          <TableColumn align={"end"} >{""}</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {group.people.map((person, pIdx) => (
                            <TableRow key={pIdx}>
                              <TableCell>
                              <User
                                avatarProps={{ src: person.avatar || "https://i.pravatar.cc/150"}}
                                name={person.firstName}
                            >
                                {person.firstName}
                            </User>
                              </TableCell>
                              <TableCell>{person.role}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  onPress={() => handleOpenProfileModal(person)}
                                >
                                    Анкета
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Button
        className={styles.createGroupButton}
        // color="success"
        onPress={onOpenNewGroupModal}
      >
        Создать группу
      </Button>

      {/* "New Group" Modal */}
      <Modal
        isOpen={isNewGroupModalOpen}
        onOpenChange={onCloseNewGroupModal}
        backdrop="opaque"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Новая группа</ModalHeader>
              <ModalBody>
                <div className={styles.modalContent}>
                    <p className={styles.modalSubText}>Сколько вас человек?</p>
                    <div className={styles.counterRow}>
                    <Button
                        variant="light"
                        isIconOnly
                        startContent={<Images.MinusIcon color="red" size={20} />}
                        onPress={() =>
                        setHowManyYouAre((prev) => Math.max(1, prev - 1))
                        }
                    />
                    <span>{howManyYouAre}</span>
                    <Button
                        variant="light"
                        isIconOnly
                        startContent={<Images.PlusIcon color="#1aa683" size={20} />}
                        onPress={() => setHowManyYouAre((prev) => prev + 1)}
                    />
                    </div>
                </div>

                <div className={styles.modalContent}>
                    <p className={styles.modalSubText}>Сколько человек ищете?</p>
                    <div className={styles.counterRow}>
                    <Button
                        variant="light"
                        isIconOnly
                        startContent={<Images.MinusIcon color="red" size={20} />}
                        onPress={() =>
                            setHowManyYouNeed((prev) => Math.max(1, prev - 1))
                        }
                    />
                    <span>{howManyYouNeed}</span>
                    <Button
                        variant="light"
                        isIconOnly
                        startContent={<Images.PlusIcon color="#1aa683" size={20} />}
                        onPress={() => setHowManyYouNeed((prev) => prev + 1)}
                    />
                    </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  className={styles.closeButton}
                  onPress={onClose}
                >
                  Отмена
                </Button>
                <Button
                  color="success"
                  className={styles.confirmButton}
                  onPress={() => {
                    // Example logic
                    alert(
                      `Группа создана! (Вы: ${howManyYouAre}, Ищете: ${howManyYouNeed})`
                    );
                    onClose();
                  }}
                >
                  Создать группу
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* "Profile" (Анкета) Modal */}
      <Modal
        isOpen={isProfileModalOpen && !!selectedUser}
        onOpenChange={onCloseProfileModal}
        backdrop="opaque"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Анкета</ModalHeader>
              <ModalBody>
                <User
                    avatarProps={{ src: selectedUser?.avatar || "https://i.pravatar.cc/150"}}
                    name={selectedUser?.firstName}
                />

                <p>
                  <strong>Вопрос 1:</strong> Какой ваш обычный распорядок дня и
                  каковы ваши жизненные приоритеты?
                </p>
                <p className={styles.modalAnswer}>
                  Я провожу весь день дома, работаю/учусь дистанционно. Мне важно
                  иметь спокойную обстановку дома.
                </p>
                <hr />
                <p>
                  <strong>Вопрос 2:</strong> Как вы относитесь к религиозным
                  практикам и традициям?
                </p>
                <p className={styles.modalAnswer}>
                  Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мой
                  сожитель с уважением относился к этому.
                </p>
                <hr />
                <p>
                  <strong>Вопрос 3:</strong> Какое у вас отношение к курению и
                  алкогольным напиткам?
                </p>
                <p className={styles.modalAnswer}>
                  Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это
                  не переросло в проблему.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button className={styles.closeButton} onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
