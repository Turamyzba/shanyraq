"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { useGetApartmentDetailQuery } from "@/store/features/apartmentDetails/apartmentDetailsApi";
import MobileApartmentView from "./mobile/MobileApartmentView";
import DesktopApartmentView from "./desktop/DesktopApartmentView";
import { Spin } from "antd";

export default function ApartmentPage() {
  const params = useParams();
  const apartmentId = Number(params.apartmentId);
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  const { data: apartmentResponse, isLoading } = useGetApartmentDetailQuery(apartmentId);
  
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!apartmentResponse?.data) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h3>Не удалось загрузить данные объявления</h3>
        <p>Пожалуйста, попробуйте позже или проверьте соединение с интернетом.</p>
      </div>
    );
  }

  const apartment = apartmentResponse.data;

  // Render mobile or desktop view based on screen size
  return isMobile ? (
    <MobileApartmentView apartment={apartment} />
  ) : (
    <DesktopApartmentView apartment={apartment} />
  );
}