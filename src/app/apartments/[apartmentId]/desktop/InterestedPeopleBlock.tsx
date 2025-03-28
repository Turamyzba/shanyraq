"use client";

import React, { useState, useEffect } from "react";
import { Button as ButtonAnt } from "antd";
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
  Input,
  Switch,
  Divider
} from "@heroui/react";
import Images from "@/components/common/Images";
import styles from "./InterestedPeopleBlock.module.scss";
import { showToast } from "@/utils/notification";
import { useCreateGroupMutation, useCreateApplicationMutation } from "@/store/features/apartmentDetails/apartmentDetailsApi";

interface GroupMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  me?: boolean;
}

interface Group {
  id: number;
  name: string;
  people: GroupMember[];
  freeSlots?: number;
  isFull?: boolean;
}

interface GroupData {
  interestedPeopleCount: number;
  interestedGroupCount: number;
  groups?: Group[];
}

interface InterestedPeopleBlockProps {
  apartmentId: number;
  capacity: number;
  groupData: GroupData;
}

interface MemberInput {
  name: string;
  phone: string;
}

export default function InterestedPeopleBlock({ apartmentId, capacity, groupData }: InterestedPeopleBlockProps) {
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [howManyYouAre, setHowManyYouAre] = useState<number>(1);
  const [capacityGroup, setCapacityGroup] = useState<number>(1);
  const [changeCapacity, setChangeCapacity] = useState<boolean>(false);
  const [additionalMembers, setAdditionalMembers] = useState<MemberInput[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [createGroup, { isLoading: isCreatingGroup }] = useCreateGroupMutation();
  const [createApplication, { isLoading: isApplying }] = useCreateApplicationMutation();

  const {
    isOpen: isNewGroupModalOpen,
    onOpen: onOpenNewGroupModal,
    onOpenChange: onNewGroupModalChange,
  } = useDisclosure();

  const {
    isOpen: isProfileModalOpen,
    onOpen: openProfileModal,
    onOpenChange: onProfileModalChange,
  } = useDisclosure();

  const {
    isOpen: isApplyModalOpen,
    onOpen: openApplyModal,
    onOpenChange: onApplyModalChange,
  } = useDisclosure();
  
  const [selectedUser, setSelectedUser] = useState<GroupMember | null>(null);

  // Effect to adjust capacity when toggle changes
  useEffect(() => {
    if (changeCapacity) {
      setCapacityGroup(Math.max(howManyYouAre, 1));
    }
  }, [changeCapacity]);

  // Effect to adjust member count when capacity changes
  useEffect(() => {
    if (changeCapacity && howManyYouAre > capacityGroup) {
      handleHowManyYouAreChange(capacityGroup);
    }
  }, [capacityGroup, changeCapacity]);

  const handleOpenProfileModal = (user: GroupMember) => {
    setSelectedUser(user);
    openProfileModal();
  };

  const handleApplyToGroup = (group: Group) => {
    setSelectedGroup(group);
    setHowManyYouAre(1);
    setAdditionalMembers([]);
    openApplyModal();
  };

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups((prev) =>
      prev.includes(groupIndex) ? prev.filter((idx) => idx !== groupIndex) : [...prev, groupIndex]
    );
  };

  const updateAdditionalMember = (index: number, field: 'name' | 'phone', value: string) => {
    const updatedMembers = [...additionalMembers];
    updatedMembers[index] = { 
      ...updatedMembers[index],
      [field]: value 
    };
    setAdditionalMembers(updatedMembers);
  };

  const handleHowManyYouAreChange = (newValue: number) => {
    // Apply constraints with apartment capacity
    const maxValue = changeCapacity ? capacityGroup : capacity;
    const constrainedValue = Math.min(Math.max(1, newValue), maxValue);
    
    const currentValue = howManyYouAre;
    setHowManyYouAre(constrainedValue);
    
    if (constrainedValue > currentValue) {
      const newMembers = [...additionalMembers];
      for (let i = currentValue - 1; i < constrainedValue - 1; i++) {
        newMembers.push({ name: "", phone: "" });
      }
      setAdditionalMembers(newMembers);
    } 
    else if (constrainedValue < currentValue) {
      setAdditionalMembers(additionalMembers.slice(0, constrainedValue - 1));
    }
  };

  const handleCapacityChange = (newValue: number) => {
    // Capacity constraints: 1 <= newCapacity <= apartment capacity
    const constrainedValue = Math.min(Math.max(1, newValue), capacity);
    setCapacityGroup(constrainedValue);
  };

  const handleOpenNewGroupModal = () => {
    setHowManyYouAre(1);
    setCapacityGroup(1);
    setChangeCapacity(false);
    setAdditionalMembers([]);
    onOpenNewGroupModal();
  };

  const handleChangeCapacity = (checked: boolean) => {
    setChangeCapacity(checked);
    if (checked) {
      // When enabling, set capacity to match current member count
      setCapacityGroup(Math.max(howManyYouAre, 1));
    }
  };

  const handleCreateGroup = async () => {
    if (howManyYouAre > 1) {
      const isValid = additionalMembers.every(member => member.name && member.phone);
      if (!isValid) {
        showToast({
          title: "",
          description: "Пожалуйста, заполните информацию для всех участников",
          color: "danger"
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const memberData = additionalMembers.map(member => ({
        name: member.name,
        phoneNumbers: [`["${member.phone}"]`]
      }));

      await createGroup({
        announcementId: apartmentId,
        body: {
          capacity: changeCapacity ? capacityGroup : howManyYouAre,
          countOfPeople: howManyYouAre,
          memberData: memberData
        }
      });

      onNewGroupModalChange();
      
    } catch (error) {
      showToast({
        title: "",
        description: "Не удалось создать группу. Пожалуйста, попробуйте позже.",
        color: "danger"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyToGroupSubmit = async () => {
    if (!selectedGroup) {
      showToast({
        title: "",
        description: "Выберите группу для подачи заявки",
        color: "danger"
      });
      return;
    }

    if (howManyYouAre > 1) {
      const isValid = additionalMembers.every(member => member.name && member.phone);
      if (!isValid) {
        showToast({
          title: "",
          description: "Пожалуйста, заполните информацию для всех участников",
          color: "danger"
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const memberData = additionalMembers.map(member => ({
        name: member.name,
        phoneNumbers: [`["${member.phone}"]`]
      }));
      
      await createApplication({
        groupId: selectedGroup.id,
        body: {
          countOfPeople: howManyYouAre,
          memberData: memberData
        }
      });

      onApplyModalChange();
      
    } catch (error) {
      showToast({
        title: "",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте позже.",
        color: "danger"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGroupFreeSlots = (group: Group): number => {
    return group.freeSlots ?? 0;
  };

  return (
    <div className={styles.interestedPeopleBlock}>
      <div className={styles.interestedHeader}>
        <p className={styles.interestedText}>
          Заинтересованы в объявлении: <br />
          <strong className={styles.interestedCount}>
            {groupData.interestedPeopleCount} человек
          </strong>
        </p>
        <span className={styles.viewGroupsLink}>
          Количество групп: {groupData.interestedGroupCount}
        </span>
      </div>

      {/* If no groups yet */}
      {groupData.interestedGroupCount === 0 && (
        <div className={styles.noGroups}>
          <p className={styles.noGroupsText}>Пока нет групп. Создайте свою группу!</p>
        </div>
      )}

      {groupData.interestedGroupCount > 0 && groupData.groups && (
        <div className={styles.groupsWrapper}>
          {groupData.groups.map((group, idx) => {
            const isExpanded = expandedGroups.includes(idx);
            const freeSlots = getGroupFreeSlots(group);
            return (
              <div key={idx} className={styles.groupContainer}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupLeft}>
                    <div className={styles.groupLeftFirst}>
                      <p className={styles.groupName}>{group.name}</p>
                      {group.people.length > 1 ? (
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
                              src={person.avatar}
                            />
                          ))}
                        </AvatarGroup>
                      ) : (
                        <Avatar
                          size="sm"
                          src={group.people[0]?.avatar}
                        />
                      )}
                      
                    </div>
                    <span className={styles.maxPeople}>
                      Свободных мест: {freeSlots}
                    </span>
                  </div>

                  <div className={styles.groupActions}>
                    <Button
                      variant="light"
                      className={`${styles.expandButton} ${isExpanded ? styles.rotated : ""}`}
                      endContent={
                        isExpanded ? (
                          <Images.ChevronUp size={20} />
                        ) : (
                          <Images.ChevronDown size={20} />
                        )
                      }
                      onPress={() => toggleGroup(idx)}
                    >
                      Узнать больше
                    </Button>
                    <Button
                      color="primary"
                      className={styles.applyButton}
                      onPress={() => handleApplyToGroup(group)}
                      isDisabled={freeSlots <= 0}
                    >
                      Подать заявку
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className={styles.groupDetails}>
                    <div className={styles.tableWrapper}>
                      <Table removeWrapper aria-label="Group Members Table">
                        <TableHeader>
                          <TableColumn>Имя</TableColumn>
                          <TableColumn>Роль</TableColumn>
                          <TableColumn align={"end"}>{""}</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {group.people.map((person, pIdx) => (
                            <TableRow key={pIdx}>
                              <TableCell>
                                <User
                                  avatarProps={{
                                    src: person.avatar,
                                  }}
                                  name={`${person.firstName} ${person.lastName}`}
                                >
                                  {person.firstName}
                                </User>
                              </TableCell>
                              <TableCell>
                                 {person.role}
                              </TableCell>
                              <TableCell>
                                 <ButtonAnt className={styles.viewProfileButton} onClick={() => handleOpenProfileModal(person)} >Анкета</ButtonAnt>
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
        onPress={handleOpenNewGroupModal}
      >
        Создать группу
      </Button>

      <Modal
        isOpen={isNewGroupModalOpen}
        onOpenChange={onNewGroupModalChange}
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
                      onPress={() => handleHowManyYouAreChange(howManyYouAre - 1)}
                      isDisabled={howManyYouAre <= 1}
                    />
                    <span>{howManyYouAre}</span>
                    <Button
                      variant="light"
                      isIconOnly
                      startContent={<Images.PlusIcon color="#1aa683" size={20} />}
                      onPress={() => handleHowManyYouAreChange(howManyYouAre + 1)}
                      isDisabled={(changeCapacity && howManyYouAre >= capacityGroup) || howManyYouAre >= capacity}
                    />
                  </div>
                </div>
                
                {additionalMembers.map((member, index) => (
                  <div key={index} className={styles.additionalMemberSection}>
                    <Divider className={styles.memberDivider} />
                    <h4 className={styles.memberTitle}>Участник {index + 2}</h4>
                    
                    <div className={styles.formGroup}>
                      <label>Имя</label>
                      <Input
                        type="text"
                        placeholder="Имя Фамилия"
                        value={member.name}
                        onChange={(e) => updateAdditionalMember(index, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Номер телефона</label>
                      <Input
                        type="tel"
                        placeholder="+7 (XXX) XXX XX XX"
                        value={member.phone}
                        onChange={(e) => updateAdditionalMember(index, 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                
                <div className={styles.capacityToggle}>
                  <div className={styles.toggleWrapper}>
                    <p className={styles.modalSubText}>Изменить вместимость группы</p>
                    <Switch 
                      checked={changeCapacity}
                      onChange={(e) => handleChangeCapacity(e.target.checked)}
                    />
                  </div>
                  
                  {changeCapacity && (
                    <div className={styles.modalContent}>
                      <p className={styles.modalSubText}>Вместимость группы</p>
                      <div className={styles.counterRow}>
                        <Button
                          variant="light"
                          isIconOnly
                          startContent={<Images.MinusIcon color="red" size={20} />}
                          onPress={() => handleCapacityChange(capacityGroup - 1)}
                          isDisabled={capacityGroup <= 1 || capacityGroup <= howManyYouAre}
                        />
                        <span>{capacityGroup}</span>
                        <Button
                          variant="light"
                          isIconOnly
                          startContent={<Images.PlusIcon color="#1aa683" size={20} />}
                          onPress={() => handleCapacityChange(capacityGroup + 1)}
                          isDisabled={capacityGroup >= capacity}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" className={styles.closeButton} onPress={onClose}>
                  Отмена
                </Button>
                <Button
                  color="success"
                  className={styles.confirmButton}
                  onPress={handleCreateGroup}
                  isLoading={isSubmitting || isCreatingGroup}
                >
                  Создать группу
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isApplyModalOpen && !!selectedGroup}
        onOpenChange={onApplyModalChange}
        backdrop="opaque"
        size="2xl"
        scrollBehavior="inside"
        style={{ zIndex: 9000 }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Подать заявку в группу {selectedGroup?.name}</ModalHeader>
              <ModalBody>
                <div className={styles.modalContent}>
                  <p className={styles.modalSubText}>Сколько вас человек?</p>
                  <div className={styles.counterRow}>
                    <Button
                      variant="light"
                      isIconOnly
                      startContent={<Images.MinusIcon color="red" size={20} />}
                      onPress={() => handleHowManyYouAreChange(howManyYouAre - 1)}
                      isDisabled={howManyYouAre <= 1}
                    />
                    <span>{howManyYouAre}</span>
                    <Button
                      variant="light"
                      isIconOnly
                      startContent={<Images.PlusIcon color="#1aa683" size={20} />}
                      onPress={() => {
                        const maxSlots = Math.min(selectedGroup?.freeSlots ?? 1, capacity);
                        handleHowManyYouAreChange(Math.min(maxSlots, howManyYouAre + 1));
                      }}
                      isDisabled={howManyYouAre >= Math.min(selectedGroup?.freeSlots ?? 1, capacity)}
                    />
                  </div>
                </div>

                {additionalMembers.map((member, index) => (
                  <div key={index} className={styles.additionalMemberSection}>
                    <Divider className={styles.memberDivider} />
                    <h4 className={styles.memberTitle}>Участник {index + 2}</h4>
                    
                    <div className={styles.formGroup}>
                      <label>Имя</label>
                      <Input
                        type="text"
                        placeholder="Имя Фамилия"
                        value={member.name}
                        onChange={(e) => updateAdditionalMember(index, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label>Номер телефона</label>
                      <Input
                        type="tel"
                        placeholder="+7 (XXX) XXX XX XX"
                        value={member.phone}
                        onChange={(e) => updateAdditionalMember(index, 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" className={styles.closeButton} onPress={onClose}>
                  Отмена
                </Button>
                <Button
                  color="success"
                  className={styles.applyButton}
                  onPress={handleApplyToGroupSubmit}
                  isLoading={isSubmitting || isApplying}
                >
                  Подать заявку
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isProfileModalOpen && !!selectedUser}
        onOpenChange={onProfileModalChange}
        backdrop="opaque"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Анкета</ModalHeader>
              <ModalBody>
                <User
                  avatarProps={{ src: selectedUser?.avatar || "https://i.pravatar.cc/150" }}
                  name={`${selectedUser?.firstName} ${selectedUser?.lastName}`}
                />

                <p>
                  <strong>Вопрос 1:</strong> Какой ваш обычный распорядок дня и каковы ваши
                  жизненные приоритеты?
                </p>
                <p className={styles.modalAnswer}>
                  Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную
                  обстановку дома.
                </p>
                <hr />
                <p>
                  <strong>Вопрос 2:</strong> Как вы относитесь к религиозным практикам и традициям?
                </p>
                <p className={styles.modalAnswer}>
                  Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мой сожитель с
                  уважением относился к этому.
                </p>
                <hr />
                <p>
                  <strong>Вопрос 3:</strong> Какое у вас отношение к курению и алкогольным напиткам?
                </p>
                <p className={styles.modalAnswer}>
                  Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это не происходило в общих зонах.
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