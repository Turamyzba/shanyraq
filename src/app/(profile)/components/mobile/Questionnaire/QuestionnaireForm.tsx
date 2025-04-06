"use client";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ExclamationCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { RadioGroup, Radio } from "@heroui/react";
import styles from "./QuestionnaireForm.module.scss";

// Questions data
const questions = [
  {
    id: 1,
    text: "1. Какой ваш обычный распорядок дня и каковы ваши жизненные приоритеты?",
    answers: [
      "Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную обстановку дома.",
      "Я постоянно в разъездах, по сути, у меня учеба/работа весь день. Мне не принципиально, что происходит дома в мое отсутствие.",
    ],
  },
  {
    id: 2,
    text: "2. Как вы относитесь к религиозным практикам и традициям?",
    answers: [
      "Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мои соседи уважительно относились к этому.",
      "Я не соблюдаю, но мне важно, чтобы это не мешало соседям, и чтобы мои соседи не навязывали мне свои традиции.",
    ],
  },
  {
    id: 3,
    text: "3. Какое у вас отношение к курению и алкогольным напиткам?",
    answers: [
      "Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это происходило в общих зонах.",
      "Я не курю и не пью, и хотел бы, чтобы со мной жили люди с похожими привычками.",
    ],
  },
  {
    id: 4,
    text: "4. Какое ваше отношение к гостям в доме?",
    answers: [
      "Не против, если соседи часто приглашают гостей.",
      "Мне все равно, так как большую часть времени провожу вне дома.",
    ],
  },
  {
    id: 5,
    text: "5. Как вы относитесь к домашним животным?",
    answers: [
      "Не против, если у соседей есть животные. Сам/сама люблю питомцев.",
      "Предпочитаю жить без животных, чтобы избежать лишнего шума или запахов.",
    ],
  },
  {
    id: 6,
    text: "6. Как вы относитесь к разделению бытовых обязанностей?",
    answers: [
      "Предпочитаю равное разделение домашних обязанностей.",
      "Готов(а) брать на себя большую часть домашних задач.",
    ],
  },
  {
    id: 7,
    text: "7. Вам было бы удобно, чтобы соседи часто созванивались с друзьями/родственниками?",
    answers: [
      "Мне все равно, так как я провожу мало времени дома.",
      "Предпочитаю тишину и спокойствие, поэтому шумные разговоры нежелательны.",
    ],
  },
  {
    id: 8,
    text: "8. Какое ваше отношение к шуму и использованию громких устройств (музыка, ТВ)?",
    answers: [
      "Не против музыки или громких устройств, если это не позднее вечера.",
      "Предпочитаю тишину и минимальное использование громких устройств.",
    ],
  },
];
// Mock user data to simulate a completed questionnaire
const mockUserData = {
  name: "Айсултан",
  avatarUrl: "https://via.placeholder.com/60?text=User",
  isQuestionnaireCompleted: true,
  answers: {
    1: "Я провожу весь день дома, работаю/учусь дистанционно. Мне важно иметь спокойную обстановку дома.",
    2: "Я соблюдаю религиозные практики и традиции. Хотел бы, чтобы мои соседи уважительно относились к этому.",
    3: "Я спокойно отношусь к курению и алкоголю, но хотел бы, чтобы это не происходило в общих зонах",
  }
};

export default function MobileQuestionnaireForm() {
  const [step, setStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [questionnaireFilled, setQuestionnaireFilled] = useState(mockUserData.isQuestionnaireCompleted);

  useEffect(() => {
    if (questionnaireFilled) {
      setAnswers(mockUserData.answers);
    }
  }, [questionnaireFilled]);

  const handleStartQuestionnaire = () => setIsModalOpen(false);
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSubmit = () => {
    console.log("Ответы пользователя:", answers);
    setQuestionnaireFilled(true);
  };
  const handleCancel = () => setIsModalOpen(true);
  const handleRetake = () => {
    setStep(1);
    setAnswers({});
    setIsModalOpen(false);
    setQuestionnaireFilled(false);
  };
  const handleEdit = () => {
    setStep(1);
    setIsModalOpen(false);
  };
  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);

  // For mobile we'll show 2 questions per page
  const questionsPerPage = 2;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (step - 1) * questionsPerPage;
  const currentQuestions =
    step <= totalPages ? questions.slice(startIndex, startIndex + questionsPerPage) : [];

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  if (questionnaireFilled) {
    return (
      <div className={styles.questionnaireContainer}>
        <div className={styles.successContainer}>
          <CheckCircleOutlined className={styles.successIcon} />
          <h2>Вы заполнили анкету!</h2>
          <p>Ваши данные успешно отправлены на сервер.</p>
          <div className={styles.successButtons}>
            <Button className={styles.editButton} onClick={handleEdit}>
              Редактировать
            </Button>
            <Button className={styles.viewButton} type="primary" onClick={openViewModal}>
              Посмотреть
            </Button>
          </div>
        </div>

        {viewModalOpen && (
          <div className={styles.viewModal}>
            <div className={styles.viewModalHeader}>
              <Button 
                icon={<BackIcon />} 
                onClick={closeViewModal}
                className={styles.backButton}
              />
              <h3>Ваши ответы</h3>
            </div>
            <div className={styles.answersContainer}>
              <div className={styles.userInfo}>
                <img src={mockUserData.avatarUrl} alt="avatar" className={styles.userAvatar} />
                <h3 className={styles.userName}>{mockUserData.name}</h3>
              </div>
              {Object.keys(answers).map((questionId) => {
                const question = questions.find((q) => q.id === Number(questionId));
                return question ? (
                  <div key={question.id} className={styles.answerBlock}>
                    <p className={styles.questionText}>{question.text}</p>
                    <p className={styles.answerText}>{answers[question.id]}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.questionnaireContainer}>
      {isModalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modalBox}>
            <ExclamationCircleOutlined
              style={{ fontSize: 36, color: "#1AA683", marginBottom: 12 }}
            />
            <h3 className={styles.modalTitle}>Вы еще не прошли анкету</h3>
            <p className={styles.modalSubtitle}>Чтобы продолжить, нажмите «Пройти анкету».</p>
            <Button className={styles.startButton} onClick={handleStartQuestionnaire}>
              Пройти анкету
            </Button>
          </div>
        </div>
      )}

      <>
        <div className={styles.progressIndicator}>
          <div className={styles.progressText}>
            Шаг {step} из {totalPages}
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(step / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {currentQuestions.map((q) => (
          <div className={styles.questionBlock} key={q.id}>
            <p className={styles.question}>{q.text}</p>
            <RadioGroup
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              className={styles.radioGroup}
            >
              {q.answers.map((answer, idx) => (
                <Radio key={idx} value={answer} className={styles.radioItem}>
                  <p className={styles.label}>{answer}</p>
                </Radio>
              ))}
            </RadioGroup>
          </div>
        ))}

        <div className={styles.btnRow}>
          {step === 1 ? (
            <Button className={styles.cancelBtn} onClick={handleCancel}>
              Отменить
            </Button>
          ) : (
            <Button className={styles.backBtn} onClick={handleBack}>
              Назад
            </Button>
          )}

          {step < totalPages ? (
            <Button className={styles.nextBtn} type="primary" onClick={handleNext}>
              Далее
            </Button>
          ) : (
            <Button className={styles.submitBtn} type="primary" onClick={handleSubmit}>
              Готово
            </Button>
          )}
        </div>
      </>
    </div>
  );
}

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