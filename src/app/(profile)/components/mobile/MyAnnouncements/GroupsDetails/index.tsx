// components/mobile/MyAnnouncements/GroupsDetails/index.tsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { User, Group, ApartmentDetails, ActionModalContent } from "./types";
import ApartmentCard from "./ApartmentCard";
import ApplicationsList from "./ApplicationsList";
import GroupsList from "./GroupsList";
import UserModals from "./UserModals";
import styles from "./GroupsDetails.module.scss";
import { 
  AnnouncementResponsesResponse, 
  AnnouncementResponsesDirectResponse 
} from "@/types/response/myAnnouncementResponce";
import { mapResponseToUIData, getMockData } from "@/utils/myAnnouncementResponceDataMappers";

interface GroupsDetailsProps {
  responseData: AnnouncementResponsesResponse | AnnouncementResponsesDirectResponse;
}

const GroupsDetails: React.FC<GroupsDetailsProps> = ({ responseData }) => {
  const router = useRouter();
  
  // Check if data exists in the response
  const hasData = ('data' in responseData && responseData.data) || 
                  ('address' in responseData && responseData.address);
  
  // Initialize with data from API or mock data if API returns empty data
  const [uiData] = useState(() => hasData ? mapResponseToUIData(responseData) : getMockData());
  
  const [groups, setGroups] = useState<Group[]>(uiData.groups);
  const [newApplications, setNewApplications] = useState<User[]>(uiData.newApplications);
  const [apartment] = useState<ApartmentDetails>(uiData.apartment);
  
  const [isQuestionnaireModalVisible, setIsQuestionnaireModalVisible] = useState(false);
  const [isCoverLetterModalVisible, setIsCoverLetterModalVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [actionModalContent, setActionModalContent] = useState<ActionModalContent>({
    action: "accept",
    message: "",
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAcceptApplication = (applicationId: number) => {
    const application = newApplications.find((app) => app.id === applicationId);
    if (application) {
      // Create message based on application type
      const message = application.wantsToCreateNewGroup
        ? `${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} хотят создать новую группу и жить в этой квартире.`
        : `${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} хотят присоединиться к Группе 1.`;

      setActionModalContent({
        action: "accept",
        message,
      });
      setIsActionModalVisible(true);

      // Add main applicant and all group members to the group
      setGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        if (updatedGroups.length > 0) {
          // Add main applicant
          const newMembers = [application];

          // Add all group applicants if they exist
          if (application.groupApplicants?.length) {
            newMembers.push(...application.groupApplicants);
          }

          // If they want to create a new group, create one
          if (application.wantsToCreateNewGroup) {
            const newGroup = {
              id: updatedGroups.length + 1,
              name: `Группа ${updatedGroups.length + 1}`,
              members: [{ ...application, isAdmin: true }, ...(application.groupApplicants || [])],
              newApplications: [],
            };
            return [...updatedGroups, newGroup];
          } else {
            // Otherwise add them to group 1
            updatedGroups[0] = {
              ...updatedGroups[0],
              members: [...updatedGroups[0].members, ...newMembers],
            };
            return updatedGroups;
          }
        }
        return updatedGroups;
      });

      // Remove from applications
      setNewApplications((prevApps) => prevApps.filter((app) => app.id !== applicationId));
    }
  };

  const handleRejectApplication = (applicationId: number) => {
    const application = newApplications.find((app) => app.id === applicationId);
    if (application) {
      // Create message based on application type
      const message = application.wantsToCreateNewGroup
        ? `Вы отклонили заявку ${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} на создание новой группы.`
        : `Вы отклонили заявку ${application.username}${application.groupApplicants?.length ? ` и ${application.groupApplicants.length} соседей` : ""} на присоединение к Группе 1.`;

      setActionModalContent({
        action: "reject",
        message,
      });
      setIsActionModalVisible(true);

      // Remove from applications
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
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      <ApartmentCard apartment={apartment} />

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