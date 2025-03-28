"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { User, Group, ApartmentDetails, ActionModalContent } from "./types";
import ApartmentCard from "./ApartmentCard";
import ApplicationsList from "./ApplicationsList";
import GroupsList from "./GroupsList";
import UserModals from "./UserModals";
import styles from "./GroupsDetails.module.scss";
import "./GroupsDetails.scss";

interface GroupsDetailsProps {
  data?: any;
}

const GroupsDetails: React.FC<GroupsDetailsProps> = ({ data }) => {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [newApplications, setNewApplications] = useState<User[]>([]);
  const [isQuestionnaireModalVisible, setIsQuestionnaireModalVisible] = useState(false);
  const [isCoverLetterModalVisible, setIsCoverLetterModalVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [actionModalContent, setActionModalContent] = useState<ActionModalContent>({
    action: "accept",
    message: "",
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetails | null>(null);

  useEffect(() => {
    if (data) {
      // Map API data to component state
      mapApiDataToState(data);
    }
  }, [data]);

  const mapApiDataToState = (apiData: any) => {
    // Map apartment details
    const apartmentInfo = {
      id: 1,
      address: apiData.address || "",
      district: apiData.districtText || "",
      city: apiData.regionText || "",
      rooms: `${apiData.quantityOfRooms} комнаты - ${apiData.areaOfTheApartment} кв. м - ${apiData.numberOfFloor}/${apiData.maxFloorInTheBuilding} этаж`,
      moveInDate: new Date().toLocaleDateString('ru-RU'),
      deposit: `${apiData.deposit} ₸`,
      description: apiData.title || "Описание квартиры",
      price: apiData.cost || 0,
      image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg", // Default image
      applicationsCount: (apiData.newApplications?.length || 0) + (apiData.groups?.reduce((acc: number, group: any) => acc + (group.newApplications?.length || 0), 0) || 0),
    };
    
    setApartmentDetails(apartmentInfo);
    
    // Map group data
    if (apiData.groups && Array.isArray(apiData.groups)) {
      const mappedGroups = apiData.groups.map((group: any, index: number) => {
        return {
          id: group.groupId || index + 1,
          name: `Группа ${index + 1}`,
          members: (group.groupMembers || []).map((member: any) => mapUserData(member)),
          newApplications: (group.newApplicationsWithPeople || []).flatMap((batch: any) => 
            (batch.people || []).map((person: any) => mapUserData(person))
          ),
        };
      });
      
      setGroups(mappedGroups);
    }
    
    // Map new applications
    if (apiData.newApplicationsWithPeople && Array.isArray(apiData.newApplicationsWithPeople)) {
      const mappedApplications = apiData.newApplicationsWithPeople.flatMap((batch: any) => 
        (batch.people || []).map((person: any) => ({
          ...mapUserData(person),
          wantsToCreateNewGroup: true,
          groupApplicants: batch.people.filter((p: any) => p.id !== person.id).map((p: any) => mapUserData(p))
        }))
      );
      
      setNewApplications(mappedApplications);
    }
  };

  const mapUserData = (userData: any): User => {
    return {
      id: userData.id || Math.floor(Math.random() * 1000),
      username: userData.name || "Пользователь",
      email: "user@example.com", // Default email if not provided
      telegram: userData.phoneNumbers?.[0] || "@user",
      phone: userData.phoneNumbers?.[0] || "Нет номера",
      date: userData.appliedDate ? new Date(userData.appliedDate).toLocaleDateString('ru-RU') : new Date().toLocaleDateString('ru-RU'),
      isAdmin: userData.permissionStatus === "SUPERADMIN",
      age: userData.age || 25,
      questionnaire: {
        answers: [
          {
            question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
            answer: "Данные не предоставлены",
          },
          {
            question: "Как вы относитесь к религиозным практикам и традициям?",
            answer: "Данные не предоставлены",
          },
          {
            question: "Какое у вас отношение к курению и алкогольным напиткам?",
            answer: "Данные не предоставлены",
          }
        ]
      },
      coverLetter: userData.coverLetter || "Сопроводительное письмо не предоставлено",
    };
  };

  const handleAcceptApplication = (applicationId: number) => {
    const application = newApplications.find((app) => app.id === applicationId);
    if (application) {
      const message = application.wantsToCreateNewGroup
        ? `${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} хотят создать новую группу и жить в этой квартире.`
        : `${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} хотят присоединиться к Группе 1.`;

      setActionModalContent({
        action: "accept",
        message,
      });
      setIsActionModalVisible(true);

      setGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        if (updatedGroups.length > 0) {
          const newMembers = [application];

          if (application.groupApplicants?.length) {
            newMembers.push(...application.groupApplicants);
          }

          if (application.wantsToCreateNewGroup) {
            const newGroup = {
              id: updatedGroups.length + 1,
              name: `Группа ${updatedGroups.length + 1}`,
              members: [{ ...application, isAdmin: true }, ...(application.groupApplicants || [])],
              newApplications: [],
            };
            return [...updatedGroups, newGroup];
          } else {
            updatedGroups[0] = {
              ...updatedGroups[0],
              members: [...updatedGroups[0].members, ...newMembers],
            };
            return updatedGroups;
          }
        }
        return updatedGroups;
      });

      setNewApplications((prevApps) => prevApps.filter((app) => app.id !== applicationId));
    }
  };

  const handleRejectApplication = (applicationId: number) => {
    const application = newApplications.find((app) => app.id === applicationId);
    if (application) {
      const message = application.wantsToCreateNewGroup
        ? `Вы отклонили заявку ${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} на создание новой группы.`
        : `Вы отклонили заявку ${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} на присоединение к Группе 1.`;

      setActionModalContent({
        action: "reject",
        message,
      });
      setIsActionModalVisible(true);

      setNewApplications((prevApps) => prevApps.filter((app) => app.id !== applicationId));
    }
  };

  const handleRemoveMember = (groupId: number, memberId: number) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter((member) => member.id !== memberId),
          };
        }
        return group;
      })
    );
  };

  const showQuestionnaireModal = (user: User) => {
    setSelectedUser(user);
    setIsQuestionnaireModalVisible(true);
  };

  const showCoverLetterModal = (user: User) => {
    setSelectedUser(user);
    setIsCoverLetterModalVisible(true);
  };

  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 16.6L6.66666 10.7667L12.5 4.93335"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button
          type="text"
          icon={<BackIcon />}
          className={styles.backButton}
          onClick={() => router.push("/my-announcements")}
        />
        <h1 className={styles.title}>Заявки на объявление</h1>
      </div>

      {apartmentDetails && <ApartmentCard apartment={apartmentDetails} />}

      <ApplicationsList
        applications={newApplications}
        onAcceptApplication={handleAcceptApplication}
        onRejectApplication={handleRejectApplication}
        onShowQuestionnaire={showQuestionnaireModal}
        onShowCoverLetter={showCoverLetterModal}
      />

      <GroupsList
        groups={groups}
        onRemoveMember={handleRemoveMember}
        onShowQuestionnaire={showQuestionnaireModal}
        onShowCoverLetter={showCoverLetterModal}
      />

      <UserModals
        selectedUser={selectedUser}
        isQuestionnaireModalVisible={isQuestionnaireModalVisible}
        isCoverLetterModalVisible={isCoverLetterModalVisible}
        isActionModalVisible={isActionModalVisible}
        actionModalContent={actionModalContent}
        onCloseQuestionnaireModal={() => setIsQuestionnaireModalVisible(false)}
        onCloseCoverLetterModal={() => setIsCoverLetterModalVisible(false)}
        onCloseActionModal={() => setIsActionModalVisible(false)}
      />
    </div>
  );
};

export default GroupsDetails;