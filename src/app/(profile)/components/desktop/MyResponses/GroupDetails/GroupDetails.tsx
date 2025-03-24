import React, { useState } from "react";
import { Button } from "antd";
import { Group, ApartmentDetails, ModalConfig } from "./types";
import ApartmentDetailsComponent from "./ApartmentDetails";
import GroupList from "./GroupList";
import ActionModals from "./ActionModals";
import styles from "./GroupDetails.module.scss";

interface GroupDetailsProps {
  apartmentDetails: ApartmentDetails;
  groups: Group[];
}

const GroupDetails: React.FC<GroupDetailsProps> = ({ apartmentDetails, groups }) => {
  const [groupsData, setGroupsData] = useState<Group[]>(groups);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const handleLeaveGroup = (groupId: number) => {
    setModalConfig({
      isOpen: true,
      title: "Покинуть группу",
      message: "Вы уверены, что хотите покинуть группу? Это действие невозможно отменить.",
      confirmText: "Покинуть",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData(groupsData.filter((group) => group.id !== groupId));
        setModalConfig(null);
      },
    });
  };

  const handleRemoveMember = (groupId: number, memberId: number) => {
    setModalConfig({
      isOpen: true,
      title: "Удалить участника",
      message: "Вы уверены, что хотите удалить этого участника из группы?",
      confirmText: "Удалить",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData(
          groupsData.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                members: group.members.filter((member) => member.id !== memberId),
              };
            }
            return group;
          })
        );
        setModalConfig(null);
      },
    });
  };

  const handleAcceptApplicant = (groupId: number, applicantId: number) => {
    setModalConfig({
      isOpen: true,
      title: "Принять участника",
      message: "Принять этого пользователя в группу?",
      confirmText: "Принять",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData(
          groupsData.map((group) => {
            if (group.id === groupId) {
              const applicant = group.applicants.find((a) => a.id === applicantId);
              if (!applicant) return group;

              return {
                ...group,
                members: [...group.members, { ...applicant, role: "member" }],
                applicants: group.applicants.filter((a) => a.id !== applicantId),
              };
            }
            return group;
          })
        );
        setModalConfig(null);
      },
    });
  };

  const handleRejectApplicant = (groupId: number, applicantId: number) => {
    setModalConfig({
      isOpen: true,
      title: "Отклонить заявку",
      message: "Вы уверены, что хотите отклонить эту заявку?",
      confirmText: "Отклонить",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData(
          groupsData.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                applicants: group.applicants.filter((a) => a.id !== applicantId),
              };
            }
            return group;
          })
        );
        setModalConfig(null);
      },
    });
  };

  const closeModal = () => {
    setModalConfig(null);
  };

  return (
    <div className={styles.container}>
      <ApartmentDetailsComponent details={apartmentDetails} />

      <GroupList
        groups={groupsData}
        onLeaveGroup={handleLeaveGroup}
        onRemoveMember={handleRemoveMember}
        onAcceptApplicant={handleAcceptApplicant}
        onRejectApplicant={handleRejectApplicant}
      />

      <ActionModals modalConfig={modalConfig} onCancel={closeModal} />
    </div>
  );
};

export default GroupDetails;
