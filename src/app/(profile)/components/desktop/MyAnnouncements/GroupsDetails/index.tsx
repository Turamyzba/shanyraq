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
  const [batchApplications, setBatchApplications] = useState<any[]>([]);
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
      image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
      applicationsCount: countAllApplications(apiData),
    };
    
    setApartmentDetails(apartmentInfo);
    
    // Map groups data
    if (apiData.groups && Array.isArray(apiData.groups)) {
      const mappedGroups = apiData.groups.map((group: any) => {
        return {
          id: group.groupId,
          name: group.groupName || `Группа ${group.groupId}`,
          members: (group.groupMembers || []).map((member: any) => mapUserData(member)),
          newApplications: (group.newApplications || []).map((app: any) => mapUserData(app)),
          status: group.status,
          capacityOfGroup: group.capacityOfGroup,
          freeSlots: group.freeSlots,
        };
      });
      
      setGroups(mappedGroups);
    }
    
    // Map individual applications
    if (apiData.newApplications && Array.isArray(apiData.newApplications)) {
      const individualApps = apiData.newApplications.map((app: any) => ({
        ...mapUserData(app),
        forWhat: app.forWhat
      }));
      
      setNewApplications(individualApps);
    }
    
    // Map batch applications (people applying together)
    if (apiData.newApplicationsWithPeople && Array.isArray(apiData.newApplicationsWithPeople)) {
      const batchApps = apiData.newApplicationsWithPeople.map((batch: any) => {
        const primaryApplicant = batch.people[0];
        const otherApplicants = batch.people.slice(1);
        
        return {
          batchId: batch.applicationBatchId,
          primaryApplicant: {
            ...mapUserData(primaryApplicant),
            forWhat: primaryApplicant.forWhat,
            isGroupLead: true
          },
          coapplicants: otherApplicants.map((person: any) => ({
            ...mapUserData(person),
            forWhat: person.forWhat
          }))
        };
      });
      
      setBatchApplications(batchApps);
      
      // Convert batch applications to the format expected by ApplicationsList
      const batchAsUsers = batchApps.map(batch => ({
        ...batch.primaryApplicant,
        groupApplicants: batch.coapplicants,
        wantsToCreateNewGroup: false,
        batchId: batch.batchId
      }));
      
      setNewApplications(prev => [...prev, ...batchAsUsers]);
    }
  };

  const countAllApplications = (apiData: any): number => {
    const individualApps = apiData.newApplications?.length || 0;
    const groupApps = apiData.groups?.reduce((acc: number, group: any) => 
      acc + (group.newApplications?.length || 0), 0) || 0;
    const batchApps = apiData.newApplicationsWithPeople?.reduce((acc: number, batch: any) => 
      acc + (batch.people?.length || 0), 0) || 0;
    
    return individualApps + groupApps + batchApps;
  };

  const mapUserData = (userData: any): User => {
    return {
      id: userData.id || Math.floor(Math.random() * 1000),
      username: userData.name || "Пользователь",
      email: userData.email || "user@example.com",
      telegram: userData.phoneNumbers?.[0] || "@user",
      phone: userData.phoneNumbers?.[0] || "Нет номера",
      date: userData.appliedDate ? new Date(userData.appliedDate).toLocaleDateString('ru-RU') : new Date().toLocaleDateString('ru-RU'),
      isAdmin: userData.permissionStatus === "SUPERADMIN",
      age: userData.age || 25,
      profilePhoto: userData.profilePhoto,
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
      // Check if this is a batch application
      const isBatchApp = application.groupApplicants && application.groupApplicants.length > 0;
      
      // Create appropriate message
      const message = isBatchApp
        ? `${application.username} и ${application.groupApplicants.length} соседей хотят ${application.forWhat || "присоединиться к группе"}.`
        : `${application.username} хочет ${application.forWhat || "присоединиться к группе"}.`;

      setActionModalContent({
        action: "accept",
        message,
      });
      setIsActionModalVisible(true);

      // Handle the state update to move the application to the appropriate group
      if (application.forWhat && application.forWhat.includes("присоединиться к")) {
        const groupName = application.forWhat.split("присоединиться к ")[1];
        const targetGroup = groups.find(g => g.name === groupName);
        
        if (targetGroup) {
          setGroups(prevGroups => {
            return prevGroups.map(group => {
              if (group.id === targetGroup.id) {
                const newMembers = isBatchApp 
                  ? [application, ...application.groupApplicants]
                  : [application];
                  
                return {
                  ...group,
                  members: [...group.members, ...newMembers]
                };
              }
              return group;
            });
          });
        }
      } else {
        // If no specific group mentioned or wants to create a new group
        const newGroup = {
          id: groups.length + 1,
          name: `Группа ${groups.length + 1}`,
          members: isBatchApp 
            ? [{ ...application, isAdmin: true }, ...application.groupApplicants]
            : [{ ...application, isAdmin: true }],
          newApplications: [],
          status: "PENDING",
          capacityOfGroup: isBatchApp ? application.groupApplicants.length + 1 : 1,
          freeSlots: 0
        };
        
        setGroups(prevGroups => [...prevGroups, newGroup]);
      }

      // Remove the application from newApplications
      setNewApplications(prevApps => prevApps.filter(app => app.id !== applicationId));
    }
  };

  const handleRejectApplication = (applicationId: number) => {
    const application = newApplications.find((app) => app.id === applicationId);
    if (application) {
      const isBatchApp = application.groupApplicants && application.groupApplicants.length > 0;
      
      const message = isBatchApp
        ? `Вы отклонили заявку ${application.username} и ${application.groupApplicants.length} соседей.`
        : `Вы отклонили заявку ${application.username}.`;

      setActionModalContent({
        action: "reject",
        message,
      });
      setIsActionModalVisible(true);

      setNewApplications(prevApps => prevApps.filter(app => app.id !== applicationId));
    }
  };

  const handleRemoveMember = (groupId: number, memberId: number) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter(member => member.id !== memberId),
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