"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";

const MobileQuestionnaireForm = dynamic(
  () => import("../components/mobile/Questionnaire/QuestionnaireForm")
);
const DesktopQuestionnaireForm = dynamic(
  () => import("../components/desktop/Questionnaire/QuestionnaireForm")
);

export default function QuestionnairePage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return <>{isMobile ? <MobileQuestionnaireForm /> : <DesktopQuestionnaireForm />}</>;
}
