"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button as ButtonAnt } from "antd";
import {
  Button,
  Avatar,
  AvatarGroup,
  User,
  Input,
  Divider,
  Switch,
} from "@heroui/react";
import { Drawer } from "antd";
import Images from "@/components/common/Images";
import styles from "./MobileInterestedPeopleBlock.module.scss";
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

interface MobileInterestedPeopleBlockProps {
  apartmentId: number;
  capacity: number;
  groupData: GroupData;
}

interface MemberInput {
  name: string;
  phone: string;
}

// Define the shape of the imperative handle exposed by the forwardRef
export interface MobileInterestedPeopleBlockHandle {
  handleOpenNewGroupModal: () => void;
}

const MobileInterestedPeopleBlock = forwardRef<MobileInterestedPeopleBlockHandle, MobileInterestedPeopleBlockProps>((props, ref) => {
  const { apartmentId, capacity, groupData } = props;
  
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [howManyYouAre, setHowManyYouAre] = useState<number>(1);
  const [capacityGroup, setCapacityGroup] = useState<number>(1);
  const [changeCapacity, setChangeCapacity] = useState<boolean>(false);
  const [additionalMembers, setAdditionalMembers] = useState<MemberInput[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [selectedUser, setSelectedUser] = useState<GroupMember | null>(null);

  // Drawer states
  const [newGroupDrawerOpen, setNewGroupDrawerOpen] = useState<boolean>(false);
  const [applyDrawerOpen, setApplyDrawerOpen] = useState<boolean>(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState<boolean>(false);

  const [createGroup, { isLoading: isCreatingGroup }] = useCreateGroupMutation();
  const [createApplication, { isLoading: isApplying }] = useCreateApplicationMutation();

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    handleOpenNewGroupModal: () => {
      handleOpenNewGroupModal();
    }
  }));

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
    setProfileDrawerOpen(true);
  };

  const handleApplyToGroup = (group: Group) => {
    setSelectedGroup(group);
    setHowManyYouAre(1);
    setAdditionalMembers([]);
    setApplyDrawerOpen(true);
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
    setNewGroupDrawerOpen(true);
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

      setNewGroupDrawerOpen(false);
      
      showToast({
        title: "Успех!",
        description: "Группа успешно создана",
        color: "success"
      });
      
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

      setApplyDrawerOpen(false);
      
      showToast({
        title: "Успех!",
        description: "Заявка успешно отправлена",
        color: "success"
      });
      
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
    <div className={styles.mobileInterestedPeopleBlock}>
      <div className={styles.interestedHeader}>
        <p className={styles.interestedText}>
          <span className={styles.interestedCount}>{groupData.interestedPeopleCount} человек</span> заинтересованы
        </p>
        <span className={styles.groupCount}>Количество групп: {groupData.interestedGroupCount}</span>
      </div>

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
                  <div className={styles.groupInfo}>
                    <p className={styles.groupName}>{group.name}</p>
                    <div className={styles.groupInfoRow}>
                      <AvatarGroup
                        isBordered
                        max={3}
                        total={group.people.length - 3}
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
                      <span className={styles.maxPeople}>
                        Свободных мест: {freeSlots}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="light"
                    className={styles.expandButton}
                    onPress={() => toggleGroup(idx)}
                    endContent={
                      isExpanded ? (
                        <Images.ChevronUp size={16} />
                      ) : (
                        <Images.ChevronDown size={16} />
                      )
                    }
                  >
                    {isExpanded ? "Скрыть" : "Узнать больше"}
                  </Button>
                </div>

                {isExpanded && (
                  <div className={styles.groupMembers}>
                    {group.people.map((person, pIdx) => (
                      <div key={pIdx} className={styles.memberRow}>
                        <div className={styles.memberInfo}>
                          <Avatar
                            size="sm"
                            src={person.avatar}
                          />
                          <div className={styles.memberDetails}>
                            <p className={styles.memberName}>{person.firstName} {person.lastName}</p>
                            <p className={styles.memberRole}>{person.role}</p>
                          </div>
                        </div>
                        <ButtonAnt className={styles.viewProfileButton} onClick={() => handleOpenProfileModal(person)} >Анкета</ButtonAnt>

                      </div>
                    ))}
                    <Button
                      color="primary"
                      className={styles.applyButton}
                      fullWidth
                      onPress={() => handleApplyToGroup(group)}
                      isDisabled={freeSlots <= 0}
                    >
                      Подать заявку
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Button
        className={styles.createGroupButton}
        fullWidth
        onPress={handleOpenNewGroupModal}
      >
        Создать группу
      </Button>

      <Drawer
        title={
          <div className={styles.drawerHeader}>
            <span>Новая группа</span>
          </div>
        }
        placement="bottom"
        height="90vh"
        onClose={() => setNewGroupDrawerOpen(false)}
        open={newGroupDrawerOpen}
        className={styles.mobileDrawer}
      >
        <div className={styles.drawerContent}>
          <div className={styles.counterContainer}>
            <p className={styles.counterLabel}>Сколько вас человек?</p>
            <div className={styles.counterRow}>
              <Button
                variant="light"
                isIconOnly
                className={styles.counterButton}
                onPress={() => handleHowManyYouAreChange(howManyYouAre - 1)}
                isDisabled={howManyYouAre <= 1}
              >
                <Images.MinusIcon color="red" size={20} />
              </Button>
              <span className={styles.counterValue}>{howManyYouAre}</span>
              <Button
                variant="light"
                isIconOnly
                className={styles.counterButton}
                onPress={() => handleHowManyYouAreChange(howManyYouAre + 1)}
                isDisabled={(changeCapacity && howManyYouAre >= capacityGroup) || howManyYouAre >= capacity}
              >
                <Images.PlusIcon color="#1aa683" size={20} />
              </Button>
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
                  fullWidth
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Номер телефона</label>
                <Input
                  type="tel"
                  placeholder="+7 (XXX) XXX XX XX"
                  value={member.phone}
                  onChange={(e) => updateAdditionalMember(index, 'phone', e.target.value)}
                  fullWidth
                />
              </div>
            </div>
          ))}
          
          <div className={styles.capacityToggle}>
            <div className={styles.toggleWrapper}>
              <p className={styles.counterLabel}>Изменить вместимость группы</p>
              <Switch 
                checked={changeCapacity}
                onChange={(e) => handleChangeCapacity(e.target.checked)}
              />
            </div>
            
            {changeCapacity && (
              <div className={styles.counterContainer}>
                <p className={styles.counterLabel}>Вместимость группы</p>
                <div className={styles.counterRow}>
                  <Button
                    variant="light"
                    isIconOnly
                    className={styles.counterButton}
                    onPress={() => handleCapacityChange(capacityGroup - 1)}
                    isDisabled={capacityGroup <= 1 || capacityGroup <= howManyYouAre}
                  >
                    <Images.MinusIcon color="red" size={20} />
                  </Button>
                  <span className={styles.counterValue}>{capacityGroup}</span>
                  <Button
                    variant="light"
                    isIconOnly
                    className={styles.counterButton}
                    onPress={() => handleCapacityChange(capacityGroup + 1)}
                    isDisabled={capacityGroup >= capacity}
                  >
                    <Images.PlusIcon color="#1aa683" size={20} />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button
            color="primary"
            className={styles.submitButton}
            onPress={handleCreateGroup}
            isLoading={isSubmitting || isCreatingGroup}
            fullWidth
          >
            Создать группу
          </Button>
        </div>
      </Drawer>

      <Drawer
        title={
          <div className={styles.drawerHeader}>
            <span>Подать заявку в группу {selectedGroup?.name}</span>
          </div>
        }
        placement="bottom"
        height="70vh"
        onClose={() => setApplyDrawerOpen(false)}
        open={applyDrawerOpen && !!selectedGroup}
        className={styles.mobileDrawer}
        // closeIcon={<Images.ChevronDown size={24} />}
      >
        <div className={styles.drawerContent}>
          <div className={styles.counterContainer}>
            <p className={styles.counterLabel}>Сколько вас человек?</p>
            <div className={styles.counterRow}>
              <Button
                variant="light"
                isIconOnly
                className={styles.counterButton}
                onPress={() => handleHowManyYouAreChange(howManyYouAre - 1)}
                isDisabled={howManyYouAre <= 1}
              >
                <Images.MinusIcon color="red" size={20} />
              </Button>
              <span className={styles.counterValue}>{howManyYouAre}</span>
              <Button
                variant="light"
                isIconOnly
                className={styles.counterButton}
                onPress={() => {
                  const maxSlots = Math.min(selectedGroup?.freeSlots ?? 1, capacity);
                  handleHowManyYouAreChange(Math.min(maxSlots, howManyYouAre + 1));
                }}
                isDisabled={howManyYouAre >= Math.min(selectedGroup?.freeSlots ?? 1, capacity)}
              >
                <Images.PlusIcon color="#1aa683" size={20} />
              </Button>
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
                  fullWidth
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Номер телефона</label>
                <Input
                  type="tel"
                  placeholder="+7 (XXX) XXX XX XX"
                  value={member.phone}
                  onChange={(e) => updateAdditionalMember(index, 'phone', e.target.value)}
                  fullWidth
                />
              </div>
            </div>
          ))}

          <Button
            color="primary"
            className={styles.submitButton}
            onPress={handleApplyToGroupSubmit}
            isLoading={isSubmitting || isApplying}
            fullWidth
          >
            Подать заявку
          </Button>
        </div>
      </Drawer>

      <Drawer
        title={
          <div className={styles.drawerHeader}>
            <span>Анкета</span>
          </div>
        }
        placement="bottom"
        height="90vh"
        onClose={() => setProfileDrawerOpen(false)}
        open={profileDrawerOpen && !!selectedUser}
        className={styles.mobileDrawer}
      >
        <div className={styles.drawerContent}>
          <div className={styles.profileHeader}>
            <Avatar
              src={selectedUser?.avatar || "https://i.pravatar.cc/150"}
              size="lg"
              isBordered
            />
            <h3 className={styles.profileName}>{selectedUser?.firstName} {selectedUser?.lastName}</h3>
            <p className={styles.profileRole}>{selectedUser?.role}</p>
          </div>

          <div className={styles.questionItem}>
            <h4 className={styles.questionTitle}>Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?</h4>
            <p className={styles.questionAnswer}>
              Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную обстановку дома.
            </p>
          </div>

          <div className={styles.questionItem}>
            <h4 className={styles.questionTitle}>Как вы относитесь к религиозным практикам и традициям?</h4>
            <p className={styles.questionAnswer}>
              Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мой сожитель с уважением относился к этому.
            </p>
          </div>

          <div className={styles.questionItem}>
            <h4 className={styles.questionTitle}>Какое у вас отношение к курению и алкогольным напиткам?</h4>
            <p className={styles.questionAnswer}>
              Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это не происходило в общих зонах.
            </p>
          </div>

          <Button
            variant="flat"
            className={styles.closeButton}
            onPress={() => setProfileDrawerOpen(false)}
            fullWidth
          >
            Закрыть
          </Button>
        </div>
      </Drawer>
    </div>
  );
});

MobileInterestedPeopleBlock.displayName = "MobileInterestedPeopleBlock";

export default MobileInterestedPeopleBlock;