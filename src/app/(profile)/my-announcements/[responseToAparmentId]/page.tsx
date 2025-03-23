"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import { Button, Collapse, Modal, Table } from "antd";

const { Panel } = Collapse;

interface Questionnaire {
  answers: {
    question: string;
    answer: string;
  }[];
}

interface User {
  id: number;
  username: string;
  email: string;
  telegram: string;
  phone: string;
  date: string;
  isAdmin?: boolean;
  age: number;
  questionnaire?: Questionnaire;
  coverLetter?: string;
}

interface Group {
  id: number;
  name: string;
  members: User[];
  newApplications: User[];
}

const ApartmentResponsesPage = () => {
  const params = useParams();
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [newApplications, setNewApplications] = useState<User[]>([]);
  const [isQuestionnaireModalVisible, setIsQuestionnaireModalVisible] = useState(false);
  const [isCoverLetterModalVisible, setIsCoverLetterModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setGroups([
        {
          id: 1,
          name: "Группа 1",
          members: [
            {id: 1, username: "Батырхан", email: "amantay11@gmail.com", telegram: "@batyr_k", phone: "8777 777 77 77", date: "27/11/2024", age: 24, isAdmin: true, 
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную обстановку дома."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мой сожитель с уважением относился к этому."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это не происходило в общих зонах"}
              ]
            },
            coverLetter: "Я хочу снять эту квартиру, потому что она находится рядом с моей работой. Я ответственный съемщик и всегда вовремя плачу за аренду."
            },
            {id: 2, username: "Ерасыл", email: "erasyl.m@mail.ru", telegram: "@erasyl", phone: "8777 545 74 78", date: "27/11/2024", age: 18,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Я постоянно в разъездах, по сути, у меня учеба весь день. Мне не принципиально, что происходит дома в мое отсутствие."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Я не соблюдаю, но мне важно, чтобы это не мешало соседям, и чтобы мои соседи не навязывали мне свои традиции."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Я не курю и не пью, и хотел бы, чтобы со мной жили люди с похожими привычками."}
              ]
            },
            coverLetter: "Ищу жилье на длительный срок. Чистоплотный, аккуратный, почти все время на учебе."},
            {id: 3, username: "Айбол", email: "aibol.qazaq@gmail.com", telegram: "@aibol", phone: "8701 577 77 78", date: "27/11/2024", age: 19,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Я провожу весь день дома, работаю дистанционно. Мне важно иметь спокойную обстановку дома."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Я соблюдаю религиозные практики. Хотел бы, чтобы мой сожитель с уважением относился к этому."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Я не курю и не пью, и хотел бы, чтобы со мной жили люди с похожими привычками."}
              ]
            },
            coverLetter: "Ищу жилье недалеко от центра. Работаю удаленно, нужна тихая обстановка для работы."},
          ],
          newApplications: [
            {id: 4, username: "Марат", email: "marat@gmail.com", telegram: "@marat", phone: "8707 111 22 33", date: "27/11/2024", age: 25,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Я студент, учусь по утрам, вечером бываю дома. Приоритеты: учеба и спорт."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Уважаю любые традиции, сам не практикую."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю, алкоголь - только по праздникам и в меру."}
              ]
            },
            coverLetter: "Студент 3 курса, ищу жилье рядом с университетом. Спокойный, неконфликтный."},
            {id: 5, username: "Даулет", email: "daulet@mail.ru", telegram: "@daulet", phone: "8777 999 88 77", date: "27/11/2024", age: 23,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Работаю с 9 до 6, в будни редко бываю дома. На выходных люблю отдыхать и встречаться с друзьями."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Нейтрально отношусь, важно взаимное уважение."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Курю только на балконе, алкоголь - умеренно."}
              ]
            },
            coverLetter: "Молодой специалист, ищу жилье рядом с офисом. Аккуратный, вовремя плачу за аренду."},
          ],
        },
        {
          id: 2,
          name: "Группа 2",
          members: [
            {id: 6, username: "Алмас", email: "almas@gmail.com", telegram: "@almas", phone: "8700 123 45 67", date: "27/11/2024", age: 26, isAdmin: true,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Работаю удаленно, весь день дома. Ценю тишину и порядок."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "С уважением отношусь к любым традициям."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю, не пью. Предпочитаю здоровый образ жизни."}
              ]
            },
            coverLetter: "Ищу долгосрочную аренду. Тихий, чистоплотный, без вредных привычек."},
            {id: 7, username: "Арман", email: "arman@mail.ru", telegram: "@arman", phone: "8747 765 43 21", date: "27/11/2024", age: 22,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Работаю 5/2, вечера и выходные провожу дома. Ценю комфорт и уют."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Нейтрально, главное - взаимное уважение."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю, алкоголь только по особым случаям."}
              ]
            },
            coverLetter: "Ищу комнату в тихом районе. Работаю в офисе, дома бываю вечером и на выходных."},
            {id: 8, username: "Асель", email: "assel@gmail.com", telegram: "@assel", phone: "8777 111 22 33", date: "27/11/2024", age: 24,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Работаю удаленно, днем обычно дома. Важно иметь спокойное место для работы."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Уважаю разные традиции, сама не практикую."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю, алкоголь очень редко и в меру."}
              ]
            },
            coverLetter: "Ищу квартиру с хорошим интернетом для удаленной работы. Спокойная, аккуратная."},
          ],
          newApplications: [
            {id: 9, username: "Санжар", email: "sanzhar@gmail.com", telegram: "@sanzhar", phone: "8701 222 33 44", date: "27/11/2024", age: 21,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Учусь днем, вечером подрабатываю. Дома в основном ночую и на выходных."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Уважительно отношусь ко всем традициям."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю, иногда могу выпить на праздники."}
              ]
            },
            coverLetter: "Студент, ищу недорогое жилье рядом с университетом. Готов к совместному проживанию."},
            {id: 10, username: "Динара", email: "dinara@mail.ru", telegram: "@dinara", phone: "8700 987 65 43", date: "27/11/2024", age: 25,
            questionnaire: {
              answers: [
                {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Работаю в офисе, дома бываю вечером. Ценю чистоту и порядок."},
                {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "С уважением отношусь к любым традициям."},
                {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю, алкоголь только по праздникам."}
              ]
            },
            coverLetter: "Молодой специалист, ищу жилье в хорошем районе. Ответственная, пунктуальная, без вредных привычек."},
          ],
        },
      ]);
      
      setNewApplications([
        {id: 11, username: "Азат", email: "azat@gmail.com", telegram: "@azat", phone: "8777 333 22 11", date: "27/11/2024", age: 27,
        questionnaire: {
          answers: [
            {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Работаю в смену, график 2/2. Ценю тишину в свои выходные."},
            {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Отношусь с пониманием, главное - взаимоуважение."},
            {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю дома, алкоголь только в компании и не часто."}
          ]
        },
        coverLetter: "Ищу квартиру недалеко от работы. Спокойный, аккуратный, без проблем с соседями."},
        {id: 12, username: "Салтанат", email: "saltanat@mail.ru", telegram: "@saltanat", phone: "8700 444 55 66", date: "27/11/2024", age: 23,
        questionnaire: {
          answers: [
            {question: "Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?", answer: "Учусь в магистратуре, большую часть дня в университете. Приоритеты: учеба и саморазвитие."},
            {question: "Как вы относитесь к религиозным практикам и традициям?", answer: "Уважаю все традиции, важно взаимное уважение."},
            {question: "Какое у вас отношение к курению и алкогольным напиткам?", answer: "Не курю, не пью. Предпочитаю здоровый образ жизни."}
          ]
        },
        coverLetter: "Магистрантка, ищу тихое место для учебы и проживания. Чистоплотная, организованная, без вредных привычек."},
      ]);
      
    }, 500);
  }, []);

  const handleAcceptApplication = (applicationId: number) => {
    const application = newApplications.find(app => app.id === applicationId);
    if (application) {
      setGroups(prevGroups => {
        const updatedGroups = [...prevGroups];
        if (updatedGroups.length > 0) {
          updatedGroups[0] = {
            ...updatedGroups[0],
            members: [...updatedGroups[0].members, application]
          };
        }
        return updatedGroups;
      });
      
      setNewApplications(prevApps => prevApps.filter(app => app.id !== applicationId));
    }
  };

  const handleRejectApplication = (applicationId: number) => {
    setNewApplications(prevApps => prevApps.filter(app => app.id !== applicationId));
  };

  const handleRemoveMember = (groupId: number, memberId: number) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter(member => member.id !== memberId),
        };
      }
      return group;
    }));
  };

  const showQuestionnaireModal = (user: User) => {
    setSelectedUser(user);
    setIsQuestionnaireModalVisible(true);
  };

  const showCoverLetterModal = (user: User) => {
    setSelectedUser(user);
    setIsCoverLetterModalVisible(true);
  };

  const userColumns = [
    {
      title: 'Пользователь',
      key: 'user',
      render: (user: User) => (
        <div className={styles.tableUser}>
          <div className={styles.userAvatar} style={{backgroundImage: `url(https://i.pravatar.cc/150?u=${user.id})`}}></div>
          <div>
            <div className={styles.userName}>
              {user.username}
              {user.isAdmin && <span className={styles.adminBadge}>Админ группы</span>}
            </div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Телеграм',
      key: 'telegram',
      render: () => <Button size="small" type="primary">Написать в телеграм</Button>
    },
    {
      title: 'Контакты',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (user: User) => (
        <div className={styles.actionButtons}>
          <Button onClick={() => showQuestionnaireModal(user)}>Посмотреть анкету</Button>
          <Button onClick={() => showCoverLetterModal(user)} style={{marginLeft: '8px'}}>Сопроводительное письмо</Button>
        </div>
      )
    },
    {
      title: '',
      key: 'remove',
      render: (user: User, _, index: number, group: Group) => (
        !user.isAdmin && 
        <Button 
          className={styles.removeButton} 
          onClick={() => handleRemoveMember(group.id, user.id)} 
          icon={<TrashIcon />}
        />
      )
    }
  ];

  const newAppColumns = [
    {
      title: 'Пользователь',
      key: 'user',
      render: (user: User) => (
        <div className={styles.tableUser}>
          <div className={styles.userAvatar} style={{backgroundImage: `url(https://i.pravatar.cc/150?u=${user.id})`}}></div>
          <div>
            <div className={styles.userName}>{user.username}</div>
            <div className={styles.userEmail}>{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Телеграм',
      key: 'telegram',
      render: () => <Button size="small" type="primary">Написать в телеграм</Button>
    },
    {
      title: 'Контакты',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (user: User) => (
        <div className={styles.actionButtons}>
          <Button onClick={() => showQuestionnaireModal(user)}>Посмотреть анкету</Button>
          <Button onClick={() => showCoverLetterModal(user)} style={{marginLeft: '8px'}}>Сопроводительное письмо</Button>
        </div>
      )
    },
    {
      title: '',
      key: 'action',
      render: (app: User) => (
        <div className={styles.actions}>
          <Button 
            className={styles.acceptButton} 
            onClick={() => handleAcceptApplication(app.id)} 
            type="primary" 
            icon={<CheckIcon />} 
          />
          <Button 
            className={styles.rejectButton} 
            onClick={() => handleRejectApplication(app.id)}
            danger 
            icon={<CloseIcon />} 
          />
        </div>
      )
    }
  ];

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

      <div className={styles.apartmentCard}>
        <div className={styles.apartmentImage}>
          <img src="https://i.pinimg.com/736x/d4/69/ba/d469ba356d6954808a91b661a42bcc77.jpg" alt="Квартира" />
        </div>
        <div className={styles.apartmentInfo}>
          <div className={styles.infoContent}>
            <div className={styles.infoColumn}>
              <p>Ул. Раймбека 181/23</p>
              <p>Мкр. Акцент 14</p>
              <p>Алматы г.</p>
              <p>2 комнаты - 30 кв. м - 2/13 этаж</p>
            </div>
            <div className={styles.infoColumn}>
              <p>Можно заехать с 21.11.2024</p>
              <p>Депозит 50.000тг</p>
              <p>Ищем 2 девушек на подселение</p>
              <p>Количество заявок - 12</p>
            </div>
          </div>
          <div className={styles.price}>150 000 ₸</div>
        </div>
      </div>
      
      <div className={styles.newApplicationsSection}>
        <h2 className={styles.sectionTitle}>Новые заявки</h2>
        <Table 
          className={styles.table}
          columns={newAppColumns} 
          dataSource={newApplications}
          pagination={false}
          rowKey="id"
        />
      </div>

      <h2 className={styles.groupsTitle}>Количество групп: {groups.length}</h2>

      <div className={styles.groupsList}>
        {groups.map((group) => (
          <div key={group.id} className={styles.groupCard}>
            <div className={styles.groupHeader}>
              <div className={styles.groupTitle}>
                <h3>{group.name}</h3>
                <div className={styles.avatarsRow}>
                  {group.members.slice(0, 3).map((member, index) => (
                    <div 
                      key={member.id} 
                      className={styles.avatar} 
                      style={{backgroundImage: `url(https://i.pravatar.cc/150?u=${member.id})`}}
                    />
                  ))}
                  {group.members.length > 3 && (
                    <div className={styles.moreAvatars}>+{group.members.length - 3}</div>
                  )}
                </div>
              </div>
            </div>

            <Collapse 
              defaultActiveKey={['members']} 
              ghost 
              expandIconPosition="end"
              items={[
                {
                  key: 'members',
                  label: 'Участники группы',
                  children: (
                    <Table 
                      className={styles.table}
                      columns={userColumns} 
                      dataSource={group.members.map(member => ({...member, group}))}
                      pagination={false}
                      rowKey="id"
                    />
                  ),
                },
              ]}
            />
            
            {group.newApplications.length > 0 && (
              <div className={styles.groupNewApplications}>
                <h4 className={styles.applicationsSectionTitle}>Новые заявки</h4>
                <Table 
                  className={styles.table}
                  columns={[
                    {
                      title: 'Пользователь',
                      key: 'user',
                      render: (user: User) => (
                        <div className={styles.tableUser}>
                          <div className={styles.userAvatar} style={{backgroundImage: `url(https://i.pravatar.cc/150?u=${user.id})`}}></div>
                          <div>
                            <div className={styles.userName}>{user.username}</div>
                            <div className={styles.userEmail}>{user.email}</div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      title: 'Телеграм',
                      key: 'telegram',
                      render: () => <Button size="small" type="primary">Написать в телеграм</Button>
                    },
                    {
                      title: 'Контакты',
                      dataIndex: 'phone',
                      key: 'phone',
                    },
                    {
                      title: 'Дата',
                      dataIndex: 'date',
                      key: 'date',
                    },
                    {
                      title: 'Действия',
                      key: 'actions',
                      render: (user: User) => (
                        <div className={styles.actionButtons}>
                          <Button onClick={() => showQuestionnaireModal(user)}>Посмотреть анкету</Button>
                          <Button onClick={() => showCoverLetterModal(user)} style={{marginLeft: '8px'}}>Сопроводительное письмо</Button>
                        </div>
                      )
                    }
                  ]} 
                  dataSource={group.newApplications}
                  pagination={false}
                  rowKey="id"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        title="Анкета"
        open={isQuestionnaireModalVisible}
        onCancel={() => setIsQuestionnaireModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedUser?.questionnaire && (
          <div className={styles.questionnaireModal}>
            <div className={styles.userHeaderInfo}>
              <div 
                className={styles.userAvatarLarge} 
                style={{backgroundImage: `url(https://i.pravatar.cc/150?u=${selectedUser.id})`}}
              />
              <h3>{selectedUser.username}</h3>
            </div>
            
            {selectedUser.questionnaire.answers.map((item, index) => (
              <div key={index} className={styles.questionAnswer}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <Modal
        title="Сопроводительное письмо"
        open={isCoverLetterModalVisible}
        onCancel={() => setIsCoverLetterModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div className={styles.coverLetterModal}>
            <div className={styles.userHeaderInfo}>
              <div 
                className={styles.userAvatarLarge} 
                style={{backgroundImage: `url(https://i.pravatar.cc/150?u=${selectedUser.id})`}}
              />
              <h3>{selectedUser.username}</h3>
            </div>
            <p>{selectedUser.coverLetter}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Иконки
const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 16.6L6.66666 10.7667L12.5 4.93335" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6667 5L7.50001 14.1667L3.33334 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5H4.16667H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66669 5.00008V3.33341C6.66669 2.89139 6.8423 2.46746 7.15486 2.1549C7.46742 1.84234 7.89135 1.66675 8.33335 1.66675H11.6667C12.1087 1.66675 12.5326 1.84234 12.8452 2.1549C13.1578 2.46746 13.3334 2.89139 13.3334 3.33341V5.00008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.8333 5.00008V16.6667C15.8333 17.1088 15.6577 17.5327 15.3451 17.8453C15.0326 18.1578 14.6087 18.3334 14.1667 18.3334H5.83333C5.39131 18.3334 4.96738 18.1578 4.65482 17.8453C4.34226 17.5327 4.16667 17.1088 4.16667 16.6667V5.00008" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default ApartmentResponsesPage;