// utils/myAnnouncementResponceDataMappers.ts

import { ApartmentDetails, Group, User, Questionnaire } from "@/app/(profile)/components/desktop/MyAnnouncements/GroupsDetails/types";
import { 
  AnnouncementResponsesResponse, 
  AnnouncementResponsesDirectResponse,
  AnnouncementResponsesData 
} from "@/types/response/myAnnouncementResponce";

// Helper function to extract data from the response
function extractData(response: AnnouncementResponsesResponse | AnnouncementResponsesDirectResponse): AnnouncementResponsesData {
  if ('data' in response && response.data) {
    return response.data;
  }
  return response as AnnouncementResponsesDirectResponse;
}

// Create a mock questionnaire for users that don't have one
function createMockQuestionnaire(): Questionnaire {
  return {
    answers: [
      {
        question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
        answer: "Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную обстановку дома."
      },
      {
        question: "Как вы относитесь к религиозным практикам и традициям?",
        answer: "С уважением отношусь к любым традициям и религиозным практикам."
      },
      {
        question: "Какое у вас отношение к курению и алкогольным напиткам?",
        answer: "Не курю, алкоголь только по особым случаям и в умеренных количествах."
      }
    ]
  };
}

// Create a mock cover letter for users that don't have one
function createMockCoverLetter(): string {
  return "Я ищу комфортное жилье на длительный срок. Я ответственный, чистоплотный и аккуратный человек. Всегда своевременно оплачиваю счета и соблюдаю правила проживания.";
}

export function mapResponseToUIData(response: AnnouncementResponsesResponse | AnnouncementResponsesDirectResponse) {
  // Extract data from response
  const data = extractData(response);
  
  // Map apartment details
  const apartment: ApartmentDetails = {
    id: Date.now(), // Use timestamp as a temporary ID since it's not in the response
    address: data.address || "",
    district: data.districtText || "",
    city: data.regionText || "",
    rooms: `${data.quantityOfRooms || ""} комнаты - ${data.areaOfTheApartment || 0} кв. м - ${data.numberOfFloor || 0}/${data.maxFloorInTheBuilding || 0} этаж`,
    moveInDate: new Date().toLocaleDateString('ru-RU'), // Not available in response
    deposit: `${data.deposit || 0}тг`,
    description: data.title || "",
    price: data.cost || 0,
    image: "https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg", // Placeholder
    applicationsCount: 
      ((data.newApplications?.length || 0) + 
      (data.newApplicationsWithPeople?.length || 0) +
      (data.groups || []).reduce((acc, group) => 
        acc + (group.newApplications?.length || 0) + (group.newApplicationsWithPeople?.length || 0), 0)),
  };

  // Map groups
  const groups: Group[] = (data.groups || []).map(group => {
    // Map group members
    const members: User[] = (group.groupMembers || []).map(member => ({
      id: member.id || 0,
      username: member.name || "",
      email: `user${member.id || 0}@example.com`, // Not available in response
      telegram: `@user${member.id || 0}`, // Not available in response
      phone: (member.phoneNumbers && member.phoneNumbers.length > 0) ? member.phoneNumbers[0] : "", 
      date: member.appliedDate ? new Date(member.appliedDate).toLocaleDateString('ru-RU') : "",
      age: member.age || 0,
      isAdmin: member.permissionStatus === "ADMIN" || member.permissionStatus === "SUPERADMIN",
      questionnaire: createMockQuestionnaire(),
      coverLetter: createMockCoverLetter()
    }));

    // Map group applications
    const newApplications: User[] = (group.newApplications || []).map(app => ({
      id: app.id || 0,
      username: app.name || "",
      email: `user${app.id || 0}@example.com`, // Not available in response
      telegram: `@user${app.id || 0}`, // Not available in response
      phone: (app.phoneNumbers && app.phoneNumbers.length > 0) ? app.phoneNumbers[0] : "",
      date: app.appliedDate ? new Date(app.appliedDate).toLocaleDateString('ru-RU') : "",
      age: app.age || 0,
      questionnaire: createMockQuestionnaire(),
      coverLetter: createMockCoverLetter()
    }));

    // Map group applications with people
    const groupApplicationsWithPeople: User[] = (group.newApplicationsWithPeople || []).flatMap(batch => {
      if (!batch.people || batch.people.length === 0) return [];
      
      const mainPerson = batch.people[0];
      const otherPeople = batch.people.slice(1).map(person => ({
        id: person.id || 0,
        username: person.name || "",
        email: `user${person.id || 0}@example.com`,
        telegram: `@user${person.id || 0}`,
        phone: (person.phoneNumbers && person.phoneNumbers.length > 0) ? person.phoneNumbers[0] : "",
        date: person.appliedDate ? new Date(person.appliedDate).toLocaleDateString('ru-RU') : "",
        age: person.age || 0,
        questionnaire: createMockQuestionnaire(),
        coverLetter: createMockCoverLetter()
      }));
      
      return [{
        id: mainPerson.id || 0,
        username: mainPerson.name || "",
        email: `user${mainPerson.id || 0}@example.com`,
        telegram: `@user${mainPerson.id || 0}`,
        phone: (mainPerson.phoneNumbers && mainPerson.phoneNumbers.length > 0) ? mainPerson.phoneNumbers[0] : "",
        date: mainPerson.appliedDate ? new Date(mainPerson.appliedDate).toLocaleDateString('ru-RU') : "",
        age: mainPerson.age || 0,
        wantsToCreateNewGroup: true,
        groupApplicants: otherPeople,
        questionnaire: createMockQuestionnaire(),
        coverLetter: createMockCoverLetter()
      }];
    });

    return {
      id: group.groupId || 0,
      name: `Группа ${group.groupId || 0}`,
      members,
      newApplications: [...newApplications, ...groupApplicationsWithPeople],
    };
  });

  // Map individual applications
  const newApplications: User[] = (data.newApplications || []).map(app => ({
    id: app.id || 0,
    username: app.name || "",
    email: `user${app.id || 0}@example.com`, // Not available in response
    telegram: `@user${app.id || 0}`, // Not available in response
    phone: (app.phoneNumbers && app.phoneNumbers.length > 0) ? app.phoneNumbers[0] : "",
    date: app.appliedDate ? new Date(app.appliedDate).toLocaleDateString('ru-RU') : "",
    age: app.age || 0,
    wantsToCreateNewGroup: false,
    questionnaire: createMockQuestionnaire(),
    coverLetter: createMockCoverLetter()
  }));

  // Map applications with people (group applications)
  const newApplicationsWithPeople: User[] = (data.newApplicationsWithPeople || []).map(appGroup => {
    if (!appGroup.people || appGroup.people.length === 0) {
      return {
        id: 0,
        username: "",
        email: "",
        telegram: "",
        phone: "",
        date: "",
        age: 0,
        wantsToCreateNewGroup: true,
        groupApplicants: [],
        questionnaire: createMockQuestionnaire(),
        coverLetter: createMockCoverLetter()
      };
    }

    const mainUser = appGroup.people[0];
    const groupApplicants = appGroup.people.slice(1).map(person => ({
      id: person.id || 0,
      username: person.name || "",
      email: `user${person.id || 0}@example.com`, // Not available in response
      telegram: `@user${person.id || 0}`, // Not available in response
      phone: (person.phoneNumbers && person.phoneNumbers.length > 0) ? person.phoneNumbers[0] : "",
      date: person.appliedDate ? new Date(person.appliedDate).toLocaleDateString('ru-RU') : "",
      age: person.age || 0,
      questionnaire: createMockQuestionnaire(),
      coverLetter: createMockCoverLetter()
    }));

    return {
      id: mainUser.id || 0,
      username: mainUser.name || "",
      email: `user${mainUser.id || 0}@example.com`, // Not available in response
      telegram: `@user${mainUser.id || 0}`, // Not available in response
      phone: (mainUser.phoneNumbers && mainUser.phoneNumbers.length > 0) ? mainUser.phoneNumbers[0] : "",
      date: mainUser.appliedDate ? new Date(mainUser.appliedDate).toLocaleDateString('ru-RU') : "",
      age: mainUser.age || 0,
      wantsToCreateNewGroup: true,
      groupApplicants: groupApplicants,
      questionnaire: createMockQuestionnaire(),
      coverLetter: createMockCoverLetter()
    };
  });

  return {
    apartment,
    groups,
    newApplications: [...newApplications, ...newApplicationsWithPeople],
  };
}

// Mock data to use when the API returns empty data
export function getMockData() {
  const apartment: ApartmentDetails = {
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

  const groups: Group[] = [
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
                question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                answer: "Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную обстановку дома."
              },
              {
                question: "Как вы относитесь к религиозным практикам и традициям?",
                answer: "Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мой сожитель с уважением относился к этому."
              },
              {
                question: "Какое у вас отношение к курению и алкогольным напиткам?",
                answer: "Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это не происходило в общих зонах"
              }
            ]
          },
          coverLetter: "Я хочу снять эту квартиру, потому что она находится рядом с моей работой. Я ответственный съемщик и всегда вовремя плачу за аренду."
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
                question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                answer: "Я постоянно в разъездах, по сути, у меня учеба весь день. Мне не принципиально, что происходит дома в мое отсутствие."
              },
              {
                question: "Как вы относитесь к религиозным практикам и традициям?",
                answer: "Я не соблюдаю, но мне важно, чтобы это не мешало соседям, и чтобы мои соседи не навязывали мне свои традиции."
              },
              {
                question: "Какое у вас отношение к курению и алкогольным напиткам?",
                answer: "Я не курю и не пью, и хотел бы, чтобы со мной жили люди с похожими привычками."
              }
            ]
          },
          coverLetter: "Ищу жилье на длительный срок. Чистоплотный, аккуратный, почти все время на учебе."
        }
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
                question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                answer: "Я студент, учусь по утрам, вечером бываю дома. Приоритеты: учеба и спорт."
              },
              {
                question: "Как вы относитесь к религиозным практикам и традициям?",
                answer: "Уважаю любые традиции, сам не практикую."
              },
              {
                question: "Какое у вас отношение к курению и алкогольным напиткам?",
                answer: "Не курю, алкоголь - только по праздникам и в меру."
              }
            ]
          },
          coverLetter: "Студент 3 курса, ищу жилье рядом с университетом. Спокойный, неконфликтный."
        }
      ]
    }
  ];

  const newApplications: User[] = [
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
            question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
            answer: "Работаю в смену, график 2/2. Ценю тишину в свои выходные."
          },
          {
            question: "Как вы относитесь к религиозным практикам и традициям?",
            answer: "Отношусь с пониманием, главное - взаимоуважение."
          },
          {
            question: "Какое у вас отношение к курению и алкогольным напиткам?",
            answer: "Не курю дома, алкоголь только в компании и не часто."
          }
        ]
      },
      coverLetter: "Ищу квартиру недалеко от работы. Спокойный, аккуратный, без проблем с соседями."
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
                question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
                answer: "Учусь и работаю. Дома бываю вечерами. Ценю чистоту и порядок."
              },
              {
                question: "Как вы относитесь к религиозным практикам и традициям?",
                answer: "Уважаю все традиции, важно взаимное уважение."
              },
              {
                question: "Какое у вас отношение к курению и алкогольным напиткам?",
                answer: "Не курю, алкоголь очень редко."
              }
            ]
          },
          coverLetter: "Ищу жилье с подругой. Мы обе аккуратные и ответственные."
        }
      ],
      questionnaire: {
        answers: [
          {
            question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
            answer: "Учусь в магистратуре, большую часть дня в университете. Приоритеты: учеба и саморазвитие."
          },
          {
            question: "Как вы относитесь к религиозным практикам и традициям?",
            answer: "Уважаю все традиции, важно взаимное уважение."
          },
          {
            question: "Какое у вас отношение к курению и алкогольным напиткам?",
            answer: "Не курю, не пью. Предпочитаю здоровый образ жизни."
          }
        ]
      },
      coverLetter: "Магистрантка, ищу тихое место для учебы и проживания вместе с подругой. Чистоплотные, организованные, без вредных привычек."
    }
  ];

  return {
    apartment,
    groups,
    newApplications
  };
}