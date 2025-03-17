"use client";
import React, { useState, ChangeEvent } from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { RadioGroup, Radio } from "@heroui/react";
import styles from "./Questionnaire.module.scss";
import "./Questionnaire.scss";

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

const userData = {
  name: "Айсултан",
  avatarUrl: "https://via.placeholder.com/60?text=User",
};

export default function QuestionnairePage() {
  const [step, setStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);

  const handleStartQuestionnaire = () => setIsModalOpen(false);
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleSubmit = () => {
    console.log("Ответы пользователя:", answers);
    setStep(3);
  };
  const handleCancel = () => setIsModalOpen(true);
  const handleRetake = () => {
    setStep(1);
    setAnswers({});
    setIsModalOpen(false);
  };
  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);

  const questionsPerPage = 4;
  const startIndex = (step - 1) * questionsPerPage;
  const currentQuestions = step < 3 ? questions.slice(startIndex, startIndex + questionsPerPage) : [];

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  return (
    <div className={styles.questionnaireContainer}>
      {isModalOpen && step < 3 && (
        <div className={styles.overlay}>
          <div className={styles.modalBox}>
            <ExclamationCircleOutlined style={{ fontSize: 40, color: "#1AA683", marginBottom: 16 }}/>
            <h3 className={styles.modelTitleNot}>Вы еще не прошли анкету</h3>
            <p className={styles.modelSubtitleNot}>Чтобы продолжить, нажмите «Пройти анкету».</p>
            <Button className={styles.anketaStart} onClick={handleStartQuestionnaire}>Пройти анкету</Button>
          </div>
        </div>
      )}
      {step < 3 && (
        <>
          {currentQuestions.map((q) => (
            <div className={styles.questionBlock} key={q.id}>
              <p className={styles.question}>{q.text}</p>
              <RadioGroup
                value={answers[q.id] || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleAnswerChange(q.id, e.target.value)}
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
              <Button className={styles.previousBtn} onClick={handleCancel}>Отменить</Button>
            ) : (
              <Button className={styles.previousBtn} onClick={handleBack}>Назад</Button>
            )}
            {step === 1 ? (
              <Button className={styles.nextBtn} type="primary" onClick={handleNext}>Следующие</Button>
            ) : (
              <Button className={styles.nextBtn} type="primary" onClick={handleSubmit}>Сохранить и выйти</Button>
            )}
          </div>
        </>
      )}
      {step === 3 && (
        <div className={styles.successContainer}>
          <CheckCircleOutlined className={styles.iconSuccess}/>
          <h2>Вы уже заполнили анкету!</h2>
          <p>Ваши данные успешно отправлены на сервер.</p>
          <div className={styles.btnSuccess}>
            <Button className={styles.reinput} onClick={handleRetake}>Заполнить заново</Button>
            <Button className={styles.preview} type="primary" onClick={openViewModal}>Посмотреть</Button>
          </div>
        </div>
      )}
      <Modal open={viewModalOpen} onCancel={closeViewModal} footer={null} title="Анкета">
        <div className={styles.answersContainer}>
          <div className={styles.userInfo}>
            <img src={userData.avatarUrl} alt="avatar" className={styles.userAvatar}/>
            <h3 className={styles.userName}>{userData.name}</h3>
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
      </Modal>
    </div>
  );
}
