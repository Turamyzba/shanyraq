"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Spinner,
} from "@heroui/react";
import {
  useLazyGetNamesForLinkQuery,
  useLazyGetSurveyQuestionsQuery,
  useSubmitSurveyFromLinkMutation,
} from "@/store/features/surwey/surweyApi";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "antd";
import MyPhoneInput from "@/components/ui/MyPhoneInput";
import styles from "./SurveyForm.module.scss";
import MyInput from "@/components/ui/MyInput";
import type { SurveyQuestion } from "@/types/request/surwayRequests";

export default function SurveyForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();

  // Form state
  const [phoneNumber, setPhoneNumber] = useState("+7 ");
  const [birthDate, setBirthDate] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "">("");
  const [selectedName, setSelectedName] = useState("");
  const [answers, setAnswers] = useState<{ questionId: number; optionId: number }[]>([]);

  // Page state
  const [showQuestions, setShowQuestions] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [names, setNames] = useState<string[]>([]);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // API hooks
  const [getNamesForLink, { isLoading: isLoadingNames }] = useLazyGetNamesForLinkQuery();
  const [getQuestions, { isLoading: isLoadingQuestions }] = useLazyGetSurveyQuestionsQuery();
  const [submitSurvey, { isLoading: isSubmitting }] = useSubmitSurveyFromLinkMutation();

  useEffect(() => {
    if (names && names.length > 0) {
      setSelectedName(names[0]);
    }
  }, [names]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const namesResult = await getNamesForLink(token);
        if (namesResult.data) {
          setNames(namesResult.data.data);
        }

        const questionsResult = await getQuestions();
        if (questionsResult.data) {
          setQuestions(questionsResult.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getNamesForLink, getQuestions, token]);

  useEffect(() => {
    console.log("names", names);
  }, [names]);
  useEffect(() => {
    console.log("questions", questions);
  }, [questions]);

  const validatePersonalInfo = () => {
    const errors: Record<string, string> = {};

    if (!selectedName) errors.selectedName = "Выберите имя";
    if (!phoneNumber || phoneNumber === "+7 ") errors.phoneNumber = "Введите номер телефона";
    if (!email) errors.email = "Введите email";
    if (!gender) errors.gender = "Выберите гендер";
    if (!birthDate) errors.birthDate = "Выберите дату рождения";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (validatePersonalInfo()) {
      // Ensure questions are loaded before showing the questions section
      if (questions.length === 0) {
        getQuestions().then((res) => {
          if (res.data) {
            setQuestions(res.data.data);
            setShowQuestions(true);
          }
        });
      } else {
        setShowQuestions(true);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await submitSurvey({
        token,
        firstName: selectedName, // Use the selected name from dropdown
        birthDate: birthDate || "",
        phoneNumber,
        email,
        gender: gender || "MALE",
        age: birthDate ? calculateAge(birthDate) : 0,
        userAnswers: answers,
      }).unwrap();

      // Handle successful submission
      router.push("/success");
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  const calculateAge = (birthDateString: string) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAnswerChange = (questionId: number, optionId: number) => {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionId !== questionId);
      return [...filtered, { questionId, optionId }];
    });
  };

  const handleBack = () => {
    setShowQuestions(false);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardBody className={styles.cardBody}>
          <h1 className={styles.mainTitle}>Пожалуйста заполните свои данные</h1>

          {!showQuestions ? (
            // Personal Information Form
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Заполните свои данные</h2>

              {/* Name selection from dropdown */}
              <div className={styles.formField}>
                <label className={styles.label}>Имя</label>
                <Select
                  placeholder="Выберите имя"
                  selectedKeys={selectedName ? [selectedName] : []}
                  onChange={(e) => setSelectedName(e.target.value)}
                  className={`${styles.select} ${formErrors.selectedName ? styles.invalidInput : ""}`}
                >
                  {names && names.length > 0 ? (
                    names.map((name) => (
                      <SelectItem key={name} data-value={name}>
                        {name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem key="no-names" data-value="">
                      Нет доступных имен
                    </SelectItem>
                  )}
                </Select>
                {formErrors.selectedName && (
                  <p className={styles.errorText}>{formErrors.selectedName}</p>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.label}>Номер телефона</label>
                  <MyPhoneInput
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    label=""
                    placeholder="+7 ___ ___ ____"
                    isInvalid={!!formErrors.phoneNumber}
                    errorMessage={formErrors.phoneNumber}
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>Дата рождения</label>
                  <DatePicker
                    onChange={(date) => setBirthDate(date ? date.format("YYYY-MM-DD") : null)}
                    format="DD.MM.YYYY"
                    placeholder="Выберите дату"
                    className={`${styles.datePicker} ${formErrors.birthDate ? styles.invalidInput : ""}`}
                  />
                  {formErrors.birthDate && (
                    <p className={styles.errorText}>{formErrors.birthDate}</p>
                  )}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.label}>Email</label>
                  <MyInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    isInvalid={!!formErrors.email}
                    errorMessage={formErrors.email}
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>Гендер</label>
                  <Select
                    placeholder="Выберите"
                    selectedKeys={gender ? [gender] : []}
                    onChange={(e) => setGender(e.target.value as "MALE" | "FEMALE")}
                    className={formErrors.gender ? styles.invalidInput : ""}
                  >
                    <SelectItem key="MALE" data-value="MALE">
                      Мужчина
                    </SelectItem>
                    <SelectItem key="FEMALE" data-value="FEMALE">
                      Женщина
                    </SelectItem>
                  </Select>
                  {formErrors.gender && <p className={styles.errorText}>{formErrors.gender}</p>}
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <Button
                  variant="ghost"
                  className={styles.cancelButton}
                  onClick={() => router.back()}
                >
                  Отменить
                </Button>

                <Button color="primary" className={styles.submitButton} onClick={handleContinue}>
                  Продолжить
                </Button>
              </div>
            </div>
          ) : (
            // Survey Questions
            <div className={styles.section}>
              <h2 className={styles.surveyTitle}>
                Пройдите анкету для улучшения качества при поиске сожителя
              </h2>

              {questions && questions.length > 0 ? (
                questions.map((question, index) => (
                  <div key={question.questionId} className={styles.questionBlock}>
                    <p className={styles.questionText}>
                      Вопрос {index + 1}: {question.text}
                    </p>

                    <CheckboxGroup
                      value={answers
                        .filter((a) => a.questionId === question.questionId)
                        .map((a) => a.optionId.toString())}
                      onValueChange={(values) => {
                        if (values.length > 0) {
                          handleAnswerChange(
                            question.questionId,
                            Number.parseInt(values[values.length - 1])
                          );
                        }
                      }}
                    >
                      {question.options && question.options.length > 0 ? (
                        question.options.map((option) => (
                          <Checkbox
                            key={option.optionId}
                            value={option.optionId.toString()}
                            className={styles.checkboxItem}
                          >
                            {option.text}
                          </Checkbox>
                        ))
                      ) : (
                        <p>Нет вариантов ответа</p>
                      )}
                      <Checkbox value="indifferent" className={styles.checkboxItem}>
                        Мне без разницы.
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                ))
              ) : (
                <div className={styles.noQuestionsText}>
                  <p>Вопросы не найдены</p>
                  <Button
                    color="primary"
                    onClick={() => {
                      getQuestions().then((res) => {
                        if (res.data) {
                          setQuestions(res.data.data);
                        }
                      });
                    }}
                    className={styles.retryButton}
                  >
                    Попробовать снова
                  </Button>
                </div>
              )}

              <div className={styles.buttonContainer}>
                <Button variant="ghost" className={styles.cancelButton} onClick={handleBack}>
                  Назад
                </Button>

                <Button
                  color="primary"
                  className={styles.submitButton}
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  Отправить
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
