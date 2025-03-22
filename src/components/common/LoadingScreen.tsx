"use client";

import React from "react";
import { useLoading } from "@/context/LoadingContext";
import "./LoadingScreen.scss";

const LoadingScreen: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loading-text">Загрузка...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
