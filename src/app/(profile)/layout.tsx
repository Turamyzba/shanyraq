"use client";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./layout.module.scss";
import dynamic from "next/dynamic";

const MobileLayout = dynamic(() => import("./components/mobile/MobileLayout"), { ssr: false });
const DesktopLayout = dynamic(() => import("./components/desktop/DesktopLayout"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: "#1AA683" }} spin />;

  useEffect(() => {
    const handleLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!pageLoaded) {
    return (
      <div className={styles.loadingScreen}>
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <>{isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>}</>
  );
}