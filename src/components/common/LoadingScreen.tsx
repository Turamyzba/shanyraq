"use client";

import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useLoading } from "@/context/LoadingContext";

const LoadingScreen: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: "#1AA683" }} spin />;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Spin indicator={antIcon} />
    </div>
  );
};

export default LoadingScreen;