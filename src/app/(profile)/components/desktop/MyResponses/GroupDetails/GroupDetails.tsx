import React, { useState, useEffect } from "react";
import { Group, ApartmentDetails, ModalConfig } from "./types";
import GroupList from "./GroupList";
import ActionModals from "./ActionModals";
import styles from "./GroupDetails.module.scss";

interface GroupDetailsProps {
  apartmentDetails: ApartmentDetails;
  groups: Group[];
}

const GroupDetails: React.FC<GroupDetailsProps> = ({ apartmentDetails, groups }) => {
  const [groupsData, setGroupsData] = useState<Group[]>([]);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  useEffect(() => {
    if (groups && Array.isArray(groups)) {
      setGroupsData(groups);
    }
  }, [groups]);

  const handleCancelApplication = (groupId: number) => {
    if (!groupId) return;

    setModalConfig({
      isOpen: true,
      title: "Отменить заявку",
      message: "Вы уверены, что хотите отменить заявку? Это действие невозможно отменить.",
      confirmText: "Отменить",
      cancelText: "Назад",
      confirmAction: () => {
        setGroupsData((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
        setModalConfig(null);
      },
    });
  };

  const handleLeaveGroup = (groupId: number) => {
    if (!groupId) return;

    setModalConfig({
      isOpen: true,
      title: "Покинуть группу",
      message: "Вы уверены, что хотите покинуть группу? Это действие невозможно отменить.",
      confirmText: "Покинуть",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
        setModalConfig(null);
      },
    });
  };

  const handleRemoveMember = (groupId: number, memberId: number) => {
    if (!groupId || !memberId) return;

    setModalConfig({
      isOpen: true,
      title: "Удалить участника",
      message: "Вы уверены, что хотите удалить этого участника из группы?",
      confirmText: "Удалить",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData((prevGroups) =>
          prevGroups.map((group) => {
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

  const handlePromoteToAdmin = (groupId: number, memberId: number) => {
    if (!groupId || !memberId) return;

    setModalConfig({
      isOpen: true,
      title: "Сделать администратором",
      message: "Вы уверены, что хотите сделать этого участника администратором группы?",
      confirmText: "Подтвердить",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                members: group.members.map((member) => {
                  if (member.id === memberId) {
                    return { ...member, role: "admin" };
                  }
                  return member;
                }),
              };
            }
            return group;
          })
        );
        setModalConfig(null);
      },
    });
  };

  const handleDemoteFromAdmin = (groupId: number, memberId: number) => {
    if (!groupId || !memberId) return;

    setModalConfig({
      isOpen: true,
      title: "Понизить до участника",
      message: "Вы уверены, что хотите понизить этого администратора до обычного участника?",
      confirmText: "Подтвердить",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                members: group.members.map((member) => {
                  if (member.id === memberId) {
                    return { ...member, role: "member" };
                  }
                  return member;
                }),
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
    if (!groupId || !applicantId) return;

    setModalConfig({
      isOpen: true,
      title: "Принять участника",
      message: "Принять этого пользователя в группу?",
      confirmText: "Принять",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id === groupId) {
              // Find applicant in both applicants list and possibly members list if current user
              const applicant =
                group.applicants?.find((a) => a.id === applicantId) ||
                (group.status !== "accepted"
                  ? group.members.find((m) => m.id === applicantId && m.isCurrentUser)
                  : undefined);

              if (!applicant) return group;

              return {
                ...group,
                members: [
                  ...group.members.filter((m) => !(m.isCurrentUser && m.id === applicantId)),
                  { ...applicant, role: "member" },
                ],
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
    if (!groupId || !applicantId) return;

    setModalConfig({
      isOpen: true,
      title: "Отклонить заявку",
      message: "Вы уверены, что хотите отклонить эту заявку?",
      confirmText: "Отклонить",
      cancelText: "Отмена",
      confirmAction: () => {
        setGroupsData((prevGroups) =>
          prevGroups.map((group) => {
            if (group.id === groupId) {
              return {
                ...group,
                applicants: group.applicants.filter((a) => a.id !== applicantId),
                status: group.applicants.some((a) => a.isCurrentUser && a.id === applicantId)
                  ? "rejected"
                  : group.status,
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
    <div>
      <GroupList
        groups={groupsData}
        onLeaveGroup={handleLeaveGroup}
        onCancelApplication={handleCancelApplication}
        onRemoveMember={handleRemoveMember}
        onPromoteToAdmin={handlePromoteToAdmin}
        onDemoteFromAdmin={handleDemoteFromAdmin}
        onAcceptApplicant={handleAcceptApplicant}
        onRejectApplicant={handleRejectApplicant}
      />

      {modalConfig && <ActionModals modalConfig={modalConfig} onCancel={closeModal} />}
    </div>
  );
};

export default GroupDetails;
