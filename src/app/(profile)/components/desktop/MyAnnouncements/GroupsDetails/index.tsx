// components/desktop/MyAnnouncements/GroupsDetails/index.tsx

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
// Mock apartment data
const mockApartmentData: ApartmentDetails = {
  id: 1,
  address: "Ул. Раймбека 181/23",
  district: "Мкр. Акцент 14",
  city: "Алматы г.",
  rooms: "2 комнаты - 30 кв. м - 2/13 этаж",
  moveInDate: "21.11.2024",
  deposit: "50.000тг",
  description: "Ищем 2 девушек на подселение",
  price: 150000,
  image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg",
  applicationsCount: 12,
};

const GroupsDetails: React.FC = () => {
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

  // Fetch data on component mount
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For now, we'll simulate loading with a setTimeout
    const fetchData = async () => {
      try {
        // Mock API call
        setTimeout(() => {
          setGroups([
            {
              id: 1,
              name: "Группа 1",
              members: [
                {
                  id: 1,
                  username: "Батырхан",
                  email: "amantay11@gmail.com",
                  telegram: "@batyr_k",
                  phone: "8777 777 77 77",
                  date: "27/11/2024",
                  age: 24,
                  isAdmin: true,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer:
                          "Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную обстановку дома.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer:
                          "Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мой сожитель с уважением относился к этому.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer:
                          "Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это не происходило в общих зонах",
                      },
                    ],
                  },
                  coverLetter:
                    "Я хочу снять эту квартиру, потому что она находится рядом с моей работой. Я ответственный съемщик и всегда вовремя плачу за аренду.",
                },
                {
                  id: 2,
                  username: "Ерасыл",
                  email: "erasyl.m@mail.ru",
                  telegram: "@erasyl",
                  phone: "8777 545 74 78",
                  date: "27/11/2024",
                  age: 18,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer:
                          "Я постоянно в разъездах, по сути, у меня учеба весь день. Мне не принципиально, что происходит дома в мое отсутствие.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer:
                          "Я не соблюдаю, но мне важно, чтобы это не мешало соседям, и чтобы мои соседи не навязывали мне свои традиции.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer:
                          "Я не курю и не пью, и хотел бы, чтобы со мной жили люди с похожими привычками.",
                      },
                    ],
                  },
                  coverLetter:
                    "Ищу жилье на длительный срок. Чистоплотный, аккуратный, почти все время на учебе.",
                },
                {
                  id: 3,
                  username: "Айбол",
                  email: "aibol.qazaq@gmail.com",
                  telegram: "@aibol",
                  phone: "8701 577 77 78",
                  date: "27/11/2024",
                  age: 19,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer:
                          "Я провожу весь день дома, работаю дистанционно. Мне важно иметь спокойную обстановку дома.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer:
                          "Я соблюдаю религиозные практики. Хотел бы, чтобы мой сожитель с уважением относился к этому.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer:
                          "Я не курю и не пью, и хотел бы, чтобы со мной жили люди с похожими привычками.",
                      },
                    ],
                  },
                  coverLetter:
                    "Ищу жилье недалеко от центра. Работаю удаленно, нужна тихая обстановка для работы.",
                },
              ],
              newApplications: [
                {
                  id: 4,
                  username: "Марат",
                  email: "marat@gmail.com",
                  telegram: "@marat",
                  phone: "8707 111 22 33",
                  date: "27/11/2024",
                  age: 25,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer:
                          "Я студент, учусь по утрам, вечером бываю дома. Приоритеты: учеба и спорт.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "Уважаю любые традиции, сам не практикую.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Не курю, алкоголь - только по праздникам и в меру.",
                      },
                    ],
                  },
                  coverLetter:
                    "Студент 3 курса, ищу жилье рядом с университетом. Спокойный, неконфликтный.",
                },
                {
                  id: 5,
                  username: "Даулет",
                  email: "daulet@mail.ru",
                  telegram: "@daulet",
                  phone: "8777 999 88 77",
                  date: "27/11/2024",
                  age: 23,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer:
                          "Работаю с 9 до 6, в будни редко бываю дома. На выходных люблю отдыхать и встречаться с друзьями.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "Нейтрально отношусь, важно взаимное уважение.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Курю только на балконе, алкоголь - умеренно.",
                      },
                    ],
                  },
                  coverLetter:
                    "Молодой специалист, ищу жилье рядом с офисом. Аккуратный, вовремя плачу за аренду.",
                },
              ],
            },
            {
              id: 2,
              name: "Группа 2",
              members: [
                {
                  id: 6,
                  username: "Алмас",
                  email: "almas@gmail.com",
                  telegram: "@almas",
                  phone: "8700 123 45 67",
                  date: "27/11/2024",
                  age: 26,
                  isAdmin: true,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer: "Работаю удаленно, весь день дома. Ценю тишину и порядок.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "С уважением отношусь к любым традициям.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Не курю, не пью. Предпочитаю здоровый образ жизни.",
                      },
                    ],
                  },
                  coverLetter:
                    "Ищу долгосрочную аренду. Тихий, чистоплотный, без вредных привычек.",
                },
                {
                  id: 7,
                  username: "Арман",
                  email: "arman@mail.ru",
                  telegram: "@arman",
                  phone: "8747 765 43 21",
                  date: "27/11/2024",
                  age: 22,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer: "Работаю 5/2, вечера и выходные провожу дома. Ценю комфорт и уют.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "Нейтрально, главное - взаимное уважение.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Не курю, алкоголь только по особым случаям.",
                      },
                    ],
                  },
                  coverLetter:
                    "Ищу комнату в тихом районе. Работаю в офисе, дома бываю вечером и на выходных.",
                },
                {
                  id: 8,
                  username: "Асель",
                  email: "assel@gmail.com",
                  telegram: "@assel",
                  phone: "8777 111 22 33",
                  date: "27/11/2024",
                  age: 24,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer:
                          "Работаю удаленно, днем обычно дома. Важно иметь спокойное место для работы.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "Уважаю разные традиции, сама не практикую.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Не курю, алкоголь очень редко и в меру.",
                      },
                    ],
                  },
                  coverLetter:
                    "Ищу квартиру с хорошим интернетом для удаленной работы. Спокойная, аккуратная.",
                },
              ],
              newApplications: [
                {
                  id: 9,
                  username: "Санжар",
                  email: "sanzhar@gmail.com",
                  telegram: "@sanzhar",
                  phone: "8701 222 33 44",
                  date: "27/11/2024",
                  age: 21,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer:
                          "Учусь днем, вечером подрабатываю. Дома в основном ночую и на выходных.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "Уважительно отношусь ко всем традициям.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Не курю, иногда могу выпить на праздники.",
                      },
                    ],
                  },
                  coverLetter:
                    "Студент, ищу недорогое жилье рядом с университетом. Готов к совместному проживанию.",
                },
                {
                  id: 10,
                  username: "Динара",
                  email: "dinara@mail.ru",
                  telegram: "@dinara",
                  phone: "8700 987 65 43",
                  date: "27/11/2024",
                  age: 25,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer: "Работаю в офисе, дома бываю вечером. Ценю чистоту и порядок.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "С уважением отношусь к любым традициям.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Не курю, алкоголь только по праздникам.",
                      },
                    ],
                  },
                  coverLetter:
                    "Молодой специалист, ищу жилье в хорошем районе. Ответственная, пунктуальная, без вредных привычек.",
                },
              ],
            },
          ]);

          setNewApplications([
            {
              id: 11,
              username: "Азат",
              email: "azat@gmail.com",
              telegram: "@azat",
              phone: "8777 333 22 11",
              date: "27/11/2024",
              age: 27,
              wantsToCreateNewGroup: false,
              questionnaire: {
                answers: [
                  {
                    question:
                      "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                    answer: "Работаю в смену, график 2/2. Ценю тишину в свои выходные.",
                  },
                  {
                    question: "Как вы относитесь к религиозным практикам и традициям?",
                    answer: "Отношусь с пониманием, главное - взаимоуважение.",
                  },
                  {
                    question: "Какое у вас отношение к курению и алкогольным напиткам?",
                    answer: "Не курю дома, алкоголь только в компании и не часто.",
                  },
                ],
              },
              coverLetter:
                "Ищу квартиру недалеко от работы. Спокойный, аккуратный, без проблем с соседями.",
            },
            {
              id: 12,
              username: "Салтанат",
              email: "saltanat@mail.ru",
              telegram: "@saltanat",
              phone: "8700 444 55 66",
              date: "27/11/2024",
              age: 23,
              wantsToCreateNewGroup: true,
              groupApplicants: [
                {
                  id: 13,
                  username: "Дарига",
                  email: "dariga@mail.ru",
                  telegram: "@dariga",
                  phone: "8701 555 66 77",
                  date: "27/11/2024",
                  age: 24,
                  questionnaire: {
                    answers: [
                      {
                        question:
                          "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                        answer: "Учусь и работаю. Дома бываю вечерами. Ценю чистоту и порядок.",
                      },
                      {
                        question: "Как вы относитесь к религиозным практикам и традициям?",
                        answer: "Уважаю все традиции, важно взаимное уважение.",
                      },
                      {
                        question: "Какое у вас отношение к курению и алкогольным напиткам?",
                        answer: "Не курю, алкоголь очень редко.",
                      },
                    ],
                  },
                  coverLetter: "Ищу жилье с подругой. Мы обе аккуратные и ответственные.",
                },
              ],
              questionnaire: {
                answers: [
                  {
                    question:
                      "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                    answer:
                      "Учусь в магистратуре, большую часть дня в университете. Приоритеты: учеба и саморазвитие.",
                  },
                  {
                    question: "Как вы относитесь к религиозным практикам и традициям?",
                    answer: "Уважаю все традиции, важно взаимное уважение.",
                  },
                  {
                    question: "Какое у вас отношение к курению и алкогольным напиткам?",
                    answer: "Не курю, не пью. Предпочитаю здоровый образ жизни.",
                  },
                ],
              },
              coverLetter:
                "Магистрантка, ищу тихое место для учебы и проживания вместе с подругой. Чистоплотные, организованные, без вредных привычек.",
            },
          ]);
        }, 500);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

      <ApartmentCard apartment={mockApartmentData} />

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
